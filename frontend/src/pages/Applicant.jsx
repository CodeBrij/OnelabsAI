import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "node_modules/pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();


const GEMINI_API_KEY = "AIzaSyBd9WUuFKUEHbLH8N6HtH-rCiv7I6fWKEk";

const ApplicantsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState([]);
  const [selectedScore, setSelectedScore] = useState("");
  const [summaries, setSummaries] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    getApplicants();
  }, [id]);

  const getApplicants = async () => {
    try {
      const response = await fetch(`http://localhost:5001/applicants/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch applicants!");
      }
      const data = await response.json();
      setCandidates(data);
    } catch (error) {
      console.error("Error fetching applicants:", error);
      setError(error.message);
      toast.error("Failed to fetch applicants!");
    }
  };

  // Extract text from PDF
  const extractTextFromPDF = async (pdfUrl) => {
    try {
      const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
      let extractedText = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        extractedText += textContent.items.map((item) => item.str).join(" ") + "\n";
      }

      return extractedText;
    } catch (error) {
      console.error("Error extracting text from PDF:", error);
      return "Error extracting text.";
    }
  };

  // Summarize resume using Gemini API
  const handleSummarize = async (resumeUrl, candidateName) => {
    try {
      setSummaries((prev) => ({ ...prev, [candidateName]: "Generating summary..." }));
      
      // Extract text from PDF
      const resumeText = await extractTextFromPDF(resumeUrl);

      // Call Gemini API
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateText?key=${GEMINI_API_KEY}`,
        {
          prompt: `Summarize this resume highlighting the skills, projects, experience, grades, location in 150 words:\n${resumeText}`,
        }
      );

      const generatedSummary = response.data?.candidates?.[0]?.output || "No summary generated.";
      setSummaries((prev) => ({ ...prev, [candidateName]: generatedSummary }));
    } catch (error) {
      console.error("Error summarizing resume:", error);
      setSummaries((prev) => ({ ...prev, [candidateName]: "Failed to summarize resume." }));
    }
  };

  return (
    <div className="p-6 min-h-screen mx-20">
      <h1 className="text-2xl font-bold text-center mb-6">Applicants for Job {id}</h1>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="space-y-4">
        {candidates.map((candidate, index) => (
          <div key={index} className="flex items-center bg-amber-50 shadow-md p-4 rounded-lg">
            <div className="flex-1">
              <h2 className="text-lg font-bold">{candidate.name}</h2>
              <p className="text-gray-500">Email: {candidate.email}</p>
              <p className="text-gray-500">Score: {candidate.score}</p>

              <div className="flex space-x-2 mt-2">
                <button className="btn btn-secondary" onClick={() => handleSummarize(candidate.resume, candidate.name)}>
                  Summarize
                </button>
                <a href={candidate.resume} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  View Resume
                </a>
              </div>

              {summaries[candidate.name] && <p className="text-gray-700 mt-2">{summaries[candidate.name]}</p>}
            </div>

            <div className="w-32 h-40 ml-4 border rounded-lg overflow-hidden">
              <iframe src={candidate.resume} className="w-full h-full" title={`Resume of ${candidate.name}`}></iframe>
            </div>
          </div>
        ))}
      </div>

      <button className="btn btn-accent mt-6" onClick={() => navigate(-1)}>Back to Jobs</button>
    </div>
  );
};

export default ApplicantsPage;
