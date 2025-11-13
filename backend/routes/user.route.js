import express from 'express'
import { login, profile, signup } from '../controller/user.controller.js'
import { protect } from '../auth/auth.js'
const userRouter=express.Router()
signup


userRouter.post("/signup",signup)

userRouter.post("/login",login)

userRouter.get("/profile",protect,profile)

export default userRouter