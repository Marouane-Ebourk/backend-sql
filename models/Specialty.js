'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Specialty extends Model {
    static associate(models) {
        Specialty.hasMany(models.Doctor, {
          foreignKey:{
              allowNull: false
          }
        });
        Specialty.belongsToMany(
          models.Doctor,
          { through: "doctorSpacialty" });
    }
  }
  Specialty.init(
    {
      name:{
          type: DataTypes.STRING,
      }
    },
    {
      sequelize,
      modelName: 'Specialty',
    }
  );
  return Specialty;
};
