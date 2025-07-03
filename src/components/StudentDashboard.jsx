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
  const [pendingResults, setPendingResults] = useState(null);
  // On mount, set up socket listeners

  useEffect(() => {
  if (question && pendingResults) {
    console.log("Processing pending results because question is now available:", pendingResults);
    processResults(pendingResults, question);
    setPendingResults(null);
  }
}, [question, pendingResults]);


  useEffect(() => {
  socket.on("new-poll", (poll) => {
  console.log("New poll received:", poll);
  setQuestion(poll);
  setAnswered(false);
  setSelected("");
  setResults({});
  setTotalResponses(0);
  setTimeLeft(poll.duration || 60);

  // If there were results that arrived before question was set
  if (pendingResults) {
    console.log("Processing pending results after question set:", pendingResults);
    processResults(pendingResults, poll);
    setPendingResults(null);
  }
  });

  

  // Listen for poll results
  socket.on("poll-results", (data) => {
  console.log("Poll results received:", data);

  if (!question) {
    console.warn("Received poll-results but no active question yet. Storing for later.");
    setPendingResults(data);
    return;
  }

  processResults(data, question);
  });





  socket.on("poll-ended", () => {
    console.log("Poll ended.");
    setAnswered(true);
  });

  socket.on("kicked", () => {
  alert("You were kicked by the teacher.");
  sessionStorage.removeItem("studentName");
  window.location.reload();
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


  function processResults(data, question) {
  let optionCounts;

  if (Object.values(data).some((v) => typeof v === "string")) {
    // Transform student answers into counts
    optionCounts = {};
    question.options.forEach((opt) => {
      optionCounts[opt] = 0;
    });
    Object.values(data).forEach((answer) => {
      if (Object.prototype.hasOwnProperty.call(optionCounts, answer)) {
        optionCounts[answer]++;
      }
    });
  } else {
    optionCounts = data;
  }

  console.log("Processed counts:", optionCounts);

  const total = Object.values(optionCounts).reduce((sum, c) => sum + c, 0);
  console.log("Total responses calculated:", total);

  setResults(optionCounts);
  setTotalResponses(total);
}

}

