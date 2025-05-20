const express = require("express");
const router = express.Router();
const Report = require("../models/Report");
const { detectThreatLevel } = require("../utils/threatDetector");

router.post("/api/report", async (req, res) => {
  try {
    const { description, location, sourceUrl } = req.body;
    const { score, level } = detectThreatLevel(description);

    const newReport = new Report({
      description,
      location,
      sourceUrl,
      threatScore: score,
      threatLevel: level,
    });

    await newReport.save();

    res.status(200).json({ message: "Report submitted", threatLevel: level });
  } catch (err) {
    console.error("Error submitting report:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
