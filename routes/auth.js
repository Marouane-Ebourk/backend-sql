const express = require("express");
const router = express.Router();
const db = require("../models");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.post("/login", async (req, res) => {
  const user = await db.User.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (!user) {
    return res.status(400).send("email not found");
  }
  if (req.body.password != user.password) {
    return res.status(400).send("password in invalid");
  }

  const token = jwt.sign(
    { id: user.id, name: user.name },
    process.env.jwt_secret
  );
  res.header("auth-token", token).send(token);
  //   res.status(200).send("logged in");
});

module.exports = router;
