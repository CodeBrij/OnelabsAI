import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Interview.css";

const Interview = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [resume, setResume] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);
  const [interviewCompleted, setInterviewCompleted] = useState(false);
  const [score, setScore] = useState(null);
  const [summary, setSummary] = useState("");

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  useEffect(() => {
    if (questions.length === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          nextQuestion();
          return 120;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [questions, currentQuestion]);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setResumeFile(file);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:8000/upload-resume", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResume(response.data.summary);
    } catch (error) {
      console.error("Error uploading resume:", error);
      alert("Failed to process resume.");
    }
  };

  const generateQuestions = async () => {
    if (!jobDescription.trim() || !resume.trim()) {
      alert("Please enter both Job Description and Resume.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/generate-questions", {
        jobDescription,
        resume,
      });
      setQuestions(response.data.questions || []);
    } catch (error) {
      console.error("Error generating questions:", error);
      alert("Failed to generate questions. Please check your API.");
    }
  };

  const startRecording = () => {
    if (!recognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    setIsRecording(true);
    recognition.start();

    recognition.onresult = (event) => {
      setAnswer(event.results[0][0].transcript);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };
  };

  const saveAnswer = async () => {
    try {
      await axios.post("http://localhost:8000/save-answer", {
        question: questions[currentQuestion],
        answer,
      });
    } catch (error) {
      console.error("Error saving answer:", error);
      alert("Failed to save answer.");
    }
  };

  const nextQuestion = async () => {
    await saveAnswer();
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setAnswer("");
      setTimeLeft(120);
    } else {
      setInterviewCompleted(true);
      fetchAnalysis();
    }
  };

  const fetchAnalysis = async () => {
    try {
      const response = await axios.get("http://localhost:8000/analyze-interview");
      const data = response.data;

      if (data.score !== undefined && data.summary) {
        setScore(data.score);
        setSummary(data.summary);
      } else {
        alert("Failed to retrieve analysis.");
      }
    } catch (error) {
      console.error("Error fetching analysis:", error);
      alert("Error fetching analysis. Please try again.");
    }
  };

  return (
    <div className="container">
      {interviewCompleted ? (
        <div className="result-section">
          <h2>Interview Completed</h2>
          <h3>Score: {score !== null ? `${score}/100` : "Calculating..."}</h3>
          <p><strong>Summary:</strong> {summary || "Generating analysis..."}</p>
        </div>
      ) : questions.length === 0 ? (
        <div className="upload-section">
          <h2>Enter Job Description & Upload Resume</h2>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste job description here..."
          />
          <input type="file" accept=".pdf" onChange={handleFileUpload} />
          <textarea
            value={resume}
            onChange={(e) => setResume(e.target.value)}
            placeholder="Resume summary will appear here..."
            readOnly
          />
          <button onClick={generateQuestions}>Generate Questions</button>
        </div>
      ) : (
        <div className="interview-section">
          <h2>Question {currentQuestion + 1}</h2>
          <p>{questions[currentQuestion]}</p>
          <p>Time Left: {timeLeft}s</p>
          <button onClick={startRecording} className="record-button">
            {isRecording ? "Recording..." : "Start Speaking"}
          </button>
          <p>Your Answer: {answer}</p>
          <button onClick={nextQuestion} className="next-button">
            {currentQuestion < questions.length - 1 ? "Next" : "Finish"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Interview;