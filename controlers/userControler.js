const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User, sequelize } = require("../models");
require("dotenv").config();

// const protect = async (req, res, next) => {
//   try {
//     let token = null;
//     if (
//       req.header.authorization &&
//       req.headers.authorization.startWith("Bearer")
//     ) {
//       token = req.headers.authorization.split(" ")[1];
//     }
//     if (!token) {
//       return res.status(401).json({ message: "You are unauthorize." });
//     }
//     const payload = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findOne({ where: { id: payload.id } });
//     if (!user) {
//       return res.status(400).json({ message: "User not found." });
//     }
//     req.user = user;
//     next();
//   } catch (err) {
//     next(err);
//   }
// };

const register = async (req, res, next) => {
  console.log(req.body);
  const trans = await sequelize.transaction();
  try {
    const {
      username,
      password,
      confirmPassword,
      email,
      firstName,
      lastName,
      displayName,
      address,
      profileImg,
      roles,
    } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "password is not match." });
    }

    if (username === undefined || username === "") {
      return res.status(400).json({
        message: "Cannot register, please fill your data in a blank collumn.",
      });
    }

    if (password === undefined || password === "") {
      return res.status(400).json({
        message: "Cannot register, please fill your data in a blank collumn.",
      });
    }

    if (confirmPassword === undefined || confirmPassword === "") {
      return res.status(400).json({
        message: "Cannot register, please fill your data in a blank collumn.",
      });
    }
    if (email === undefined || email === "") {
      return res.status(400).json({
        message: "Cannot register, please fill your data in a blank collumn.",
      });
    }

    if (firstName === undefined || firstName === "") {
      return res.status(400).json({
        message: "Cannot register, please fill your data in a blank collumn.",
      });
    }

    if (lastName === undefined || lastName === "") {
      return res.status(400).json({
        message: "Cannot register, please fill your data in a blank collumn.",
      });
    }

    if (displayName === undefined || displayName === "") {
      return res.status(400).json({
        message: "Cannot register, please fill your data in a blank collumn.",
      });
    }

    if (address === undefined || address === "") {
      return res.status(400).json({
        message: "Cannot register, please fill your data in a blank collumn.",
      });
    }

    const user = await User.findOne({ where: { username } });
    if (user) {
      return res
        .status(400)
        .json({ message: "This username is already in used." });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      +process.env.BECRYPT_SALT
    );
    const newUser = await User.create(
      {
        username,
        password: hashedPassword,
        email,
        firstName,
        lastName,
        displayName,
        address,
        profileImg,
        roles,
        createTime: new Date(),
      },
      { transaction: trans }
    );

    const client = { id: newUser.id, firstName, lastName, displayName };
    // const token = jwt.sign(payload, process.env.JWT_SECRET, {
    //   expiresIn: +process.env.JWT_EXPRIED_IN,
    // });
    await trans.commit();
    res.status(201).json({ message: "Register successful", client });
  } catch (err) {
    await trans.rollback();
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res
        .status(400)
        .json({ message: `username or password is incorrect.` });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res
        .status(400)
        .json({ message: "username or password is incorrect." });
    }
    const payload = { id: user.id, username: user.username };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPRIED_IN,
    });
    res.status(200).json({ token, roles: user.roles });
  } catch (err) {
    next(err);
  }
};

const changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword, confirmNewPassword } = req.body;
    const oldPasswordTrue = await bcrypt.compare(
      oldPassword,
      req.user.password
    );
    if (!oldPasswordTrue) {
      return res.status(400).json({ message: "Incorrect password" });
    }
    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({ message: "Password is not match." });
    }
    const newPasswordChange = await bcrypt.hash(
      newPassword,
      +process.env.BECRYPT_SALT
    );
    req.user.password = newPasswordChange;
    await req.user.save();
    res.status(201).json({ message: "Password has changed." });
  } catch (err) {
    next(err);
  }
};

const getUser = async (req, res, next) => {
  try {
    res.status(200).json({ message: "" });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login, getUser };
