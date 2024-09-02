const express = require("express");
const cors = require("cors");
const { connectDB } = require("./db");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/task");

const app = express();
connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

const port = process.env.PORT;

app.listen(port, () => {
  console.log("app is listening at", port);
});
