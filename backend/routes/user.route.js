import express from 'express'
import { login, passwordChange, profile, signup } from '../controller/user.controller.js'
import { protect } from '../auth/auth.js'
const userRouter=express.Router()


userRouter.post("/signup",signup)

userRouter.post("/login",login)

userRouter.get("/profile",protect,profile)

userRouter.put("/profile/password",protect,passwordChange)

export default userRouter