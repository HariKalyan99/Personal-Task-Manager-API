"use strict";
const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../../connection/database");
const AppError = require("../../middlewares/appError");
const task = require("./task");

const user = sequelize.define(
  "user",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notNull: {
          msg: "username cannot be null",
        },
        notEmpty: {
          msg: "username cannot be empty",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notNull: {
          msg: "email cannot be null",
        },
        notEmpty: {
          msg: "email cannot be empty",
        },
        isEmail: {
          msg: "Invalid email id",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "password cannot be null",
        },
        notEmpty: {
          msg: "password cannot be empty",
        },
      },
    },
    confirmPassword: {
      type: DataTypes.VIRTUAL,
      set(value) {
        if (this.password.length < 7) {
          throw new AppError("Password length must be greater than 7", 400);
        }
        if (value === this.password) {
          const hashedPassword = bcrypt.hashSync(value, 10);
          this.setDataValue("password", hashedPassword);
        } else {
          throw new Error("Password and confirm password must be the same");
        }
      },
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    deletedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    paranoid: true,
    freezeTableName: true,
    modelName: "user",
  }
);

user.hasMany(task, { foreignKey: "userId" });
task.belongsTo(user, {
  foreignKey: "userId",
});

module.exports = user;
