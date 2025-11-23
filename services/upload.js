const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("./cloudinary");
const upload = multer({ dest: "/tmp" });


router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload_stream(
      { folder: "my_uploads" },
      (error, result) => {
        if (error) {
          return res.status(500).json({ error: error.message });
        }
        res.json({ url: result.secure_url });
      }
    );

    result.end(req.file.buffer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
