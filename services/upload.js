const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("./cloudinary");

const upload = multer({ storage: multer.memoryStorage() }); // FIX

router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Image is required" });
    }

    const buffer = req.file.buffer;

    // Upload via stream
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "my_uploads",
      },
      (error, result) => {
        if (error) {
          return res.status(500).json({ error: error.message });
        }

        return res.json({ url: result.secure_url });
      }
    );

    uploadStream.end(buffer); // KIRIM BUFFER KE CLOUDINARY
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
