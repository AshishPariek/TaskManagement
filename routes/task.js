const express = require("express");
const router = express.Router();
const { authCheck } = require("../middleware/authCheck");
const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

router.use(authCheck);

router.get("/list-all", getAllTasks);
router.get("/:taskId", getTaskById);
router.post("/create", createTask);
router.put("/:taskId", updateTask);
router.delete("/:taskId", deleteTask);

module.exports = router;
