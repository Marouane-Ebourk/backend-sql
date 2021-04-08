const express = require("express");
const router = express.Router();
const db = require("../models");

router.get("/all", (req, res) => {
  try {
    db.User.findAll({
      include: [{ all: true }],
    }).then((users) => {
      res.json(users);
    });
  } catch (error) {
    console.error(error);
  }
});

// create new patient

// router.post("/new/pat", async (req, res) => {
//   try {
//     const user = await db.User.create({
//       name: req.body.name,
//       email: req.body.email,
//       password: req.body.password,
//       city: req.body.city,
//       phone_number: req.body.phone_number,
//       RoleId: 3
//     })
//       .then( patinet => {
//           res.status(200).send(patinet);
//         })
//       .catch((err) => console.error(err));

//     // await user.addSpecialty(specialty);
//     // const education = await db.Education.create({
//     //     name: req.body.education,
//     //     UserId: user.id
//     // });

//     // res.json(user, education);
//   } catch (error) {
//     console.error(error);
//   }
// });

module.exports = router;
