const express = require("express");
const router = express.Router();
const exhibitionControl = require("../controlers/exhibitionControler");
// const passport = require("passport");
const userProtect = require("../middlewares/protect");
// // const authmid = passport.authenticate("jwt", { session: false });

router.get("/", exhibitionControl.getAnExhibition);
router.post("/", userProtect.protect, exhibitionControl.createAnExhibition);
// // router.put("/");
// // router.delete("/");

module.exports = router;
