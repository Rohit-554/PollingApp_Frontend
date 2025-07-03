import React from "react";
import { GraduationCap, Clock } from "lucide-react";

interface Question {
  question: string;
  options: string[];
  duration?: number;
}

interface QuestionInterfaceProps {
  question: Question;
  selected: string;
  setSelected: (option: string) => void;
  onSubmit: () => void;
  timeLeft?: number;
}

export default function QuestionInterface({
  question,
  selected,
  setSelected,
  onSubmit,
  timeLeft = 15,
}: QuestionInterfaceProps) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 font-inter">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
            <GraduationCap size={16} />
            Intervue Poll
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
          {/* Question Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="text-lg font-semibold text-gray-900">
                Question 1
              </span>
              <div className="flex items-center gap-1 text-red-500">
                <Clock size={16} />
                <span className="text-sm font-medium">
                  {timeLeft < 10 ? `00:0${timeLeft}` : `00:${timeLeft}`}
                </span>
              </div>
            </div>
          </div>

          {/* Question Text */}
          <div className="bg-gray-800 text-white p-4 rounded-lg mb-6">
            <p className="text-lg font-medium">{question.question}</p>
          </div>

          {/* Options */}
          <div className="space-y-3 mb-8">
            {question.options.map((option, index) => (
              <label
                key={index}
                className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  selected === option
                    ? "border-purple-600 bg-purple-50"
                    : "border-gray-200 hover:border-gray-300 bg-gray-50"
                }`}
              >
                {/* Hidden radio input */}
                <input
                  type="radio"
                  name="options"
                  value={option}
                  checked={selected === option}
                  onChange={() => setSelected(option)}
                  className="hidden"
                />

                {/* Custom styled circle */}
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selected === option
                      ? "border-purple-600 bg-purple-600"
                      : "border-gray-300"
                  }`}
                >
                  {selected === option && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </div>

                <span className="text-gray-900 font-medium">{option}</span>
              </label>
            ))}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              onClick={onSubmit}
              disabled={!selected}
              className={`px-8 py-3 rounded-full font-semibold transition-all duration-200 ${
                selected
                  ? "bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-xl"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
