const mongoose = require('mongoose');
const { Schema, Types } = mongoose; // Import Schema and Types for clarity

const CampaignSchema = new Schema({
    segment_id: Types.ObjectId, // Use Types.ObjectId for proper reference
    message_template: String,
    delivery_stats: {
        sent: Number,
        failed: Number
    },
    createdAt: { type: Date, default: Date.now } // Add default value for createdAt
});

module.exports = mongoose.model('Campaign', CampaignSchema);