const express = require("express");
const router = express.Router();
const db = require("../models");
const jwt = require("jsonwebtoken");

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

router.get("/:id", (req, res) => {
  const id = req.params.id;
  try {
    db.Patient.findOne({
      where: { UserId: id },
      include: [
        { model: db.Feedback },
        { model: db.User },
        { model: db.Appointment, include: [db.Doctor, db.Slot] },
      ],
    }).then((patient) => {
      res.json(patient);
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
          const token = jwt.sign(
            { id: user.id, name: user.name, role: user.RoleId },
            process.env.jwt_secret
          );
          res.header("auth-token", token).send(token);
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
      .then(async (patient) => {
        const id = patient.UserId;
        const user = await db.User.findOne({
          where: {
            id: id,
          },
        });
        user.name = req.body.name;
        user.email = req.body.email;
        user.password = req.body.password;
        user.RoleId = 3;

        user
          .save()
          .then(() => {
            res.status(200).send("success");
          })
          .catch((err) => res.status(400).send(err));
      })
      .catch((err) => res.send(err));
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
