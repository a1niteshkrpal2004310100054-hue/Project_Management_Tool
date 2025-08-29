import Router from "express";
import {
  getTaskByID,
  getTaskByProject,
  updateTask,
  deleteTask,
} from "../controller/taskController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/get-task/:id", isAuthenticated, getTaskByID);
router.post("/get-task-by-project", isAuthenticated, getTaskByProject);
router.patch("/update-task/:id", isAuthenticated, updateTask);
router.delete("/get-task-by-project", isAuthenticated, deleteTask);

export default router;
