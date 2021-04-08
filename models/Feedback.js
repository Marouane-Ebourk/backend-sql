'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Feedback extends Model {
    static associate(models) {
        Feedback.belongsTo(models.Patient, {
          foreignKey:{
              allowNull: false
          }
        });
        Feedback.hasOne(models.Doctor, {});
    }
  }
  Feedback.init(
    {
      text:{
          type: DataTypes.STRING,
      },
      rating:{
          type: DataTypes.INTEGER,
      }
    },
    {
      sequelize,
      modelName: 'Feedback',
    }
  );
  return Feedback;
};
