import candidatemodel from "../models/candidate.db.js"
import usermodel from "../models/user.db.js"
import { comparePassword, generateToken } from "../utilities/utility.js"



export const signup=async (req,res)=>{
    const {name,age,email,password,aadhar,role}=req.body
    try {
         const user=await usermodel.findOne({email})
    if(user){
        return res.status(200).json({
            msg:"user already exists"
        })
    }

    const newuser=await usermodel.create({
        name,age,email,password,aadhar,role
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

export const profile=async (req,res)=>{
    const userid=req.user

    const userdata=await usermodel.findOne({_id:userid.id}).select("-password")

    if(!userdata || !userid){
        return res.status(400).json({
            msg:"user not logged in"
        })
    }

    return res.status(200).json({
        user:userdata
    })
}

export const passwordChange=async (req,res)=>{
    try {
        const userid=req.user.id
        const {oldpass,newpass}=req.body

        const user=await usermodel.findOne({_id:userid})
        if(!user) return res.status(400).json({msg:"user not found"})

        let result=await comparePassword(oldpass,user.password)
        if(result){
            user.password=newpass
            await user.save()
            return res.status(203).json({msg:"password updated successfully"})


        }else{
            return res.status(400).json({msg:"please enter correct pass"})
        }

        
    } catch (error) {
        console.log("internal server error",error);
        
        
    }
}

export const logout= (req,res)=>{
    try {
        const user=req.cookies?.token
        if(user){

            
            res.clearCookie("token",{
                httpOnly:true
            })
            
        }
        return res.status(200).json({ msg: "Logged out successfully" });
        
    } catch (error) {
        console.log("internal server error",error);
        
    }
}

export const vote=async (req,res)=>{
    try {
        const candidate_id=req.params.candidateid
        const userid=req.user.id

        const user=await usermodel.findById(userid)

        if(user){
            if(user.isVoted === true){
                return res.status(200).json({msg:"user has already voted , cant vote again"})
            }else{
                const party=await candidatemodel.findOne({_id :candidate_id})
                if(!party){
                     return res.status(400).json({msg:"no party found"})

                }

                party.votes.push({user:userid})
                party.voteCount=party.voteCount+1
                user.isVoted=true
                await user.save()
                await party.save()
                return res.status(200).json({msg:`${user.name} has casted vote to ${party.name}`,party})


            }
        }else{
            return res.status(400).json({msg:"cant find user"})
        }
        
    } catch (error) {
          console.log("internal server error",error);
        
    }
}