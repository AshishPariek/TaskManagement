const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");
const User = require("./users");

const Task = sequelize.define(
  "Task",
  {
    TaskId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    Description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    Status: {
      type: DataTypes.ENUM("pending", "in_progress", "completed"),
      defaultValue: "pending",
    },
    Priority: {
      type: DataTypes.ENUM("low", "medium", "high"),
      defaultValue: "medium",
    },
    createdBy: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "UserId",
      },
    },
    AssigneeId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "UserId",
      },
    },
  },
  { timestamps: false }
);

module.exports = Task;
