import React from "react";
import { GraduationCap, Clock } from "lucide-react";

interface Question {
  question: string;
  options: string[];
}

interface ResultsViewProps {
  question: Question;
  results: Record<string, number>;
  totalResponses: number;
}

export default function ResultsView({
  question,
  results,
  totalResponses,
}: ResultsViewProps) {
  const getPercentage = (count: number) => {
    if (!count || count < 0 || !totalResponses || totalResponses <= 0) {
      return 0;
    }

    const percentage = (count / totalResponses) * 100;

    if (isNaN(percentage) || !isFinite(percentage)) {
      return 0;
    }

    return Math.round(percentage);
  };

  const getMaxCount = () => {
    const counts = Object.values(results).filter(
      (count) => typeof count === "number" && !isNaN(count) && count >= 0
    );
    return counts.length > 0 ? Math.max(...counts) : 0;
  };

  const getOptionCount = (option: string) => {
    const count = results[option];
    return typeof count === "number" && !isNaN(count) && count >= 0 ? count : 0;
  };

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

        {/* Results Card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
          {/* Question Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="text-lg font-semibold text-gray-900">
                Question 1
              </span>
              <div className="flex items-center gap-1 text-red-500">
                <Clock size={16} />
                <span className="text-sm font-medium">00:15</span>
              </div>
            </div>
          </div>

          {/* Question Text */}
          <div className="bg-gray-800 text-white p-4 rounded-lg mb-6">
            <p className="text-lg font-medium">
              {question?.question || "No question available"}
            </p>
          </div>

          {/* Total Responses Info */}
          {/* <div className="mb-4 text-center">
            <span className="text-sm text-gray-600">
              Total Responses: {totalResponses || 0}
            </span>
          </div> */}

          {/* Results */}
          <div className="space-y-3 mb-8">
            {question?.options?.map((option, index) => {
              const count = getOptionCount(option);
              const percentage = getPercentage(count);
              const maxCount = getMaxCount();
              const isHighest = count === maxCount && count > 0 && maxCount > 0;

              return (
                <div
                  key={index}
                  className={`relative p-4 rounded-lg border-2 ${
                    isHighest
                      ? "border-purple-600 bg-purple-50"
                      : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          isHighest
                            ? "border-purple-600 bg-purple-600"
                            : "border-gray-300"
                        }`}
                      >
                        {isHighest && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>
                      <span className="text-gray-900 font-medium">
                        {option}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">
                        ({count} votes)
                      </span>
                      <span className="text-gray-900 font-semibold">
                        {percentage}%
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  {percentage > 0 && (
                    <div className="absolute inset-0 rounded-lg overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${
                          isHighest ? "bg-purple-200" : "bg-gray-200"
                        }`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      />
                    </div>
                  )}
                </div>
              );
            }) || (
              <div className="text-center py-8">
                <p className="text-gray-500">No options available</p>
              </div>
            )}
          </div>

          {/* Wait Message */}
          <div className="text-center">
            <p className="text-gray-600 font-medium">
              Wait for the teacher to ask a new question..
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
