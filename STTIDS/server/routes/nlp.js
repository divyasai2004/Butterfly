const express = require("express");
const axios = require("axios");
const router = express.Router();

router.post("/analyze", async (req, res) => {
  try {
    const { text } = req.body;
    const response = await axios.post("http://localhost:5001/analyze", { text });
    res.json(response.data);
  } catch (err) {
    console.error("NLP error:", err.message);
    res.status(500).json({ error: "NLP analysis failed" });
  }
});

module.exports = router;
