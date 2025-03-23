import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    name: {type: String, required: true},
    title: {type: String, required:true},
    description: {type: String, required:true},
    skills: {type: String, required:true},
    salary: {type: String, required:true},
    location: {type: String, required:true},
    tags: [String],
},
{timestamps: true})

const Job = mongoose.model('Job', jobSchema);
export default Job;