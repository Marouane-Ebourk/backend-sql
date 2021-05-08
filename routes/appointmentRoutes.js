const express = require("express");
const router = express.Router();
const db = require("../models");

router.get("/all", async (req, res) => {
  try {
    await db.Appointment.findAll({
      include: [

        {
          model: db.Doctor,
          include: [db.User],
        },
        {
          model: db.Patient,
          include: [db.User],
        },
        {
          model: db.Slot,
          
        }
      ],
    })
      .then((apps) => res.status(200).send(apps))
      .catch((err) => res.status(400).send(err));
  } catch (error) {
    console.error(error);
  }
});

router.post("/new/:id", async (req, res) => {
  const id = req.params.id;

  const slot = await db.Slot.findOne({
    where: {
      id: id,
    },
  });
  const schedule = await db.Schedule.findOne({
    where: {
      id: slot.ScheduleId,
    },
  });

  // const doctor= await db.Doctor.findOne({
  //   where:{
  //     id: schedule.DoctorId
  //   }
  // })

  await db.Appointment.create({
    date: req.body.app_date,
    DoctorId: schedule.DoctorId,
    SlotId: id,
    PatientId: req.body.PatientId,
  })
    .then(async (d) => {
      slot.status = true;
      await slot.save();
      res.status(200).send(d);
    })
    .catch((err) => res.status(400).send(err));
});

module.exports = router;
