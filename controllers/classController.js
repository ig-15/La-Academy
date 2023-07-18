import chalk from "chalk";
import Class from "../models/class.js";


export const createClass = async (req, res) => {
    try {
        const data = req.body
        const creatorId = req.user
        let code = Array.from({length:4},()=>Math.floor(Math.random()*1000).toString().padStart(4,'0')).join("-")
        const ifCodeExists = Class.findOne({code:code})
        if(ifCodeExists){
            code = Array.from({length:4},()=>Math.floor(Math.random()*1000).toString().padStart(4,'0')).join("-")
        }
        const newClass = new Class({
            name: data.name,
            description: data.description,
            creatorId: creatorId,
            topic: data.topic,
            studentsId: data.studentsId,
            description: data.description,
            tags: data.tags,
            code:code
        })
        await newClass.save()
        res.status(201).json({ message: "Class created successfully" })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" })
    }
}
export const getClasses = async (req, res) => {
    try {
        const classes = await Class.find()
        return res.status(200).json({ message: "Getting all classes successfully", data: classes })
    } catch (error) {
        console.log(chalk.red("Getting All Classes Error"));
        console.error(error);
        return res.status(500).json({ error: "Internal server error" })
    }
}
export const getOneClass = async (req, res) => {
    try {
        const classId = req.params.id
        if (!classId) {
            return res.status(400).json({ error: "The id was not provided" })
        }
        const oneClass = await Class.findById(classId)
        if (!oneClass) {
            return res.status(404).json({ error: "There is no Class with the specified ID" })
        }
        return res.status(200).json(oneClass)
    } catch (error) {
        console.log(chalk.red("Getting One Class Error"));
        console.error(error);
        return res.status(500).json({ error: "Internal server error" })
    }
}
export const updateClass = async (req, res) => {
    try {
        const classId = req.params.id
        if (!classId) {
            return res.status(400).json({ error: "The id was not provided" })
        }
        const updateFields = req.body
        const classToBeUpdated = await Class.findByIdAndUpdate(
            { _id: classId },
            { $set: updateFields },
            { new: true }
        )
        return res.status(200).json({ message: "Class updated Succesfully", classToBeUpdated })

    } catch (error) {
        console.log(chalk.red("Updating Class Error"));
        console.error(error);
        return res.status(500).json({ error: "Internal server error" })
    }
}
export const deleteClass = async (req, res) => {
    try {
        const classId = req.params.id
        if (!classId) {
            return res.status(400).json({ error: "The id was not provided" })
        }
        const classToBeDeleted = await Class.findByIdAndDelete(
            { _id: classId }
        )
        return res.status(204).json({ message: "Class deleted Succesfully" })
    } catch (error) {
        console.log(chalk.red("Deleting Class Error"));
        console.error(error);
        return res.status(500).json({ error: "Internal server error" })
    }
}

export const getAttendedClasses = async (req, res) => {
    try {
        const userId = req.user
        const attendedClasses = await Class.find({ studentsId: { $in: userId } })
        console.log(attendedClasses);
        if (attendedClasses.length == 0) {
            return res.status(200).json({ message: "You haven't attended any class" })
        }
        return res.status(200).json({ message: "Getting attended classess successfully", data: attendedClasses })
    } catch (error) {
        console.log(chalk.red("Getting Attended Classes Error"));
        console.error(error);
        return res.status(500).json({ error: "Internal server Error" })
    }
}

export const getClassesYouCreated = async (req, res) => {
    try {
        const userId = req.user
        const classesCreated = await Class.find({ creatorId: userId })
        if (classesCreated.length == 0) {
            return res.status(200).json({ message: "You haven't created any class" })
        }
        return res.status(200).json({ message: "Getting the classes you created successfully", data: classesCreated })
    } catch (error) {
        console.log(chalk.red("Getting Classes You Created Error"));
        console.error(error);
        return res.status(500).json({ error: "Internal server Error" })
    }
}

export const getRecommendedClass = async (req, res) => {
    try {
        // const recommended = await Class.find().sort()
        // console.log(recommended);
        // return res.status(200).json({message:"Getting recommende classess successfully",data:recommended})
        const recommendedClasses = await Class.find()
            .sort({ studentsId: -1 })
            .exec();

        res.json({ recommendedClasses });
    } catch (error) {
        console.log(chalk.red("Getting recommended classes Error"));
        console.error(error);
        return res.status(500).json({ error: "Internal server Error" })
    }
}

export const joinClass = async(req,res)=>{
    try {
        const requesterId = req.user
        const classCode = req.body.code
        const classRequested = await Class.findOneAndUpdate({code:classCode},{$push:{studentsId:requesterId}},{new:true})
        if(!classRequested){
            return res.status(404).json({error:"There is no class with the specified Code"})
        }
        return res.status(200).json({message:"Joined Class Successfully",data:classRequested})
    } catch (error) {
        console.log(chalk.red("Joining Class Error"));
        console.error(error);
        return res.status(500).json({error:"Internal server Error"})
    }
}