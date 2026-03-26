const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
    message: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    severity: { 
        type: String, 
        enum: ['low', 'medium', 'high', 'critical'], 
        default: 'medium' 
    },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Alert', alertSchema);