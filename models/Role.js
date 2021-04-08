'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
        Role.hasOne(models.User, {
          onDelete: "cascade"
        });
    }
  }
  Role.init(
    {
      name:{
          type: DataTypes.STRING,
      }
    },
    {
      sequelize,
      modelName: 'Role',
    }
  );
  return Role;
};
