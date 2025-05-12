const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');
const Segment = require('../models/Segment');
const CommunicationLog = require('../models/CommunicationLogs');

// Helper to build MongoDB filters from rules
function buildQuery(rules, logic) {
  const queryParts = rules.map(rule => {
    let condition = {};
    if (rule.field === 'last_order_date') {
      const date = new Date();
      date.setDate(date.getDate() - parseInt(rule.value));
      condition[rule.field] = {
        [rule.operator === '<' ? '$lt' : '$gt']: date
      };
    } else {
      condition[rule.field] = {
        [`$${rule.operator === '=' ? 'eq' : rule.operator === '>' ? 'gt' : 'lt'}`]: parseFloat(rule.value)
      };
    }
    return condition;
  });

  return logic === 'AND' ? { $and: queryParts } : { $or: queryParts };
}

// POST /api/segments/preview
router.post('/preview', async (req, res) => {
  try {
    const { rules, logic } = req.body;
    const mongoQuery = buildQuery(rules, logic);
    const count = await Customer.countDocuments(mongoQuery);
    res.json({ count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to preview audience' });
  }
});

// POST /api/segments/save
router.post('/save', async (req, res) => {
  console.log("🛠️ /save hit");
  try {
    const { name, rules, logic } = req.body;
    console.log("📨 Incoming segment:", name, logic, rules);

    const newSegment = new Segment({ name, rules, logic });
    await newSegment.save();

    const query = buildQuery(rules, logic);
    const audience = await Customer.find(query);
    console.log("📣 Segment saved:", newSegment._id, "Audience count:", audience.length);

    for (const customer of audience) {
      const message = `Hi ${customer.name}, here’s 10% off on your next order!`;

      await CommunicationLog.create({
        campaign_id: newSegment._id,
        customer_id: customer._id,
        message,
        status: 'SENT' 
      });
    }

    res.status(201).json({ message: 'Segment saved and campaign logged!', segment: newSegment });
  } catch (err) {
    console.error("❌ Save segment error:", err.message);
    res.status(500).json({ error: 'Failed to save segment and log campaign' });
  }
});

// GET /api/segments/history
router.get('/history', async (req, res) => {
  try {
    const campaigns = await Segment.find().sort({ createdAt: -1 });

    const history = await Promise.all(
      campaigns.map(async (campaign) => {
        const logs = await CommunicationLog.find({ campaign_id: campaign._id });
        const sent = logs.filter(l => l.status === 'SENT').length;
        const failed = logs.filter(l => l.status === 'FAILED').length;

        return {
          id: campaign._id,
          name: campaign.name,
          createdAt: campaign.createdAt,
          audienceSize: logs.length,
          sent,
          failed
        };
      })
    );

    res.json(history);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch campaign history' });
  }
});

module.exports = router;
