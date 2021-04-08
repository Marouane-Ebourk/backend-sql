const express = require("express");
const router = express.Router();
const db = require("../models");

router.get("/all", (req, res) => {
  try {
    db.Patient.findAll({
      include: [{ all: true }],
    }).then((users) => {
      res.json(users);
    });
  } catch (error) {
    console.error(error);
  }
});

// create new patient
router.post("/new", async (req, res) => {
  try {
    const user = await db.User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      RoleId: 3,
    })
      .then((user) => {
        db.Patient.create({
          city: req.body.city,
          phone_number: req.body.phone_number,
          UserId: user.id,
        }).then(async (patient) => {
          res.status(200).send(patient);
        });
      })
      .catch((err) => res.status(400).send(err));
  } catch (error) {
    console.error(error);
  }
});

router.put("/update/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const patient = await db.Patient.findOne({
      where: {
        id: id,
      },
    });

    patient.city = req.body.city;
    patient.phone_number = req.body.phone_number;

    patient
      .save()
      .then((d) => {
        res.status(200).json(d);
      })
      .catch((err) => res.status(400).json(err));
  } catch (error) {
    console.error(error);
  }
});

router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  if (Number.isNaN(id)) return res.status(400).end();

  const patient = await db.Patient.findOne({
    where: {
      id: id,
    },
  });

  const userId = patient.UserId;
  const user = await db.User.findOne({
    where: {
      id: userId,
    },
  });

  await patient
    .destroy()
    .then(user.destroy().then(() => res.status(204).send("success")))
    .catch((err) => res.status(400).send(err));
});

module.exports = router;
