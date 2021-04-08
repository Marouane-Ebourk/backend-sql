const express = require("express");
const router = express.Router();
const db = require("../models");

router.get("/all", (req, res) => {
  try {
    db.Schedule.findAll({
      include: [{ all: true }],
    }).then((users) => {
      res.json(users);
    });
  } catch (error) {
    console.error(error);
  }
});

router.post("/new/:id", async (req, res) => {
  const id = req.params.id;

  await db.Schedule.create({
    date: req.body.schedule_date,
    DoctorId: id,
  })
    .then((schedule) => {
      req.body.slot_time.map(async (slot) => {
        await db.Slot.create({
          time: slot,
          ScheduleId: schedule.id,
        });
      });
      res.status(200).send("success");
    })
    .catch((err) => res.status(400).send(err));
});

router.put("/update/:id", async (req, res) => {
  const id = req.params.id;
  const schedule = await db.Schedule.findOne({
    where: {
      id: id,
    },
  });
  if (req.body.schedule_date) {
    schedule.date = req.body.schedule_date;
  }
  await schedule.save().then(() => res.send("updated"));
});

router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await db.Slot.destroy({
    where: {
      ScheduleId: id,
    },
  }).then(async () => {
    await db.Schedule.destroy({
      where: {
        id: id,
      },
    })
      .then(() => res.status(200).send("success"))
      .catch((err) => res.status(400).send(err));
  });
});

module.exports = router;
