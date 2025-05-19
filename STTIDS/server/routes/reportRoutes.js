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

module.exports = router;
