import usermodel from "../models/user.db.js"
import { comparePassword, generateToken } from "../utilities/utility.js"

import jwt from 'jsonwebtoken'


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

    
    if(newuser){
        const token=generateToken(newuser)
        res.cookie("token",token,{
            httpOnly:true
        })
        
        return res.status(201).json({
       msg:"user created",
       newuser

   })
    }
        
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

    const token=generateToken(user)

    res.cookie("token",token,{
        httpOnly:true
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