import Router from "express";
import { createTeam } from "../controller/teamController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/create", createTeam);

export default router;
