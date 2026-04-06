import { Router } from "express";
import validate from "../../common/middleware/validate.middleware.js";
import LoginDto from "./dto/login.dto.js";
import * as controller from "./auth.controller.js"
import RegisterDto from "./dto/register.dto.js";
import { authenticate } from "./auth.middleware.js";


const router = Router()

router.post("/register", validate(RegisterDto), controller.register)
router.post("/login", validate(LoginDto), controller.login)
router.get("/me", authenticate, controller.getMe)
router.post("/refresh", controller.refresh)
router.post("/logout", authenticate, controller.logout)


export default router

