import candidatemodel from "../models/candidate.db.js";
import usermodel from "../models/user.db.js";
import { checkAdmin } from "../utilities/utility.js";


export const getAllCandidates=async (req,res)=>{
    
    try {
        const userid=req.user.id
        const result=await checkAdmin(userid)
        if(!result){
            return res.status(400).json({msg:"content only available for admins"})

        }
        // const user=await usermodel.findOne({_id:userid})
        // if(!user) return res.status(400).json({msg:"user not found"})
        // if(user.role.toLowerCase() !== "admin"){

        // }

        const data=await candidatemodel.find()
        return res.status(200).json({
            data
        })
        
    } catch (error) {
        console.log("server error",error);
        
        
    }
}

export const addCandidate=async (req,res)=>{
    try {
        const userid=req.user.id
        const result=await checkAdmin(userid)
        if(!result){
            return res.status(400).json({msg:"content only available for admins"})

        }

        const {name,email,password,partyname}=req.body
        if(!name || !email || !password || !partyname){
            return res.status(400).json({msg:"pls provide all details"})
        }

        const newdata=await candidatemodel.create({
            name,email,password,partyname
        })

        return res.status(200).json({msg:"created succesful",data:newdata})
        
    } catch (error) {
        console.log("server error",error);
        
    }
}

export const updateCandidate=async (req,res)=>{
    try {
        const userid=req.user.id
        const result=await checkAdmin(userid)
        if(!result){
            return res.status(400).json({msg:"content only available for admins"})
            
        }
        const candidateId=req.params.id
         const {name,email,password,partyname}=req.body

        const data=await candidatemodel.findOneAndUpdate({_id:candidateId},{name,email,password,partyname},{new:true})
        if(!data){
            return res.status(400).json({msg:"couldnt update , some error occured"})
        }

        if(data) return res.status(203).json({msg:"document updated succesfully"})


        
    } catch (error) {
        console.log("server error",error);
        
    }
}