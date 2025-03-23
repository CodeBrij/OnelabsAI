import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const JobListingsPage = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadedResume, setUploadedResume] = useState(null);
  const [jobs,setJobs] = useState([]);
  const [resume, setResume] = useState()

  useEffect(() => {
      getJobs();
    }, []);

  const getJobs = async () => {
    try {
      const response = await fetch("http://localhost:5001/joblisting");
      if(!response.ok){
        toast.error("Failed to fetch Jobs");
      }
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error("Error fetching the jobs: "+ error);
    }
  }

  const handleInterview = async () => {
    try {
      let jobId = selectedJob._id;
      let name = localStorage.getItem("user.name");
      let userId = localStorage.getItem("user._id");
      let email = localStorage.getItem("user.email");

      if (!uploadedResume) {
        console.error("No file selected");
        return;
      }
    
      const formData = new FormData();
      formData.append("file", uploadedResume);
    
      try {
        const response = await fetch("https://api.cloudinary.com/v1_1/drdniiyif/upload", {
          method: "POST",
          body: formData,
        });
    
        const data = await response.json();
        setUploadedResume(data.secure_url); // Assuming you have a state variable for storing the URL
      } catch (error) {
        console.error("Upload failed:", error);
      }

      console.log("Cloudinary upload response: ", uploadResponse);
    } catch (error) {
      
    }
  }

  const uploadToCloudinary = async () => {
    
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-100 p-4 overflow-auto">
        <h2 className="text-xl font-bold mb-4">Job Listings</h2>
        {jobs.map((job) => (
          <div
            key={job._id}
            className={`p-3 rounded cursor-pointer ${selectedJob?._id === job._id ? "bg-amber-200" : ""}`}
            onClick={() => setSelectedJob(job)}
          >
            <h3 className="font-bold">{job.name}</h3>
            <p>{job.title}</p>
            <p className="text-sm text-gray-500">{job.location}</p>
          </div>
        ))}
      </div>

      {/* Job Details */}
      <div className="flex-1 p-6 bg-white shadow-lg">
        {selectedJob ? (
          <>
            <h1 className="text-2xl font-bold">{selectedJob.title}</h1>
            <h2 className="text-lg text-gray-600">{selectedJob.name}</h2>
            <p className="mt-2 text-gray-500">Location: {selectedJob.location}</p>
            <p className="mt-2">{selectedJob.description}</p>
            <p className="mt-2"><strong>Required Skills:</strong> {selectedJob.skills}</p>
            <p className="mt-2"><strong>Salary:</strong> {selectedJob.salary}</p>
            <button
              className="mt-4 btn btn-primary"
              onClick={() => setIsModalOpen(true)}
            >
              Apply
            </button>
          </>
        ) : (
          <p className="text-center text-gray-500">Select a job from the list</p>
        )}
      </div>

      {/* Apply Modal */}
      {isModalOpen && selectedJob && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold">Apply for {selectedJob.title}?</h3>
            <input
              type="file"
              className="mt-4 p-2 border"
              onChange={(e) => setUploadedResume(e.target.files[0])}
            />
            <div className="mt-4 flex justify-between">
              <button
                className="btn btn-secondary"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              {uploadedResume && (
                <button className="btn btn-primary" onClick={handleInterview}>Start Interview</button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobListingsPage;