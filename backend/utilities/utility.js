import bcrypt from 'bcrypt'


export async function hashPassword(oldpass){
    const salt=await bcrypt.genSalt(10)
    const hashed=await bcrypt.hash(oldpass,salt)
    return hashed
}


export async function comparePassword(inputpass,hashedpass){
    const res=bcrypt.compare(inputpass,hashedpass)
    return res
}