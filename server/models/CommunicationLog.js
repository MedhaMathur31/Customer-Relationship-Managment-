const mongoose = require('mongoose');

const communicationLogSchema = new mongoose.Schema({
  campaign_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Segment' },
  customer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  message: String,
  status: {
    type: String,
    enum: ['SENT', 'FAILED'],
    default: 'SENT'
  },
  delivery_time: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('CommunicationLog', communicationLogSchema);
