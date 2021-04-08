'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
        User.belongsTo(models.Role, {
            foreignKey:{
                allowNull: false
            }
        });
        // User.belongsToMany(models.Specialty, {through: 'doctorSpacialty', foreignKeyConstraint:{
        //   allowNull: true
        // }});
        // User.hasMany(models.Education, {
        //   onDelete: 'cascade'
        // });
        // User.hasMany(models.Schedule, {
        //   onDelete: 'cascade'
        // });
        User.hasOne(models.Doctor, {
          onDelete: "cascade"
        });
        User.hasOne(models.Patient, {
          onDelete: "cascade",
        });
    }
  }
  User.init(
    {
      name:{
          type: DataTypes.STRING
      },
      email:{
        type: DataTypes.STRING,
        unique: true
    },
    password:{
        type: DataTypes.STRING
    },
    // address:{
    //     type: DataTypes.STRING
    // },
    // city:{
    //     type: DataTypes.STRING
    // },
    // cost:{
    //     type: DataTypes.FLOAT
    // },
    // phone_number:{
    //     type: DataTypes.STRING,
    // },
    // confirmed:{
    //     type: DataTypes.BOOLEAN,
    //     defaultValue: false
    // },

    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
