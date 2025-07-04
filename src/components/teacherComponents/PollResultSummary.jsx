import React, { useState } from "react";
import { GraduationCap, X, Users } from "lucide-react";

// Helper function to convert results object to participants array
const formatParticipants = (results) => {
  return Object.entries(results).map(([participantId, answer]) => ({
    id: participantId,
    name: participantId, // You might want to map this to actual names if available
    answer: answer
  }));
};

import { socket } from "../../socket"; // Adjust the path as needed

const ParticipantsDialog = ({ isOpen, onClose, participants, question, options }) => {
  if (!isOpen) return null;

const handleKickOut = (participantName) => {
    if (window.confirm(`Kicking out ${participantName} - this would remove them from the poll in a real app. Proceed?`)) {
        socket.emit("kick-student", participantName);
    }
};

return (
    <div className="absolute top-16 right-6 z-50">
        <div className="bg-white rounded-lg shadow-lg w-80 max-h-96 overflow-hidden border">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold text-gray-900">
                    Poll Participants
                </h2>
                <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <X size={20} />
                </button>
            </div>

            

            {/* Participants List */}
            <div className="overflow-y-auto max-h-64">
                <div className="p-4">
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                        <span>Name</span>
                        <span>Action</span>
                    </div>

                    <div className="space-y-2">
                        {participants.map((participant, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between py-2"
                            >
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                        <span className="text-blue-600 text-sm font-medium">
                                            {participant.name.charAt(0)}
                                        </span>
                                    </div>
                                    <div>
                                        <div className="font-medium text-gray-900">
                                            {participant.name}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            Answer: {participant.answer}
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleKickOut(participant.name)}
                                    className="text-blue-600 text-sm hover:text-blue-800 transition-colors"
                                >
                                    Kick out
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
);
};


export const PollResultsSummary = ({ question, options, results, correctAnswers, onNewQuestion, onViewHistory, participants = null }) => {
  const [showParticipantsDialog, setShowParticipantsDialog] = useState(false);
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);
  const participantsData = participants || formatParticipants(results);
  const getOptionCount = (option) => {
    return Object.values(results).filter(answer => answer === option).length;
  };

  const getTotalResponses = () => {
    return Object.values(results).length;
  };

  const getPercentage = (count, total) => {
    return total > 0 ? Math.round((count / total) * 100) : 0;
  };

  const totalResponses = getTotalResponses();

  return (
    <div className="min-h-screen bg-lightbg font-sans">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header with View Poll History button */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <div className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              <GraduationCap size={16} />
              Intervue Poll
            </div>
            <h1 className="text-3xl font-bold text-dark mb-4">Poll Results</h1>
            <p className="text-mediumgray text-lg">
              Poll completed with {totalResponses} response{totalResponses !== 1 ? 's' : ''}
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowParticipantsDialog(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Users size={16} />
              Participants
            </button>
            <button
              onClick={onViewHistory}
              className="bg-primary text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-accent transition-colors"
            >
              View Poll History
            </button>
          </div>
        </div>

        {/* Results Card */}
        <div className="bg-white rounded-xl p-8 shadow-sm mb-6">
          {/* Question */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-dark mb-2">Question</h3>
            <div className="bg-gray-800 text-white p-4 rounded-lg">
              <p className="text-lg">{question}</p>
            </div>
          </div>

          {/* Options with Results */}
          <div className="space-y-4">
            {options.filter(option => option.trim()).map((option, index) => {
              const count = getOptionCount(option);
              const percentage = getPercentage(count, totalResponses);
              const isCorrect = showCorrectAnswers && correctAnswers[index];
              const hasHighestVotes = count > 0 && count === Math.max(...options.filter(o => o.trim()).map(o => getOptionCount(o)));

              return (
                <div
                  key={index}
                  className={`relative p-4 rounded-lg border-2 overflow-hidden ${
                    isCorrect
                      ? "border-green-500 bg-green-50"
                      : hasHighestVotes
                      ? "border-primary bg-primary/5"
                      : "border-gray-200 bg-gray-50"
                  }`}
                >
                  {/* Progress Bar Background */}
                  <div
                    className={`absolute inset-0 transition-all duration-500 ${
                      isCorrect
                        ? "bg-green-100"
                        : hasHighestVotes
                        ? "bg-primary/10"
                        : "bg-gray-100"
                    }`}
                    style={{ width: `${percentage}%` }}
                  />

                  {/* Content */}
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            isCorrect
                              ? "border-green-500 bg-green-500"
                              : hasHighestVotes
                              ? "border-primary bg-primary"
                              : "border-gray-300"
                          }`}
                        >
                          {(isCorrect || hasHighestVotes) && (
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          )}
                        </div>
                        {isCorrect && (
                          <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full font-medium">
                            Correct
                          </span>
                        )}
                      </div>
                      <span className="text-dark font-medium">{option}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-mediumgray">
                        ({count} votes)
                      </span>
                      <span className="text-dark font-bold text-lg">
                        {percentage}%
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Show Results Button */}
          {!showCorrectAnswers && (
            <div className="mt-6 text-center">
              <button
                onClick={() => setShowCorrectAnswers(true)}
                className="bg-green-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-green-700 transition-colors"
              >
                Show Results
              </button>
            </div>
          )}

          {/* Summary Stats */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <div className="flex justify-between items-center text-sm">
              <span className="text-blue-800">
                📊 Total Responses: {totalResponses}
              </span>
              {showCorrectAnswers && (
                <span className="text-blue-800">
                  ✅ Correct Answers: {Object.values(results).filter((answer, i) => 
                    correctAnswers[options.findIndex(opt => opt === answer)]
                  ).length}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Ask New Question Button */}
        <div className="text-center">
          <button
            onClick={onNewQuestion}
            className="bg-primary text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent shadow-lg hover:shadow-xl transition-all duration-200"
          >
            ➕ Ask a new question
          </button>
        </div>
      </div>

      {/* Participants Dialog */}
      <ParticipantsDialog
        isOpen={showParticipantsDialog}
        onClose={() => setShowParticipantsDialog(false)}
        participants={participantsData}
        question={question}
        options={options}
      />
    </div>
  );
};