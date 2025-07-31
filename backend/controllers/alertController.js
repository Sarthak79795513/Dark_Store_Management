const Alert = require('../models/Alert');

// GET /api/alerts
exports.getAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find({}).sort({ createdAt: -1 });
    res.json(alerts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch alerts' });
  }
};
