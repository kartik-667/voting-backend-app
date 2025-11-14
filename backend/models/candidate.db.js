import mongoose from "mongoose";
import { hashPassword } from "../utilities/utility.js";
const candidateSchema=new mongoose.Schema({
    name:{
        type:String,
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
    partyname:{
        type:String,
        required:true
    },
    votes:[
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"user",
                required:true
            },
            votedAt:{
                type:Date,
                default:Date.now()
            }
        }
    ],
    voteCount:{
        type:Number,
        default:0
    }

},{timestamps:true})

candidateSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        return next()
    }
    try {
        this.password=await hashPassword(this.password)
        next()
        
    } catch (error) {
        console.log(error);
        
        next(error)
        
    }
})

const candidatemodel=mongoose.model("candidate",candidateSchema)

export default candidatemodel