import mongoose  from "mongoose";


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

const usermodel=mongoose.model("user",userSchema)