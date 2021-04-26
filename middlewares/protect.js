const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { User } = require("../models");

exports.protect = async (req, res, next) => {
  try {
    let token = null;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    // console.log(req.header.authorization);
    if (!token) {
      return res.status(401).json({ message: "You are unauthorize." });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ where: { id: payload.id } });
    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
