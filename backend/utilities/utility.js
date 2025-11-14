import bcrypt from 'bcrypt'
import mongoose, { mongo } from 'mongoose'
import jwt from 'jsonwebtoken'
import usermodel from '../models/user.db.js'



export const checkAdmin=async (userid)=>{
    try {
         
        const user=await usermodel.findOne({_id:userid})
        if(!user) return false
        if(user.role.toLowerCase() !== "admin"){
             return false

        }

        return true
        
        
    } catch (error) {
                console.log(error.message);

        
    }

}

export const generateToken=(user)=>{
    const payload={
        id:user._id
    }
    const token=jwt.sign(payload,process.env.JWT_SECRET)

    return token



}

export async function connectDB(){
    try {
        const res=await mongoose.connect(process.env.MONGO_URL)
        console.log("mongodb connected");
        
        
        
    } catch (error) {
        console.log("mongo connection failed",error.message);
        
        
    }
}

export async function hashPassword(oldpass){
    const salt=await bcrypt.genSalt(10)
    const hashed=await bcrypt.hash(oldpass,salt)
    return hashed
}


export async function comparePassword(inputpass,hashedpass){
    const res=bcrypt.compare(inputpass,hashedpass)
    return res
}