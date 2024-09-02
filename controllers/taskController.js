const Task = require("../models/tasks");
const User = require("../models/users");

module.exports.getAllTasks = async (req, res) => {
  const UserId = req.user.UserId;

  try {
    const user = await User.findOne({ where: { UserId } });

    if (user.Role === "admin") {
      const tasks = await Task.findAll({ where: { createdBy: UserId } });
      res.status(200).json(tasks);
    } else {
      const tasks = await Task.findAll({ where: { aAssigneeId: UserId } });
      res.status(200).json(tasks);
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports.getTaskById = async (req, res) => {
  const { taskId } = req.params;

  try {
    const task = await Task.findOne({ where: { TaskId: taskId } });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Tasks fetched", data: task });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports.createTask = async (req, res) => {
  const createdBy = req.user.UserId;
  const { Title, Description, Priority, AssigneeId } = req.body;

  try {
    const checkAlready = await Task.findAll({ where: { Title } });

    if (checkAlready.length) {
      res.status(409).json({ message: "Task with same name already exists" });
    }

    const task = await Task.create({
      Title,
      Description,
      Priority,
      createdBy,
      AssigneeId,
    });
    res.status(201).json({ message: "Tasks created", data: task });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports.updateTask = async (req, res) => {
  const { taskId } = req.params;
  const { Title, Description, Status } = req.body;

  try {
    const task = await Task.findOne({ where: { TaskId: taskId } });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.Title = Title || task.Title;
    task.Description = Description || task.Description;
    task.Status = Status || task.Status;

    await task.save();
    res.status(200).json({ message: "Tasks updated", data: task });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports.deleteTask = async (req, res) => {
  const { taskId } = req.params;

  try {
    const task = await Task.findOne({ where: { TaskId: taskId } });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    await task.destroy();
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
