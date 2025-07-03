import React, { useState, useEffect } from "react";
import { socket } from "../socket";

export default function StudentDashboard() {
  const [name, setName] = useState(sessionStorage.getItem("studentName") || "");
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
      setSelected("");
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
      <div className="flex flex-col items-center justify-center min-h-screen bg-lightbg">
        <div className="bg-white p-6 rounded shadow-md max-w-sm w-full text-center">
          <h2 className="text-xl font-bold text-dark mb-2">Join as Student</h2>
          <input
            className="w-full border p-2 rounded mb-4"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            onClick={() => {
              sessionStorage.setItem("studentName", name);
              socket.emit("student-join", name);
            }}
            className="w-full py-3 bg-primary text-white rounded hover:bg-accent transition"
          >
            Join
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-lightbg flex flex-col items-center p-6">
      <div className="max-w-xl w-full bg-white rounded-lg shadow-md p-6">
        {question ? (
          <>
            <h2 className="text-2xl font-bold text-dark mb-4">{question.question}</h2>
            {!answered ? (
              <div className="space-y-3">
                {question.options.map((opt, idx) => (
                  <label
                    key={idx}
                    className="flex items-center gap-2 border p-2 rounded cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="answer"
                      value={opt}
                      checked={selected === opt}
                      onChange={() => setSelected(opt)}
                    />
                    <span className="text-dark">{opt}</span>
                  </label>
                ))}
                <button
                  onClick={submit}
                  disabled={!selected}
                  className="w-full py-3 bg-primary text-white rounded hover:bg-accent transition disabled:opacity-50"
                >
                  Submit Answer
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-semibold text-dark mb-3">
                  Live Results
                </h3>
                {Object.entries(results).length === 0 ? (
                  <p className="text-mediumgray">No responses yet.</p>
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
              </>
            )}
          </>
        ) : (
          <p className="text-mediumgray">Waiting for the teacher to start a poll...</p>
        )}
      </div>
    </div>
  );
}