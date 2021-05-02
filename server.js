const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = require("./models");

const usersRoutes = require("./routes/usersRoutes");
app.use("/api/users", usersRoutes);

const doctorRoutes = require("./routes/doctorsRoutes");
app.use("/api/doctors", doctorRoutes);

const patientRoutes = require("./routes/patientRoutes");
app.use("/api/patients", patientRoutes);

const scheduleRoutes = require("./routes/scheduleRoutes");
app.use("/api/schedules", scheduleRoutes);

const slotRoutes = require("./routes/slotRoutes");
app.use("/api/slots", slotRoutes);

const appointmentRoutes = require("./routes/appointmentRoutes");
app.use("/api/apps", appointmentRoutes);

const specialtiesRoutes = require("./routes/specialtiesRoutes");
app.use("/api/specialties", specialtiesRoutes);

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

db.sequelize.sync().then(() => {
  app.listen("4000", () => {
    console.log(`listening to port 4000`);
  });
});
