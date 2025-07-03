import React, { useState, useEffect } from "react";
import { socket } from "../socket";

export default function StudentDashboard() {
  const [name, setName] = useState(
    sessionStorage.getItem("studentName") || ""
  );
  const [question, setQuestion] = useState(null);
  const [selected, setSelected] = useState("");
  const [results, setResults] = useState({});
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    if (name) {
      socket.emit("student-join", name);
    }

    socket.on("new-poll", (poll) => {
      setQuestion(poll);
      setAnswered(false);
      setResults({});
    });

    socket.on("poll-results", (data) => {
      setResults(data);
    });

    socket.on("poll-ended", () => {
      setAnswered(true);
    });

    return () => {
      socket.off("new-poll");
      socket.off("poll-results");
      socket.off("poll-ended");
    };
  }, [name]);

  const submit = () => {
    socket.emit("submit-answer", selected);
    setAnswered(true);
  };

  if (!name) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <input
          className="border p-2 mb-4"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-purple-600 text-white rounded"
          onClick={() => {
            sessionStorage.setItem("studentName", name);
            socket.emit("student-join", name);
          }}
        >
          Join
        </button>
      </div>
    );
  }

  return (
    <div className="p-8">
      {question ? (
        <>
          <h2 className="text-xl font-bold mb-4">{question.question}</h2>
          {!answered ? (
            <div className="space-y-2">
              {question.options.map((opt, idx) => (
                <div key={idx}>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="option"
                      value={opt}
                      checked={selected === opt}
                      onChange={() => setSelected(opt)}
                    />
                    {opt}
                  </label>
                </div>
              ))}
              <button
                onClick={submit}
                className="px-4 py-2 bg-blue-600 text-white rounded mt-4"
              >
                Submit
              </button>
            </div>
          ) : (
            <div>
              <h3 className="font-semibold mb-2">Results</h3>
              {Object.entries(results).map(([studentId, answer]) => (
                <div key={studentId}>
                  {studentId}: {answer}
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <p>Waiting for the teacher to start a poll...</p>
      )}
    </div>
  );
}