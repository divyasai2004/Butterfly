const express = require('express');
const router = express.Router();
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('file'), async (req, res) => {
  if (!req.file || !req.file.path) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const filePath = req.file.path;
  const formData = new FormData();
  formData.append('file', fs.createReadStream(filePath));

  console.log("📤 Sending file to YOLOv8 Flask backend...");

  try {
    const response = await axios.post('http://127.0.0.1:5002/detect', formData, {
      headers: formData.getHeaders(),
    });

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath); // Clean up
    }

    // Forward the object detection results to frontend
    res.json({
      success: true,
      objects: response.data.objects,
      image: response.data.image, // Base64 image with boxes (optional)
    });
  } catch (error) {
    console.error('❌ Detection error:', error.message);
    if (error.response) {
      console.error('🧠 Flask Error:', error.response.data);
    }

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath); // Always clean up
    }

    res.status(500).json({ error: 'Detection failed' });
  }
});

module.exports = router;


//// server/routes/detect.js
// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const axios = require('axios');
// const FormData = require('form-data');
// const fs = require('fs');

// const upload = multer({ dest: 'uploads/' });

// router.post('/', upload.single('file'), async (req, res) => {
//   if (!req.file || !req.file.path) {
//     return res.status(400).json({ error: 'No file uploaded' });
//   }

//   const filePath = req.file.path;
//   const formData = new FormData();
//   formData.append('file', fs.createReadStream(filePath));

//   try {
//   const response = await axios.post('http://127.0.0.1:5001/detect', formData, {
//     headers: formData.getHeaders(),
//   });

//   if (fs.existsSync(filePath)) {
//     fs.unlinkSync(filePath);
//   } else {
//     console.warn("⚠️ File already missing when trying to delete:", filePath);
//   }

//   res.json(response.data);
// } catch (error) {
//   console.error('>>> Detection error:', error.message);
//   if (error.response) {
//     console.error('>>> Flask responded with:', error.response.data);
//   }

//   if (fs.existsSync(filePath)) {
//     fs.unlinkSync(filePath);
//   }

//   res.status(500).json({ error: 'Detection failed' });
// }});


// module.exports = router;
