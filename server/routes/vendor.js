const express = require('express');
const router = express.Router();
const axios = require('axios');

// POST /vendor/send
router.post('/send', async (req, res) => {
  const { message_id, customer_id, message } = req.body;

  // Simulate 90% chance of success
  const isSuccess = Math.random() < 0.9;
  const status = isSuccess ? 'SENT' : 'FAILED';

  console.log(`📦 Sending message to customer ${customer_id}: "${message}" → ${status}`);

  // Simulate vendor calling back your delivery receipt API
  /*try {
    await axios.post('http://localhost:5000/delivery/receipt', {
      message_id,
      status
    });
  } catch (err) {
    console.error('❌ Failed to send delivery receipt:', err.message);
  }
*/
  res.json({ success: true, status });
});

module.exports = router;
