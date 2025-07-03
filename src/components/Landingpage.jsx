import React from "react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Live Polling System</h1>
      <p className="mb-6 text-gray-600">Please select your role:</p>
      <div className="flex gap-4">
        <button
          onClick={() => navigate("/student")}
          className="px-6 py-3 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          I’m a Student
        </button>
        <button
          onClick={() => navigate("/teacher")}
          className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          I’m a Teacher
        </button>
      </div>
    </div>
  );
}
