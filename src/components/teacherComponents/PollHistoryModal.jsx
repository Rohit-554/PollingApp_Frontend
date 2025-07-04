import React from "react";
import { X, GraduationCap } from "lucide-react";

export const PollHistoryModal = ({ onClose, history }) => {
  if (!history || history.length === 0) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[80vh] overflow-y-auto p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Poll History</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* List */}
        <div className="space-y-6">
          {history.map((poll) => {
            const totalResponses = poll.totalResponses || 0;

            return (
              <div
                key={poll.id}
                className="border rounded-lg p-4 bg-gray-50 shadow-sm"
              >
                {/* Question */}
                <div className="flex items-center gap-2 mb-2">
                  <GraduationCap className="text-purple-600" size={16} />
                  <h3 className="text-lg font-semibold text-gray-800">
                    {poll.question}
                  </h3>
                </div>
                <p className="text-sm text-gray-500 mb-4">
                  Conducted on {new Date(poll.timestamp).toLocaleString()} with {totalResponses} response{totalResponses !== 1 ? "s" : ""}
                </p>

                {/* Options */}
                <div className="space-y-2">
                  {poll.options.map((option, idx) => {
                    const count = Object.values(poll.results).filter(a => a === option).length;
                    const percentage = totalResponses > 0 ? Math.round((count / totalResponses) * 100) : 0;
                    const isCorrect = poll.correctAnswers[idx];

                    return (
                      <div
                        key={idx}
                        className={`flex items-center justify-between p-2 rounded-md ${
                          isCorrect ? "bg-green-50 border border-green-300" : "bg-white border border-gray-200"
                        }`}
                      >
                        <span className="text-gray-800">{option}</span>
                        <span className="text-gray-700 font-medium">
                          {count} votes ({percentage}%)
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
