const multer = require("multer");

// WAJIB: pakai memory storage
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // batas 10MB
});

module.exports = upload;
