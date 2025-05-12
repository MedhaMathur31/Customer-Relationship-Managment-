const express = require('express');
const router = express.Router();
const CommunicationLog = require('../models/CommunicationLog');

// POST /delivery/receipt
router.post('/receipt', async (req, res) => {
  try {
    const { message_id, status } = req.body;

    const updated = await CommunicationLog.findByIdAndUpdate(
      message_id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Message not found' });
    }

    console.log(`📬 Delivery status updated: ${message_id} → ${status}`);
    res.json({ success: true });
  } catch (err) {
    console.error('❌ Failed to update delivery status:', err.message);
    res.status(500).json({ error: 'Failed to update delivery status' });
  }
});

module.exports = router;
