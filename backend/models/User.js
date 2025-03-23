import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    gender:{type:String, required:true},
    skills:{type:String, required:true},
    yearsofexperience:{type:String, required:true},
    industry:{type:String, required:true},
    resume:{type:String},
    jobIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job" // Reference to the Job collection (optional)
    }]
}, 
{timestamps:true})

const User = mongoose.model('User', userSchema)
export default User;