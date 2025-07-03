import React, { useState, useEffect } from "react";
import { GraduationCap, ChevronDown, Plus } from "lucide-react";
import { socket } from "../socket";

export default function TeacherDashboard() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [duration, setDuration] = useState(60);
  const [results, setResults] = useState({});
  const [pollActive, setPollActive] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState([false, false]);

  // Listen to socket events
  useEffect(() => {
    socket.on("poll-results", (data) => {
      setResults(data);
    });

    socket.on("poll-ended", () => {
      setPollActive(false);
      setResults({});
    });

    return () => {
      socket.off("poll-results");
      socket.off("poll-ended");
    };
  }, []);

  // Sync correctAnswers array length
  useEffect(() => {
    setCorrectAnswers(new Array(options.length).fill(false));
  }, [options.length]);

  // Start a poll
  const createPoll = () => {
    socket.emit("create-poll", {
      question,
      options: options.filter((o) => o.trim() !== ""),
      duration,
      correctAnswers,
    });
    setPollActive(true);
  };

  // Helpers
  const addOption = () => {
    setOptions([...options, ""]);
    setCorrectAnswers([...correctAnswers, false]);
  };

  const updateOption = (index, value) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const toggleCorrectAnswer = (index) => {
    // Only one correct answer allowed
    const updated = correctAnswers.map((_, i) => i === index);
    setCorrectAnswers(updated);
  };

  const removeOption = (index) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
      setCorrectAnswers(correctAnswers.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="min-h-screen bg-lightbg font-sans">
      <div className="max-w-4xl mx-auto p-6">
        {!pollActive ? (
          <>
            {/* Header */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                <GraduationCap size={16} />
                Intervue Poll
              </div>
              <h1 className="text-4xl font-bold text-dark mb-4">Let's Get Started</h1>
              <p className="text-mediumgray text-lg max-w-2xl">
                Create and manage polls, ask questions, and monitor student responses in real-time.
              </p>
            </div>

            {/* Question Input */}
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

            {/* Options */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-dark">Edit Options</h3>
                <h3 className="text-lg font-semibold text-dark">Is it Correct?</h3>
              </div>

              <div className="space-y-4">
                {options.map((option, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <input
                      type="text"
                      className="flex-1 bg-gray-100 border-0 rounded-lg p-3 text-dark placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder={`Option ${index + 1}`}
                      value={option}
                      onChange={(e) => updateOption(index, e.target.value)}
                    />
                    <input
                      type="radio"
                      checked={correctAnswers[index]}
                      onChange={() => toggleCorrectAnswer(index)}
                      className="w-5 h-5 text-primary"
                    />
                    {options.length > 2 && (
                      <button
                        onClick={() => removeOption(index)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}

                <button
                  onClick={addOption}
                  className="flex items-center gap-2 text-primary hover:text-accent font-medium"
                >
                  <Plus size={16} />
                  Add More Option
                </button>
              </div>
            </div>

            {/* Start Poll */}
            <div className="flex justify-end">
              <button
                onClick={createPoll}
                disabled={!question.trim() || options.filter((o) => o.trim()).length < 2}
                className={`px-8 py-3 rounded-full font-semibold text-white transition-all duration-200 ${
                  !question.trim() || options.filter((o) => o.trim()).length < 2
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-primary hover:bg-accent shadow-lg hover:shadow-xl"
                }`}
              >
                Ask Question
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Live Results */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                <GraduationCap size={16} />
                Intervue Poll
              </div>
              <h1 className="text-4xl font-bold text-dark mb-4">Live Results</h1>
              <p className="text-mediumgray text-lg">
                Monitoring responses in real-time
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-dark mb-6">{question}</h3>
              {Object.entries(results).length === 0 ? (
                <p className="text-center text-mediumgray">Waiting for responses...</p>
              ) : (
                <div className="space-y-2">
                  {Object.entries(results).map(([student, answer]) => (
                    <div
                      key={student}
                      className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                    >
                      <span className="text-dark font-medium">{student}</span>
                      <span className="text-primary font-medium">{answer}</span>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <p className="text-blue-800 text-sm">
                  The poll will end when all students respond or the timer expires.
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
