import React from "react";
import { ChevronDown } from "lucide-react";

export const QuestionInput = ({ question, setQuestion, duration, setDuration }) => (
  <div className="mb-8">
    <div className="flex items-center justify-between mb-4">
      <label className="text-lg font-semibold text-dark">
        Enter your question
      </label>
      <div className="relative">
        <select
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value={30}>30 seconds</option>
          <option value={60}>60 seconds</option>
          <option value={90}>90 seconds</option>
          <option value={120}>120 seconds</option>
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
      </div>
    </div>
    <textarea
      className="w-full bg-gray-100 border-0 rounded-lg p-4 text-dark placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
      placeholder="Enter your question here..."
      value={question}
      onChange={(e) => setQuestion(e.target.value)}
      rows={3}
    />
  </div>
);