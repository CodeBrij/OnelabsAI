import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  MessageSquare,
  User,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    skills: "",
    yearsofexperience: "",
    industry: "",
  });

  const navigate = useNavigate();

  // const validateForm = () => {
  //   if (!formData.name.trim()) return toast.error("Full Name is required");
  //   if (!formData.email.trim()) return toast.error("Email is required");
  //   if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
  //   if (!formData.password) return toast.error("Password is required");
  //   if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");
  //   if (!formData.gender) return toast.error("Please select a gender");
  //   return true;
  // };

  const signup = async () => {
    console.log("Handling signup...");

    console.log(formData);
    

    try {
      const response = await fetch("http://localhost:5001/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Add this header
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log(result);

      if (result.auth) {
        localStorage.setItem("user", JSON.stringify(result.user));
        localStorage.setItem("token", JSON.stringify(result.auth));
        toast.success("Account created successfully!");
        navigate("/joblistings");
      } else {
        toast.error(result.message || "Signup failed");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (validateForm() === true) {
    await signup();
    // }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* LOGO */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/60">Get started with your free account</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Full Name</span></label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-base-content/40" />
                <input
                  type="text"
                  className="input input-bordered w-full pl-10"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Gender</span></label>
              <select
                className="select select-bordered w-full"
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              >
                <option value="" disabled>Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Email</span></label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-base-content/40" />
                <input
                  type="email"
                  className="input input-bordered w-full pl-10"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Password</span></label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-base-content/40" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full pl-10"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff className="size-5 text-base-content/40" /> : <Eye className="size-5 text-base-content/40" />}
                </button>
              </div>
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Skills</span></label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-base-content/40" />
                <input
                  type="text"
                  className="input input-bordered w-full pl-10"
                  placeholder="Python, Java, C++"
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Years of Experience</span></label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-base-content/40" />
                <input
                  type="text"
                  className="input input-bordered w-full pl-10"
                  placeholder="2"
                  value={formData.yearsofexperience}
                  onChange={(e) => setFormData({ ...formData, yearsofexperience: e.target.value })}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Industry</span></label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-base-content/40" />
                <input
                  type="text"
                  className="input input-bordered w-full pl-10"
                  placeholder="Software, Architecture, etc."
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                />
              </div>
            </div>

            
            <button type="submit" className="btn btn-primary w-full">Create Account</button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Already have an account? <Link to="/login" className="link link-primary">Sign in</Link>
            </p>
          </div>
        </div>
      </div>

      <AuthImagePattern title="Join the revolution" subtitle="Revolutionize the Interview Sphere. Join! Analyse! Improve!" />
    </div>
  );
};

export default SignUpPage;
