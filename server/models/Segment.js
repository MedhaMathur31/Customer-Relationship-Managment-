const mongoose = require('mongoose');

const segmentSchema = new mongoose.Schema({
  name: String,
  rules: [
    {
      field: String,
      operator: String,
      value: String
    }
  ],
  logic: {
    type: String,
    enum: ['AND', 'OR']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Segment', segmentSchema);
