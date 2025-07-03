import React, { useState, useEffect } from "react";
import { socket } from "../socket";
import StudentNameEntry from "./component/StudentNameEntry";
import WaitingLoader from "./component/WaitingLoader";
import QuestionInterface from "./component/QuestionInterface";
import ResultsView from "./component/ResultsView";

export default function StudentDashboard() {
  const [name, setName] = useState(sessionStorage.getItem("studentName") || "");
  const [question, setQuestion] = useState(null);
  const [selected, setSelected] = useState("");
  const [results, setResults] = useState({});
  const [answered, setAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [totalResponses, setTotalResponses] = useState(0);
  const [hasJoined, setHasJoined] = useState(false);
  // On mount, set up socket listeners
  useEffect(() => {
  socket.on("new-poll", (poll) => {
    console.log("New poll received:", poll);
    setQuestion(poll);
    setAnswered(false);
    setSelected("");
    setResults({});
    setTimeLeft(poll.duration || 60);
  });

  socket.on("poll-results", (data) => {
    console.log("Poll results received:", data);
    setResults(data);
    const total = Object.values(data).reduce((sum, count) => sum + count, 0);
    setTotalResponses(total);
  });

  socket.on("poll-ended", () => {
    console.log("Poll ended.");
    setAnswered(true);
  });

  return () => {
    socket.off("new-poll");
    socket.off("poll-results");
    socket.off("poll-ended");
  };
}, []);



  // Timer countdown
  useEffect(() => {
    if (question && !answered && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setAnswered(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [question, answered, timeLeft]);

  const handleContinue = () => {
  if (name.trim()) {
    sessionStorage.setItem("studentName", name);
    socket.emit("student-join", name);
    setHasJoined(true);
    }
  };


  const handleSubmit = () => {
    if (selected) {
      socket.emit("submit-answer", selected);
      setAnswered(true);
    }
  };

  // Render flow

  // 1. Enter name screen
  if (!hasJoined) {
  return (
    <StudentNameEntry
      name={name}
      setName={setName}
      onContinue={handleContinue}
    />
  );
}


  // 2. Question interface (poll active)
  if (question && !answered) {
    return (
      <QuestionInterface
        question={question}
        selected={selected}
        setSelected={setSelected}
        onSubmit={handleSubmit}
        timeLeft={timeLeft}
      />
    );
  }

  // 3. Results view (after submission or timeout)
  if (question && answered) {
    return (
      <ResultsView
        question={question}
        results={results}
        totalResponses={totalResponses}
      />
    );
  }

  // 4. Waiting loader by default
  return <WaitingLoader />;
}
