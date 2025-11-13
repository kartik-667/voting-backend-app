import express from 'express'
import { login, signup } from '../controller/user.controller.js'
const userRouter=express.Router()
signup


userRouter.post("/signup",signup)

userRouter.post("/login",login)

export default userRouter