import Joi from "joi";
import mongoose from "mongoose";

const schema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        maxlength: 100, 
    },
    name:{
        firstName:{
            type:String, 
            required: true,
            maxlength: 100, 
            minlength: 3
        },
        lastName:{
            type:String, 
            required: true,
            maxlength: 100, 
            minlength: 3
        }
    },
    emailVerified:{
        type:Boolean,
        default:false
    },
    dateOfBirth:{
        type:Date,
        required: true
    },
    accountType:{
        type:String,
        required: true
    },
    location:{
        country:{
            type:String, 
            required: true
        },
        city:{
            type:String, 
            required: true
        }
    },
    gender:{
        type:String,
        default:"Prefer Not To Say"
    },
    password:{
        type:String, 
        required: true,
        maxlength: 100, 
        minlength: 3
    },
    creationDate:{
        type:Date,
        default:Date.now(), 
        required: true
    },
    bio:{
        type:String, 
        required: true,
        maxlength: 500, 
        minlength: 10
    },
    profile:{
        type:String, 
        required: true
    },
    languages:{
        type:[String], 
        required: true
    },
    username: { 
        type: String, 
        required: true, 
        unique: true ,
        maxlength: 50, 
        minlength: 3
    },

})

const Account = mongoose.model('User',schema)

export default Account;