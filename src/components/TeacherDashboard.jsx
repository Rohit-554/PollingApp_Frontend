import React, { useState, useEffect, useRef } from "react";
import { GraduationCap, ChevronDown, Plus } from "lucide-react";
import { socket } from "../socket";
import { PollCreationForm } from "./teacherComponents/OptionSectionComponent";
import { LiveResults } from "./teacherComponents/OptionSectionComponent";
import { PollResultsSummary } from "./teacherComponents/PollResultSummary";
import { PollHistoryModal } from "./teacherComponents/PollHistoryModal";
import ChatPanel from "./ChatPanel";
import ChatToggle from "./ChatToggle";

const formatParticipants = (results) => {
  return Object.entries(results).map(([name, answer]) => ({
    id: name,
    name,
    answer
  }));
};


export default function TeacherDashboard() {
  const currentPollRef = useRef(null);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [duration, setDuration] = useState(60);
  const [results, setResults] = useState({});
  const [pollActive, setPollActive] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState([false, false]);
  const [pollEnded, setPollEnded] = useState(false);
  const [pollHistory, setPollHistory] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const latestResultsRef = useRef({});


  // Listen to socket events (commented out for demo)
  useEffect(() => {
    socket.on("poll-results", (data) => {
      setResults(data);
      latestResultsRef.current = data;
      console.log("this is data" + formatParticipants(data))
    });

    socket.on("poll-ended", () => {
      setPollEnded(true);
      setShowResults(true);

      const pollData = {
        id: Date.now(),
        question: currentPollRef.current?.question || "Untitled",
        options: currentPollRef.current?.options || [],
        results: latestResultsRef.current,  // ✅ Correct here
        correctAnswers: currentPollRef.current?.correctAnswers || [],
        timestamp: new Date().toISOString(),
        totalResponses: Object.values(latestResultsRef.current).length
      };

      console.log("Saving poll to history:", pollData);

      setPollHistory((prev) => [pollData, ...prev]);
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
    const cleanedOptions = options.filter((o) => o.trim() !== "");
    socket.emit("create-poll", {
      question,
      options: options.filter((o) => o.trim() !== ""),
      duration,
      correctAnswers,
    });

    setPollActive(true);
    setPollEnded(false);
    setShowResults(false);
    setResults({});

    currentPollRef.current = {
      question,
      options: cleanedOptions,
      correctAnswers,
    };
  };

  const ChatToggleComponent = <ChatToggle socket={socket} senderName="Teacher" />;

  const startNewPoll = () => {
    setQuestion("");
    setOptions(["", ""]);
    setCorrectAnswers([false, false]);
    setResults({});
    setPollActive(false);
    setPollEnded(false);
    setShowResults(false);
  };

  const handleViewHistory = () => {
    console.log("Opening history modal, current history:", pollHistory);
    setShowHistory(true);
  };


  if (showResults && pollEnded) {
    return (
      <>
        {ChatToggleComponent}
        <PollResultsSummary
          question={question}
          options={options}
          results={results}
          correctAnswers={correctAnswers}
          onNewQuestion={startNewPoll}
          onViewHistory={handleViewHistory}
          participants={formatParticipants(results)} // ✅ add this line
        />
      </>
    );
  }



  {
    showHistory && (
      <PollHistoryModal
        onClose={() => setShowHistory(false)}
        history={pollHistory}
      />
    )
  }

  return (
    <>
      {ChatToggleComponent}
      <div className="min-h-screen bg-lightbg font-sans">
        <ChatToggle socket={socket} senderName="Teacher" />
        <div className="max-w-4xl mx-auto p-6">
          {!pollActive || pollEnded ? (
            <PollCreationForm
              question={question}
              setQuestion={setQuestion}
              duration={duration}
              setDuration={setDuration}
              options={options}
              setOptions={setOptions}
              correctAnswers={correctAnswers}
              setCorrectAnswers={setCorrectAnswers}
              onCreatePoll={createPoll}
            />
          ) : (
            <LiveResults
              question={question}
              results={results}
            />
          )}
        </div>
      </div>
    </>
  );
}