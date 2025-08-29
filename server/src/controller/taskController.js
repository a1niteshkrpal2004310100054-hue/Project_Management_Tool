import { Task } from "../model/taskModel";

// create task
export const createTask = async (req, res) => {
  const userId = req.user.userId;
  const { name, description, projectId, assignedTo } = req.body;
  if (!userId) {
    return res.json({ message: "Unauthorized User" });
  }
  if (!name || !description || projectId || assignedTo) {
  }
  try {
    const task = await Task.craete({
      name,
      description,
      projectId,
      assignedTo,
    });

    if (!task) {
      return res.status(404).json({ message: "Error creating task" });
    }
  } catch (error) {
    console.error(error);
  }
};

// Get Project's task
export const getTaskByProject = async (req, res) => {
  const userId = req.user.userId;
  const projectId = req.params.id;

  if (!userId) {
    return res.json({ message: "Unauthorized User" });
  }

  if (!projectId) {
    return res.status(404).json({ message: "Invalid project ID" });
  }
  try {
    const task = await Task.find({ project: projectId });
    if (!task) {
      return res.status(400).json({ message: "Task not Found" });
    }
    return res.status(201).json({ message: "task populated", task });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get Single task
export const getTaskByID = async (req, res) => {
  const userId = req.user.userId;
  const taskId = req.params.id;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized User" });
  }

  if (!projectId) {
    return res.status(404).json({ message: "Invalid project ID" });
  }
  try {
    const task = await Task.find({ _id: taskId });
    if (!task) {
      return res.status(400).json({ message: "Task not Found" });
    }
    return res.status(200).json({ message: "Task populated", task });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// update task
export const updateTask = async (req, res) => {
  const taskId = req.params.id;
  const userId = req.user.userId;
  const { name, assignedTo, description } = req.body;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized User" });
  }

  if (!taskId) {
    return res.status(400).json({ message: "TaskId is missing" });
  }
  try {
    const task = await Task.findById({ _id: taskId });

    if (!task) {
      return res.status(404).json({ message: "task not found" });
    }

    if (name) task.name = name;
    if (name) task.description = description;
    if (name) task.assignedTo = assignedTo;

    task.save();
    return res.status(201).json({ message: "task updated", task });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// delete task
export const deleteTask = async (req, res) => {
  const taskId = req.params.id;
  const userId = req.body;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized User" });
  }

  if (!taskId) {
    return res.status(400).json({ message: "TaskId is missing" });
  }
  try {
    const task = await Task.findById({ id: taskId });

    if (task.createdBy.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "Forbidden: You do not own this task." });
    }

    await task.findByIdAndDelete(taskId);

    return res.status(201).json({ message: "Task deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
