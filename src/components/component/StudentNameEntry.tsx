import React from "react";
import { GraduationCap } from "lucide-react";

interface StudentNameEntryProps {
  name: string;
  setName: (name: string) => void;
  onContinue: () => void;
}

export default function StudentNameEntry({
  name,
  setName,
  onContinue,
}: StudentNameEntryProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-inter">
      <div className="max-w-2xl w-full text-center">
        {/* Header Badge */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium">
            <GraduationCap size={16} />
            Intervue Poll
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Let's Get Started
        </h1>

        {/* Subtitle */}
        <p className="text-gray-500 text-lg mb-12 max-w-2xl mx-auto">
          If you're a student, you'll be able to{" "}
          <span className="font-semibold text-gray-900">
            submit your answers
          </span>
          , participate in live polls, and see how your responses compare with
          your classmates
        </p>

        {/* Name Input Section */}
        <div className="mb-12">
          <label className="block text-left text-lg font-semibold text-gray-900 mb-4">
            Enter your Name
          </label>
          <input
            type="text"
            className="w-full bg-gray-100 border-0 rounded-lg p-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg"
            placeholder="Rahul Bajaj"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Continue Button */}
        <button
          onClick={onContinue}
          disabled={!name.trim()}
          className={`px-12 py-4 rounded-full text-white font-semibold text-lg transition-all duration-200 ${
            name.trim()
              ? "bg-purple-600 hover:bg-purple-700 shadow-lg hover:shadow-xl"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
