const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cd(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}.${file.mimetype.split("/")[1]}`);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, split) => {
    if (
      file.mimetype.split("/")[1] === "jpeg" ||
      file.mimetype.split("/")[1] === "jpg" ||
      file.mimetype.split("/")[1] === "png"
    ) {
      cb(null, true);
    } else {
      cb(new Error("This file is not a photo."));
    }
  },
});

const secure_url = await cloudinary.uploader.upload(
  req.file.path,
  async (err, result) => {
    if (err) return nextTick(err);
  }
);
