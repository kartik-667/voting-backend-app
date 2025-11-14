import express from 'express'
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js'
import { connectDB } from './utilities/utility.js'
import cookieParser from 'cookie-parser'
import candidateRouter from './routes/candidate.route.js'
import { protect } from './auth/auth.js'
const app=express()
dotenv.config()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.get("/",(req,res)=>{
    return res.status(200).json({
        msg:"home page "
    })

})

app.use("/api/user",userRouter)
app.use("/api/candidate",protect,candidateRouter)

app.listen(process.env.PORT,async ()=>{
    console.log("listening on given port ");
    await connectDB()
    
})

