const Alert = require('../models/Alert');

// Simple AI Logic: Keyword-based severity classification
const determineSeverity = (message) => {
    const msg = message.toLowerCase();
    if (msg.match(/(fire|gun|shooter|heart attack|unconscious|dying|explosion)/)) return 'critical';
    if (msg.match(/(accident|crash|bleeding|robbery|assault)/)) return 'high';
    if (msg.match(/(stolen|lost|suspicious|minor injury)/)) return 'medium';
    return 'low';
};

exports.createAlert = async (req, res) => {
    try {
        const { message, latitude, longitude } = req.body;
        
        if (!latitude || !longitude) {
            return res.status(400).json({ error: 'Location data is required' });
        }

        const severity = determineSeverity(message || 'Emergency reported');

        const newAlert = await Alert.create({
            message: message || 'SOS Triggered via Button',
            latitude,
            longitude,
            severity
        });

        res.status(201).json({ success: true, alert: newAlert });
    } catch (error) {
        console.error('Create Alert Error:', error);
        res.status(500).json({ error: 'Server error processing alert' });
    }
};

exports.getAlerts = async (req, res) => {
    try {
        const alerts = await Alert.find().sort({ timestamp: -1 });
        res.status(200).json(alerts);
    } catch (error) {
        console.error('Fetch Alerts Error:', error);
        res.status(500).json({ error: 'Server error fetching alerts' });
    }
};