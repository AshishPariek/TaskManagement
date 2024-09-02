const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");
const User = require("./users");

const RefreshToken = sequelize.define(
  "RefreshToken",
  {
    TokenId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Token: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    ExpiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "UserId",
      },
    },
  },
  { timestamps: false }
);

module.exports = RefreshToken;
