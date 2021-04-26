const express = require("express");
const userControler = require("../controlers/userControler");
const userProtect = require("../middlewares/protect");
const multer = require("multer");

const router = express.Router();

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

router.post("/register", upload.single("picture"), userControler.register);
router.post("/", userControler.login);
router.get("/", userProtect.protect, userControler.getUser);

module.exports = router;
