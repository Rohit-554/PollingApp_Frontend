import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap } from "lucide-react";

export default function LandingPage() {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const handleContinue = () => {
    if (selected) {
      navigate(`/${selected}`);
    }
  };

  return (
    <div className="min-h-screen bg-lightbg flex items-center justify-center p-4 font-sans">
      <div className="max-w-2xl w-full text-center">
        {/* Badge */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full text-sm font-medium">
            <GraduationCap size={16} />
            Intervue Poll
          </div>
        </div>

        {/*this is for the title phrase*/}
        <h1 className="text-4xl font-bold text-dark mb-4">
          Welcome to the <span className="text-dark">Live Polling System</span>
        </h1>

        {/* this is for the Subtitle */}
        <p className="text-mediumgray text-lg mb-12 max-w-md mx-auto">
          Please select the role that best describes you to begin using the live polling system.
        </p>

        {/* Role Selection dialogs */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Student Card */}
          <button
            onClick={() => setSelected("student")}
            className={`p-8 rounded-xl border-2 text-left transition-all duration-200 hover:shadow-sm bg-white ${
              selected === "student"
                ? "border-primary bg-purple-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <h3 className="text-xl font-semibold text-dark mb-3">I’m a Student</h3>
            <p className="text-mediumgray leading-relaxed">
              Submit answers and view live poll results in real-time.
            </p>
          </button>

          {/* Teacher Card */}
          <button
            onClick={() => setSelected("teacher")}
            className={`p-8 rounded-xl border-2 text-left transition-all duration-200 hover:shadow-sm bg-white ${
              selected === "teacher"
                ? "border-primary bg-purple-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <h3 className="text-xl font-semibold text-dark mb-3">I’m a Teacher</h3>
            <p className="text-mediumgray leading-relaxed">
              Create polls and track responses in real-time.
            </p>
          </button>
        </div>

        {/* Continue Button to go ahead */}
        <button
          onClick={handleContinue}
          disabled={!selected}
          className={`px-12 py-4 rounded-full text-white font-semibold text-lg transition-all duration-200 ${
            selected
              ? "bg-primary hover:bg-accent shadow-lg hover:shadow-xl"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
