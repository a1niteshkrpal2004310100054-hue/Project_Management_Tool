import Router from "express";
import userRoute from "./userRoute.js";
import projectRoute from "./projectRoute.js";
import taskRoute from "./taskRoute.js";
import teamRoute from "./teamRoute.js";

const router = Router();

router.use("/user", userRoute);
router.use("/team", teamRoute);
router.use("/project", projectRoute);
router.use("/task", taskRoute);

export default router;
