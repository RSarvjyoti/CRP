const cloudinary = require("cloudinary").v2; 
const {config} = require("dotenv");
const multer = require("multer");
config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,  
  api_key: process.env.CLOUDINARY_API_KEY,       
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage(); 

const multerUpload = multer({ storage: storage });

const uploadToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { resource_type: "auto" }, 
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);  
        }
      }
    ).end(file.buffer);
  });
};

module.exports = {cloudinary, multerUpload, uploadToCloudinary};