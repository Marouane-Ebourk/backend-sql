"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Doctor extends Model {
    static associate(models) {
      Doctor.belongsTo(models.User, {
        foreignKey: {
          allowNull: false,
        },
      });
      Doctor.belongsToMany(models.Specialty, { through: "doctorSpacialty" });
      Doctor.hasMany(models.Education, {
        onDelete: "cascade",
      });
      Doctor.hasMany(models.Schedule, {
        onDelete: "cascade",
      });
    }
  }
  Doctor.init(
    {
      address: {
        type: DataTypes.STRING,
      },
      city: {
        type: DataTypes.STRING,
      },
      cost: {
        type: DataTypes.FLOAT,
      },
      phone_number: {
        type: DataTypes.STRING,
      },
      confirmed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Doctor",
    }
  );
  return Doctor;
};
