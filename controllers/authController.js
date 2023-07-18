import { compare } from "bcrypt"
import Account from "../models/account.js"
import jwt from "jsonwebtoken"
import chalk from "chalk"
const generateToken = (user) =>{ 
    return jwt.sign({
        id:user._id,
    },process.env.JWT_SECRET,)
}

export const login = async(req,res)=>{
    try {
        const data = req.body
        const user = await Account.findOne({email:req.body.email})
        if(!user){
            return res.status(404).json({message:"There is no account with the specified Email"})
        }
        const passwordCorrect = await compare(data.password,user.password)
        if(!passwordCorrect){
            return res.status(401).json({message:"Incorrect password"})
        }
        const token = generateToken(user)
        res.cookie('token',token,{httpOnly:true})
        console.log(res.cookie);
        res.status(200).json({message:"Logged in Successfully",account:user})

    } catch (error) {
        console.log(chalk.red("Login Error"))
        console.error(error);
        return res.status(500).json({error:"Internal Server Error"})
    }
}

export const logout = async (req,res) =>{
    try {
        res.clearCookie('token')
        res.status(200).json({message:"Logged Out Successfully"})
    } catch (error) {
       console.log(chalk.red("Logout Error")); 
       console.error(error);
       return res.status(500).json({error:"Internal Server Error"})
    }
}