// cloudinary.js
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log("ENV LOADED:", {
  cloud: process.env.CLOUDINARY_CLOUD_NAME,
  key: process.env.CLOUDINARY_API_KEY,
  secret: process.env.CLOUDINARY_API_SECRET
});


// Test the configuration
cloudinary.api.ping()
  .then(res => console.log("Cloudinary OK:", res))
  .catch(err => console.log("Cloudinary Error:", err));


module.exports = cloudinary;
