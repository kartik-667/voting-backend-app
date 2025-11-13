import usermodel from "../models/user.db.js"


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