import express from 'express'
import dotenv from 'dotenv'
const app=express()
dotenv.config()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/",(req,res)=>{
    return res.status(200).json({
        msg:"home page "
    })

})

app.listen(process.env.PORT,()=>{
    console.log("listening on given port ");
    
})

