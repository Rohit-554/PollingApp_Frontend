import React from "react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-lightbg">
      <div className="bg-white p-10 rounded-lg shadow-lg max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-dark mb-2">
          Live Polling System
        </h1>
        <p className="text-mediumgray mb-6">
          Select your role to get started
        </p>
        <div className="flex flex-col gap-4">
          <button
            onClick={() => navigate("/student")}
            className="w-full py-3 rounded bg-primary text-white font-medium hover:bg-accent transition"
          >
            I’m a Student
          </button>
          <button
            onClick={() => navigate("/teacher")}
            className="w-full py-3 rounded border border-mediumgray text-dark hover:bg-lightbg transition"
          >
            I’m a Teacher
          </button>
        </div>
      </div>
    </div>
  );
}
