const { Exhibition, sequelize, Content } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const createAnExhibition = async (req, res, next) => {
  try {
    const { name, description, status } = req.body;
    if (name === undefined || name === "") {
      return res.status(400).json({
        message:
          "Cannot create an exhibition, please enter an exhibition name.",
      });
    }

    const newExhibition = await Exhibition.create({
      name,
      description,
      status,
      userId: req.user.id,
    });

    res
      .status(201)
      .json({ message: "An exhibition has created.", newExhibition });
  } catch (err) {
    next(err);
  }
};

const getAnExhibition = async (req, res, next) => {
  try {
    const getStatusExhibition = await Exhibition.findAll({
      //findAll จะคืนค่าเป้น array
      where: { status: "SHOWING" },
    });
    let t;
    /// ตัวแปร global
    for (let index = 0; index < getStatusExhibition.length; index++) {
      const element = getStatusExhibition[index];
      t = await Content.findAll({ where: { exhibitionId: element.id } });
      console.log(t);
      if (t) {
        t.map((item) => (item.dataValues["exhibitionId"] = element));
      }
    }
    res.status(200).json({ t });
  } catch (err) {
    next(err);
  }
};

module.exports = { createAnExhibition, getAnExhibition };
