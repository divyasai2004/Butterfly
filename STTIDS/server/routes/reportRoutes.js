// routes/reportRoutes.js
const express = require('express');
const router = express.Router();
const Report = require('../models/Report'); // ✅ Correct import

// POST - Create a new threat report
router.post('/', async (req, res) => {
  try {
    const {
      description,
      location,
      sourceUrl,
      keywordsDetected,
      severity,
      threatScore,
      status
    } = req.body;

    // Optional: Validate required fields
    if (!description || !location) {
      return res.status(400).json({ error: 'Description and location are required.' });
    }

    const newReport = new Report({
      description,
      location,
      sourceUrl,
      keywordsDetected,
      severity,
      threatScore,
      status
    });

    const savedReport = await newReport.save();
    res.status(201).json({
      message: 'Threat Report Saved!',
      data: savedReport
    });
  } catch (error) {
    console.error('Error saving report:', error);
    res.status(500).json({ error: 'Failed to save report.' });
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
router.get("/analytics", async (req, res) => {
  try {
    const allReports = await Report.find();

    // Total number of reports
    const totalReports = allReports.length;

    // Count by threat level
    const byThreatLevel = { High: 0, Medium: 0, Low: 0 };
    const byStatus = { Pending: 0, "In Progress": 0, Resolved: 0 };

    const recentReports = allReports
      .sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt))
      .slice(0, 5);

    const reportsOverTime = {};

    allReports.forEach((report) => {
      // Threat level
      if (byThreatLevel[report.threatLevel] !== undefined) {
        byThreatLevel[report.threatLevel]++;
      }

      // Status
      if (byStatus[report.status] !== undefined) {
        byStatus[report.status]++;
      }

      // Date trend
      const date = new Date(report.submittedAt).toISOString().split("T")[0];
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
      reportsOverTime: reportsOverTimeArr,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch analytics" });
  }
});

module.exports = router;
