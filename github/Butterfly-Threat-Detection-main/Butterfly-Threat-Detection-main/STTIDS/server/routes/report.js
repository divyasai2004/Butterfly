// routes/report.js

const express = require("express");
const router = express.Router();
const Report = require("../models/Report");
const { detectThreatLevel } = require("../utils/threatDetector");

// No longer starts with /api/report
router.post("/", async (req, res) => {
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

router.patch("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await Report.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating status" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Report.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Report deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete report" });
  }
});


// PUT /api/report/:id/status
router.put('/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedReport = await Report.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedReport) {
      return res.status(404).json({ error: "Report not found" });
    }

    res.json(updatedReport);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update report status" });
  }
});


module.exports = router;



// const express = require("express");
// const router = express.Router();
// const Report = require("../models/Report");
// const { detectThreatLevel } = require("../utils/threatDetector");

// router.post("/api/report", async (req, res) => {
//   try {
//     const { description, location, sourceUrl } = req.body;
//     const { score, level } = detectThreatLevel(description);

//     const newReport = new Report({
//       description,
//       location,
//       sourceUrl,
//       threatScore: score,
//       threatLevel: level,
//     });

//     await newReport.save();

//     res.status(200).json({ message: "Report submitted", threatLevel: level });
//   } catch (err) {
//     console.error("Error submitting report:", err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// // PATCH: Update threat status
// router.patch("/api/report/:id/status", async (req, res) => {
//   try {
//     const { status } = req.body;
//     const updated = await Report.findByIdAndUpdate(
//       req.params.id,
//       { status },
//       { new: true }
//     );
//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ message: "Error updating status" });
//   }
// });

// router.delete("/:id", async (req, res) => {
//   try {
//     await Report.findByIdAndDelete(req.params.id);
//     res.status(200).json({ message: "Report deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ error: "Failed to delete report" });
//   }
// });

// router.put("/:id/status", async (req, res) => {
//   try {
//     const { status } = req.body;
//     const updatedReport = await Report.findByIdAndUpdate(
//       req.params.id,
//       { status },
//       { new: true }
//     );
//     res.status(200).json(updatedReport);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to update status" });
//   }
// });


// module.exports = router;
