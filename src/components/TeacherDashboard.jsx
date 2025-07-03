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
      options,
      duration,
    });
    setPollActive(true);
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Teacher Dashboard</h2>
      {!pollActive ? (
        <div className="space-y-4">
          <input
            className="border p-2 w-full"
            placeholder="Enter question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          {options.map((opt, idx) => (
            <input
              key={idx}
              className="border p-2 w-full"
              placeholder={`Option ${idx + 1}`}
              value={opt}
              onChange={(e) => {
                const newOpts = [...options];
                newOpts[idx] = e.target.value;
                setOptions(newOpts);
              }}
            />
          ))}
          <button
            onClick={() => setOptions([...options, ""])}
            className="text-blue-600"
          >
            + Add Option
          </button>
          <input
            type="number"
            className="border p-2 w-24"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
          />
          <button
            onClick={createPoll}
            className="px-4 py-2 bg-purple-600 text-white rounded"
          >
            Start Poll
          </button>
        </div>
      ) : (
        <div>
          <h3 className="font-semibold mb-2">Results</h3>
          {Object.entries(results).map(([studentId, answer]) => (
            <div key={studentId} className="p-2 border-b">
              {studentId}: {answer}
            </div>
          ))}
          <p className="mt-4">Waiting for all students or timer to end...</p>
        </div>
      )}
    </div>
  );
}