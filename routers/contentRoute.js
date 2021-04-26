const express = require("express");
const router = express.Router();
const contentControl = require("../controlers/contentControler");
const userProtect = require("../middlewares/protect");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
    console.log(file + "456789");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}.${file.mimetype.split("/")[1]}`);
    console.log(file);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype.split("/")[1] === "jpeg" ||
      file.mimetype.split("/")[1] === "jpg" ||
      file.mimetype.split("/")[1] === "png"
    ) {
      cb(null, true);
    } else {
      cb(new Error("This file is not a photo."));
    }
    console.log(file);
  },
});

router.get("/:id", contentControl.getContentById);
router.get("/", contentControl.getContent);
router.post(
  "/",
  userProtect.protect,
  upload.single("picture"),
  contentControl.content
);
router.put("/");
router.delete("/", userProtect.protect, contentControl.deleteContent);

module.exports = router;
