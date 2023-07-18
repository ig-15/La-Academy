import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    creatorId:{
        type:String,
        required:true
    },
    studentsId:{
        type:[String]
    },
    topic:{
        type:String,
        required:true
    },
    tags:{
        type:[String]
    },
    description:{
        type:String,
        required:true
    },
    code:{
        type:String,
        required:true
    }
})

const Class = mongoose.model("Class",schema)


export default Class