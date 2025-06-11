// models/ThreatReport.js
const mongoose = require('mongoose');

const ThreatReportSchema = new mongoose.Schema({
  sourceIP: {
    type: String,
    required: true
  },
  threatType: {
    type: String,
    required: true,
    enum: ['Phishing', 'Malware', 'DDoS', 'Suspicious Activity', 'Other']
  },
  description: {
    type: String,
    required: true
  },
  reportedAt: {
    type: Date,
    default: Date.now
  },
  threatScore: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['Pending', 'Under Review', 'Resolved'],
    default: 'Pending'
  }
});

module.exports = mongoose.model('ThreatReport', ThreatReportSchema);
