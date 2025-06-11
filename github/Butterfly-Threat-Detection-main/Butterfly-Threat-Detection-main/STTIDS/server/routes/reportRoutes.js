const express = require('express');
const router = express.Router();
const Report = require('../models/Report');
const threatDetector = require("../utils/threatDetector");

router.post("/", async (req, res) => {
  try {
    const { description, location, sourceUrl } = req.body;

    // Use the threatDetector to determine severity (returns "High", "Medium", "Low")
    const threatLevel = threatDetector(description);

    const newReport = new Report({
      description,
      location,
      sourceUrl,
      threatLevel,
    });

    await newReport.save();

    res.status(201).json({ success: true, data: newReport });
  } catch (error) {
    console.error("Error submitting report:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});



// GET - Fetch all threat reports
router.get('/', async (req, res) => {
  try {
    const reports = await Report.find().sort({ submittedAt: -1 });
    res.json(reports);
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({ error: 'Failed to fetch reports.' });
  }
});

// GET /api/report/analytics
router.get('/analytics', async (req, res) => {
  try {
    const allReports = await Report.find();
    const totalReports = allReports.length;
    const byThreatLevel = { High: 0, Medium: 0, Low: 0 };
    const byStatus = { Pending: 0, 'In Progress': 0, Resolved: 0 };

    const recentReports = allReports
      .sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt))
      .slice(0, 5);

    const reportsOverTime = {};

    allReports.forEach((report) => {
      // Threat level
      if (byThreatLevel[report.severity] !== undefined) {
        byThreatLevel[report.severity]++;
      }

      // Status
      if (byStatus[report.status] !== undefined) {
        byStatus[report.status]++;
      }

      // Date trend
      const date = new Date(report.submittedAt).toISOString().split('T')[0];
      reportsOverTime[date] = (reportsOverTime[date] || 0) + 1;
    });

    const reportsOverTimeArr = Object.entries(reportsOverTime).map(
      ([date, count]) => ({ date, count })
    );

    res.json({
      totalReports,
      byThreatLevel,
      byStatus,
      recentReports,
      reportsOverTime: reportsOverTimeArr
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

module.exports = router;
