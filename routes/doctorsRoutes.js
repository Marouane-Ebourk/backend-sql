const express = require("express");
const router = express.Router();
const db = require("../models");
const verify = require("../middleware/auth");

router.get("/all", (req, res) => {
  try {
    // db.Doctor.findAll({
    //   include: [{ all: true }],
    // }).then((users) => {
    //   res.json(users);
    // });
    db.Doctor.findAll({
      include: [
        {
          model: db.User,
        },
        {
          model: db.Schedule,
          include: [db.Slot],
        },
        {
          model: db.Education,
        },
        {
          model: db.Specialty,
        },
      ],
    }).then((doctors) => res.status(200).json(doctors));
  } catch (error) {
    console.error(error);
  }
});

// create new doctor
router.post("/new", async (req, res) => {
  try {
    const specialty = await db.Specialty.create({
      name: req.body.specialty,
    });

    const user = await db.User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      RoleId: 2,
    })
      .then(async (user) => {
        db.Doctor.create({
          address: req.body.address,
          city: req.body.city,
          cost: req.body.cost,
          phone_number: req.body.phone_number,
          SpecialtyId: specialty.id,
          UserId: user.id,
        }).then(async (doc) => {
          await doc.addSpecialty(specialty);
          req.body.education.map(async (item) => {
            await db.Education.create({
              name: item,
              DoctorId: doc.id,
            });
          });

          res.status(200).send(doc);
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
    const doc = await db.Doctor.findOne({
      where: {
        id: id,
      },
    });

    doc.address = req.body.address;
    doc.city = req.body.city;
    doc.cost = req.body.cost;
    doc.phone_number = req.body.phone_number;

    doc
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

  const doctor = await db.Doctor.findOne({
    where: {
      id: id,
    },
  });

  const userId = doctor.UserId;
  const user = await db.User.findOne({
    where: {
      id: userId,
    },
  });

  await doctor
    .destroy()
    .then(user.destroy().then(() => res.status(204).send("success")))
    .catch((err) => res.status(400).send(err));
});

module.exports = router;
