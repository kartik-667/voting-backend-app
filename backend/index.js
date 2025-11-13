import express from 'express'
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js'
import { connectDB } from './utilities/utility.js'
const app=express()
dotenv.config()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/",(req,res)=>{
    return res.status(200).json({
        msg:"home page "
    })

})

app.use("/api/user",userRouter)

app.listen(process.env.PORT,async ()=>{
    console.log("listening on given port ");
    await connectDB()
    
})

