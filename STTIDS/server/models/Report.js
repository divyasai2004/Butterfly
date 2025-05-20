const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  description: String,
  location: String,
  sourceUrl: String,
  submittedAt: {
    type: Date,
    default: Date.now
  },
  keywordsDetected: [String],
  severity: String,
  threatScore: Number,
  status: {
  type: String,
  enum: ["Pending", "Under Review", "Confirmed Threat", "False Alarm"],
  default: "Pending"
  },
  threatLevel: { type: String, default: "Low" },
  threatScore: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Report', reportSchema);
