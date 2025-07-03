import React, { useState, useEffect } from "react";
import { socket } from "../socket";

export default function TeacherDashboard() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [duration, setDuration] = useState(60);
  const [results, setResults] = useState({});
  const [pollActive, setPollActive] = useState(false);

  useEffect(() => {
    socket.on("poll-results", (data) => {
      setResults(data);
    });

    socket.on("poll-ended", () => {
      setPollActive(false);
    });

    return () => {
      socket.off("poll-results");
      socket.off("poll-ended");
    };
  }, []);

  const createPoll = () => {
    socket.emit("create-poll", {
      question,
      options: options.filter((o) => o.trim() !== ""),
      duration,
    });
    setPollActive(true);
  };

  return (
    <div className="min-h-screen bg-lightbg flex flex-col items-center p-6">
      <div className="max-w-xl w-full bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-dark mb-4">Teacher Dashboard</h2>

        {!pollActive ? (
          <>
            <input
              className="w-full border p-2 rounded mb-3"
              placeholder="Enter your question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />

            {options.map((opt, idx) => (
              <input
                key={idx}
                className="w-full border p-2 rounded mb-2"
                placeholder={`Option ${idx + 1}`}
                value={opt}
                onChange={(e) => {
                  const updated = [...options];
                  updated[idx] = e.target.value;
                  setOptions(updated);
                }}
              />
            ))}

            <button
              className="text-primary mb-3"
              onClick={() => setOptions([...options, ""])}
            >
              + Add Option
            </button>

            <div className="flex items-center gap-2 mb-4">
              <label className="text-mediumgray">Duration:</label>
              <input
                type="number"
                min={10}
                className="border p-2 rounded w-24"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
              />
              <span className="text-mediumgray">seconds</span>
            </div>

            <button
              onClick={createPoll}
              className="w-full py-3 bg-primary text-white font-medium rounded hover:bg-accent transition"
            >
              Start Poll
            </button>
          </>
        ) : (
          <>
            <h3 className="text-xl font-semibold text-dark mb-3">
              Live Results
            </h3>
            {Object.entries(results).length === 0 ? (
              <p className="text-mediumgray">Waiting for responses...</p>
            ) : (
              <div className="space-y-2">
                {Object.entries(results).map(([student, answer]) => (
                  <div
                    key={student}
                    className="border p-2 rounded flex justify-between"
                  >
                    <span className="text-dark">{student}</span>
                    <span className="text-primary">{answer}</span>
                  </div>
                ))}
              </div>
            )}
            <p className="mt-4 text-mediumgray">
              Waiting for all students or timer to end.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
