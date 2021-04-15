const express = require("express");
const router = express.Router();
const db = require("../models");

router.get("/all", async (req, res) => {
  await db.Specialty.findAll({})
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(400).send(err));
});

module.exports = router;
