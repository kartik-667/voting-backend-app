import usermodel from "../models/user.db.js"
import { comparePassword } from "../utilities/utility.js"


export const signup=async (req,res)=>{
    const {name,age,email,password,aadhar}=req.body
    try {
         const user=await usermodel.findOne({email})
    if(user){
        return res.status(200).json({
            msg:"user already exists"
        })
    }

    const newuser=await usermodel.create({
        name,age,email,password,aadhar
    })
    if(newuser) return res.status(201).json({
        msg:"user created",
        newuser

    })
        
    } catch (error) {
        console.log(error);
        
        
    }

   

}

export const login=async (req,res)=>{
    const {email,password}=req.body

    try {
        const user=await usermodel.findOne({email})
    if(!user){
        return res.status(200).json({
            msg:"user not found with email"
        })
    }

    //check pass
    const result=await comparePassword(password,user.password)
    if(!result) return  res.status(200).json({
            msg:"incorrect email/password"
        })

    return res.status(200).json({
        msg:"login successful",
        user:user.name,
        userid:user._id
    })
        
    } catch (error) {
        console.log(error);
        
        
    }

    
    

}