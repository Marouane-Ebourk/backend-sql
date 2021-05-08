const express = require("express");
const router = express.Router();
const db = require("../models");
const verify = require("../middleware/auth");

router.get("/all", (req, res) => {
  try {
    db.User.findAll({
      where:{
        RoleId: 1
      }
    }).then((admins) => res.status(200).json(admins));
  } catch (error) {
    console.error(error);
  }
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  try {
    db.User.findAll({
      where:{
        RoleId: 1,
        id: id
      }
    }).then((admin) => res.status(200).json(admin));
  } catch (error) {
    console.error(error);
  }
});

router.post("/new", (req, res) => {
  try {
    db.User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      RoleId: 1
    }).then((admin) => res.status(200).json(admin));
  } catch (error) {
    console.error(error);
  }
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  try {
    db.User.destroy({
      where:{
        id: id
      }
    }).then((admin) => res.status(200).json(admin));
  } catch (error) {
    console.error(error);
  }
});

router.put("/:id", async(req, res) => {
  const id = req.params.id;
  try {
    const admin = await db.User.findOne({
      where:{
        id: id
      }
    });
    if (req.body.name) {
      admin.name = req.body.name;
    }
    if (req.body.email) {
      admin.email = req.body.email;
    }
    if (req.body.password) {
      admin.password = req.body.password;
    }
    admin.save().then(a => res.status(200).json(a));


  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
