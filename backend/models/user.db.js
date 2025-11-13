import mongoose  from "mongoose";
import { hashPassword } from "../utilities/utility.js"; 

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true

    },
    age:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    aadhar:{
        type:String,
        unique:true,
        required:true
    },
    role:{
        type:String,
        enum:['voter','admin'],
        default:'voter'
    },
    isVoted:{
        type:Boolean,
        default:false
    },

},{timestamps:true})

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next()

    try {
        this.password=await hashPassword(this.password)

        next()
        
    } catch (error) {
        console.log(error);
        next(error)
        
        
    }
})

const usermodel=mongoose.model("user",userSchema)