const express = require("express");
const router = express.Router();
const db = require("../models");

router.get("/all", async (req, res) => {
  await db.Slot.findAll({})
    .then((slots) => {
      res.status(200).send(slots);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.post("/new/:id", async (req, res) => {
  const id = req.params.id;

  req.body.slot_time.map(async (slot) => {
    await db.Slot.create({
      time: slot,
      ScheduleId: id,
    });
  });
  res.status(200).send("success");
});

router.put("/update/:id", async (req, res) => {
  const id = req.params.id;
  const slot = await db.Slot.findOne({
    where: {
      id: id,
    },
  });
  slot.time = req.body.slot_time;

  slot
    .save()
    .then((d) => {
      res.status(200).send(d);
    })
    .catch((err) => res.status(400).send(err));
});

router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  db.Slot.destroy({
    where: {
      id: id,
    },
  }).then(() => {
    res.status(200).send("slot deleted");
  });
});

module.exports = router;
