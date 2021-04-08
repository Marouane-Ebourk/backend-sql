'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Education extends Model {
    static associate(models) {
        Education.belongsTo(models.Doctor, {
          foreignKey:{
              allowNull: false
          }
        });
    }
  }
  Education.init(
    {
      name:{
          type: DataTypes.STRING,
      }
    },
    {
      sequelize,
      modelName: 'Education',
    }
  );
  return Education;
};
