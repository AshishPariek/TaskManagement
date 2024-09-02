const { Sequelize } = require("sequelize");
require("dotenv").config();

const logger = (log) => {
  console.log("Logs :", log);
};

const sequelize = new Sequelize(process.env.MYSQL_URI, {
  dialect: "mysql",
  logging: logger,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to MySQL");
  } catch (error) {
    console.error("Error connecting to MySQL:", error);
    process.exit(1); // Exit process with failure
  }
};

module.exports = { sequelize, connectDB };
