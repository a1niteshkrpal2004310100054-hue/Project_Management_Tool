import Router from "express";
import { isAuthenticated } from "../middleware/authMiddleware.js";
import {
  createProject,
  addTaskInProject,
  addTeamInProject,
  getAllProjects,
  getProject,
  deletProject,
} from "../controller/projectController.js";

const router = Router();

router.post("/create", isAuthenticated, createProject);
router.post("/add-task-in-team/:id", isAuthenticated, addTaskInProject);
router.post("/add-team-in-team/:id", isAuthenticated, addTeamInProject);
router.get("/get-all-project", isAuthenticated, getAllProjects);
router.post("/get-project/:id", isAuthenticated, getProject);
router.delete("/delete-project", isAuthenticated, deletProject);

export default router;
