import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const RecruiterPage = () => {
  const [jobs, setJobs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({name: "", title: "", description: "", skills: "", salary: "", location: "", tags: [] });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getJobs();
  }, []);

  const getJobs = () => {
    fetch(`http://localhost:5001/joblisting`)
      .then((res) => res.json())
      .then((data) => setJobs(data));
  }

  const handlePostJob = async () => {
    await fetch(`http://localhost:5001/jobs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((newJob) => setJobs([...jobs, newJob]));

    setShowForm(false);
  };

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-4">Welcome to Hire360</h1>
      <p className="text-center text-gray-400 mb-6">Take recruitment to the next level with AI-powered interviews.</p>
      
      {/* Post Job Button */}
      <button className="btn btn-primary bg-rose-500 w-50 block mx-auto" onClick={() => setShowForm(true)}>
        Post a Job
      </button>

      {/* Job Posting Modal */}
      {showForm && (
        <dialog open className="modal">
          <div className="modal-box border p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-3">Post a Job</h2>

            <div className="space-y-3">
            <input
                type="text"
                placeholder="Company Name"
                className="input input-bordered w-full"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <input
                type="text"
                placeholder="Job Title"
                className="input input-bordered w-full"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
              <textarea
                placeholder="Job Description"
                className="textarea textarea-bordered w-full"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
              <input
                type="text"
                placeholder="Required Skills"
                className="input input-bordered w-full"
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
              />
              <input
                type="text"
                placeholder="Salary"
                className="input input-bordered w-full"
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
              />
              <input
                type="text"
                placeholder="Location"
                className="input input-bordered w-full"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
              <input
                type="text"
                placeholder="Tags"
                className="input input-bordered w-full"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              />
            </div>

            <div className="modal-action">
              <button className="btn btn-success w-[50%]" onClick={handlePostJob}>
                Submit
              </button>
              <button className="btn btn-error w-[50%]" onClick={() => setShowForm(false)}>
                Cancel
              </button>
            </div>
          </div>
        </dialog>
      )}

      {/* Posted Jobs List */}
      <h2 className="text-2xl font-semibold mt-8 mb-4 mx-15">Posted Jobs</h2>
      <div className="space-y-4 mx-15 flex gap-5">
        {jobs.map((job) => (
          <div key={job.id} className="card p-1 shadow-md border w-[50%]">
            <div className="card-body">
              <h2 className="card-title">{job.title}</h2>
              <p className="text-gray-600">Location: {job.location} | Skills: {job.skills}</p>
              <p className="text-gray-600">Salary: {job.salary}</p>
              <button className="btn btn-info bg-rose-400" onClick={() => navigate(`/job/${job.id}`)}>
                View Applicants
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecruiterPage;
