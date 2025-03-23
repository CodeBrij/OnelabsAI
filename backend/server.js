import mongoose from "mongoose";
import express from "express";
import User from "./models/User.js";
import Job from "./models/Job.js";
import './db/config.js';
import cors from "cors";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT;
const jwtKey = process.env.JWT_SECRET;

app.get("/", async(req,res) => {
    res.send("Hello")
})

app.post('/register', async(req,res) => {
  try {
    const { name, email, password, gender, skills, yearsofexperience, industry } = req.body;
    let user = new User({
      name, // Assign fullName to name
      email,
      password,
      gender,
      skills,
      yearsofexperience,
      industry,
    });
    console.log("Received data:", { name, email, password, gender, skills, yearsofexperience, industry });
    let result = await user.save();
    result = result.toObject();

    delete result.password;
    jwt.sign({ userId: user._id }, jwtKey, { expiresIn: '7d' }, (err, token) => {
      if (err) {
        return res.status(400).json({ error: `Something went wrong: ${err}` });
      }
      res.send({ user, auth: token });
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});


  app.post('/login', async(req,res) => {
    const {email,password} = req.body;
    try {
      if(email && password){
        let user = await User.findOne({email: email, password: password}).select('-password');
        if(user){
          jwt.sign({userId: user._id}, jwtKey, {expiresIn: '7d'}, (err,token) => {
            if(err) {
              return res.status(400).json({error: `Something went wrong: ${err}`})
            }
            res.send({user, auth:token});
          })
        }
      }
    } catch (error) {
      return res.status(500).json({error: `Internal Server Error: ${error}`})
    }
  })

app.get("/joblisting", async (req,res) => {
    console.log("Fetching Jobs....");
    const jobs = await Job.find();
    console.log("Jobs fetched:", jobs);
    res.send(jobs);
})

app.post("/jobs", async(req,res) => {
    try {
        const {name, title, description, skills, salary, location, tags} = req.body;

        if(!name, !title, !description, !skills, !salary, !location){
            return res.status(400).json({ error: "All fields are required!!" });
        }

        const newJob = new Job({
            name, title, description, skills, salary, location, tags,
        })
        const savedJob = await newJob.save();
        res.status(201).json(savedJob);
    } catch (error) {
        console.error("Error saving Job:", error);
        res.status(500).json({ message: "Failed to save Job", error });
    }
});

app.put("/applyjob", async (req, res) => {
    try {
        const { userId, jobId } = req.body; // Extract userId and jobId from request body

        if (!userId || !jobId) {
            return res.status(400).json({ error: "User ID and Job ID are required" });
        }

        // Find the user by ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Check if the jobId already exists in the user's jobIds array to prevent duplicates
        if (!user.jobIds.includes(jobId)) {
            user.jobIds.push(jobId); // Append new job ID
            await user.save(); // Save the updated user
        }

        res.status(200).json({ message: "Job applied successfully", user });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
});


app.get("/applicants/:id", async (req, res) => {
    try {
        const reqId = req.params.id; // Extract job ID from request params
        const applicants = await User.find(); // Fetch all applicants
        
        if (!applicants) {
            return res.status(400).json({ error: "Error fetching applicants" });
        }

        // Filter applicants where jobId matches reqId
        const filteredApplicants = applicants.filter(applicant => applicant.jobId == reqId);

        res.status(200).json(filteredApplicants);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
});



app.post("/save-response", async (req, res) => {
  try {
    const { question, answer } = req.body;
    const newResponse = new Response({ question, answer });
    await newResponse.save();
    res.status(201).json({ message: "Response saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error saving response", error });
  }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
