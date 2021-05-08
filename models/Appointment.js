"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    static associate(models) {
      Appointment.belongsTo(models.Doctor, {
        foreignKey: {
          allowNull: false,
        },
      });
      Appointment.belongsTo(models.Patient, {
        foreignKey: {
          allowNull: false,
        },
      });
      Appointment.belongsTo(models.Slot, {
        foreignKey: {
          allowNull: false,
        },
      });
    }
  }
  Appointment.init(
    {
      date: DataTypes.DATE,
      confirmed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Appointment",
    }
  );
  return Appointment;
};
