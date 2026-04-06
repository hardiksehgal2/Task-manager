import { Router } from "express";
import validate from "../../common/middleware/validate.middleware.js";
import * as controller from "./tasks.controller.js"
import TaskDto from "./dto/tasks.dto.js";
import { authenticate } from "../auth/auth.middleware.js";


const router = Router()

router.post("/tasks", authenticate, validate(TaskDto), controller.postTasks)
router.get("/tasks", authenticate, controller.getTasks)
router.put("/tasks/:id", authenticate, controller.updateTask)
router.delete("/tasks/:id", authenticate, controller.deleteTask)


export default router

