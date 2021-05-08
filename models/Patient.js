"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    static associate(models) {
      Patient.hasMany(models.Feedback, {});
      Patient.belongsTo(models.User, {
        foreignKey: {
          allowNull: false,
        },
      });
      Patient.hasMany(models.Appointment, {
        
      });
    }
  }
  Patient.init(
    {
      city: {
        type: DataTypes.STRING,
      },
      phone_number: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Patient",
    }
  );
  return Patient;
};
