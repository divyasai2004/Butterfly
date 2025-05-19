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
    default: 'Pending'
  }
});

module.exports = mongoose.model('Report', reportSchema);
