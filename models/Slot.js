"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Slot extends Model {
    static associate(models) {
      Slot.belongsTo(models.Schedule, {
        foreignKey: {
          allowNull: false,
        },
      });
      Slot.hasOne(models.Appointment, {
        onDelete: "cascade",
      });
    }
  }
  Slot.init(
    {
      time: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Slot",
    }
  );
  return Slot;
};
