import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

// Configure Cloudinary
cloudinary.config({
  cloud_name: "dkxjl9qii",
  api_key: "639126343226291",
  api_secret: "gIRwZB-KEpEck4iDg3M8xYQpvyE",
});

// Configure Multer-Storage-Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads", // The folder in Cloudinary to store files
    allowed_formats: ["jpg", "png", "jpeg", "gif"], // Allowed file formats
    transformation: [{ width: 500, height: 500, crop: "limit" }], // Optional transformations
  },
});

const upload = multer({ storage });

export { cloudinary, upload };
