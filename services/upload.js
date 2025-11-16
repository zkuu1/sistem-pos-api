const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("./cloudinary");
const upload = multer({ dest: "tmp/" });

router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "my_uploads",
    });

    res.json({ url: result.secure_url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
