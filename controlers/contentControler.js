const { Content, sequelize } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const content = async (req, res, next) => {
  try {
    const { text, exhibitionId } = req.body;
    console.log(exhibitionId + "TEST");
    // if (img === undefined || img === "") {
    //   return res
    //     .status(400)
    //     .json({ message: "You cannot create an exhibition without image" });
    // }
    // if (text === undefined || text === "") {
    //   return res.status(400).json({
    //     message: "You cannot create an exhibition without description.",
    //   });
    // }
    // console.log(req.file + "123456789");
    const secure_url = await cloudinary.uploader.upload(
      req.file.path,
      async (err, result) => {
        if (err) return next(err);
        fs.unlinkSync(req.file.path);
        return result.secure_url;
      }
    );
    // console.log(secure_url.secure_url);
    const newContent = await Content.create({
      picture: secure_url.secure_url,
      text,
      userId: req.user.id,
      exhibitionId,
    });

    res.status(201).json({ message: "Content has created.", newContent });
  } catch (err) {
    next(err);
  }
};

const getContent = async (req, res, next) => {
  try {
    const allContent = await Content.findAll();
    res.status(200).json({ allContent });
  } catch (err) {
    next(err);
  }
};

const getContentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const content = await Content.findOne({ where: { id } });
    if (!content) {
      return res.status(400).json({ message: "content not found." });
    }
    res.status(200).json({ content });
  } catch (err) {
    next(err);
  }
};

const deleteContent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const content = await Content.findOne({ where: { id } });
    if (!content) {
      return res.status(400).json({ message: "content not found." });
    }
    await content.destroy();
    res.status(204).json();
  } catch (err) {
    next(err);
  }
};

module.exports = { content, getContent, getContentById, deleteContent };
