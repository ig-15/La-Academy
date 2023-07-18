import { compare, genSalt, hash,  } from "bcrypt";
import Account from "../models/account.js";
import chalk from "chalk";
import jwt from "jsonwebtoken"

export const createAccount = async (req,res) =>{
    try {
        const data = req.body;
        const checkUniqueEmail =await Account.findOne({email:data.email})
        if(checkUniqueEmail){
            return res.status(409).json({data:"Email is already in use"})
        }
        const salt =await genSalt(10)
        const hashedPassword =await hash(data.password,salt)
        const account = new Account({
            name:data.name,
            password:hashedPassword,
            email:data.email,
            profile:data.profile,
            languages:data.languages,
            bio:data.bio,
            dateOfBirth:data.dateOfBirth,
            accountType:data.accountType,
            location:data.location,
            gender:data.gender,
            username:data.username
        })
        await account.save()
        return res.status(201).json({message:"Account Created Successfully",account})
    } catch (error) {
        console.log(chalk.red("Creating Account Error"));
        console.error(error);
        return res.status(500).json({error:"Internal server error"})
    }
}


export const getAccounts = async (req,res) =>{
    try {
        const accounts =await Account.find()
        return res.status(200).json(accounts)
    } catch (error) {
        console.log(chalk.red("Getting All Accounts Error"));
        console.error(error);
        return res.status(500).json({error:"Internal server error"})
    }
}

export const getOneAccount =async (req,res) =>{
    try {
        const accountId = req.params.id
        if(!accountId){
            return res.status(400).json({error:"The id was not provided"})
        }
        const account =await Account.findById(accountId)
        if(!account){
            return res.status(404).json({error:"There is not account with the specified ID"})
        }
        return res.status(200).json(account)
    } catch (error) {
        console.log(chalk.red("Getting One Account Error"));
        console.error(error);
        return res.status(500).json({error:"Internal server error"})
    }
}
export const updateAccount =async (req,res) =>{
    try {
        const accountId = req.params.id
        if(!accountId){
            return res.status(400).json({error:"The id was not provided"})
        }
        const updateFields = req.body
        const account =await Account.findByIdAndUpdate(
            {_id:accountId},
            {$set:updateFields},
            {new:true}
        )
        return res.status(200).json({message:"Account updated Succesfully",account})

    } catch (error) {
        console.log(chalk.red("Updating Account Error"));
        console.error(error);
        return res.status(500).json({error:"Internal server error"})
    }
}
export const deleteAccount =async (req,res)=>{
    try {
        const accountId = req.params.id
        if(!accountId){
            return res.status(400).json({error:"The id was not provided"})
        }
        const account =await Account.findByIdAndDelete(
            {_id:accountId}
        )
        return res.status(204).json({message:"Account deleted Succesfully",account})
    } catch (error) {
        console.log(chalk.red("Deleting Account Error"));
        console.error(error);
        return res.status(500).json({error:"Internal server error"})
    }
}

