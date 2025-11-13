import express from 'express'
import { signup } from '../controller/user.controller.js'
const userRouter=express.Router()
signup


userRouter.post("/signup",signup)

export default userRouter