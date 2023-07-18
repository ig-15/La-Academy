import express from "express"
import { login, logout } from "../controllers/authController.js"
import { authenticate } from "../middleware/authMiddleware.js"

const authRouter = express.Router()

authRouter.use("/logout",authenticate)
authRouter.post("/login",login)
authRouter.post("/logout",logout)



export default authRouter