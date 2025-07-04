import React from "react";
import {Plus, GraduationCap } from "lucide-react";
import { Header } from "./Header";
import { QuestionInput } from "./QuestionInputComponent";
import { OptionItem } from "./OptionItem";


export const OptionsSection = ({ options, setOptions, correctAnswers, setCorrectAnswers }) => {
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
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-dark">Edit Options</h3>
        <h3 className="text-lg font-semibold text-dark">Is it Correct?</h3>
      </div>

      <div className="space-y-4">
        {options.map((option, index) => (
          <OptionItem
            key={index}
            option={option}
            index={index}
            updateOption={updateOption}
            correctAnswers={correctAnswers}
            toggleCorrectAnswer={toggleCorrectAnswer}
            removeOption={removeOption}
            canRemove={options.length > 2}
          />
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
  );
};


export const CreatePollButton = ({ onCreatePoll, question, options, disabled }) => (
  <div className="flex justify-end">
    <button
      onClick={onCreatePoll}
      disabled={disabled}
      className={`px-8 py-3 rounded-full font-semibold text-white transition-all duration-200 ${
        disabled
          ? "bg-gray-300 cursor-not-allowed"
          : "bg-primary hover:bg-accent shadow-lg hover:shadow-xl"
      }`}
    >
      Ask Question
    </button>
  </div>
);


export const PollCreationForm = ({ 
  question, 
  setQuestion, 
  duration, 
  setDuration, 
  options, 
  setOptions, 
  correctAnswers, 
  setCorrectAnswers, 
  onCreatePoll 
}) => {
  const isDisabled = !question.trim() || options.filter((o) => o.trim()).length < 2;

  return (
    <>
      <Header 
        title="Let's Get Started" 
        subtitle="Create and manage polls, ask questions, and monitor student responses in real-time."
      />
      <QuestionInput 
        question={question}
        setQuestion={setQuestion}
        duration={duration}
        setDuration={setDuration}
      />
      <OptionsSection 
        options={options}
        setOptions={setOptions}
        correctAnswers={correctAnswers}
        setCorrectAnswers={setCorrectAnswers}
      />
      <CreatePollButton 
        onCreatePoll={onCreatePoll}
        question={question}
        options={options}
        disabled={isDisabled}
      />
    </>
  );
};

// Live Results Component
export const LiveResults = ({ question, results }) => (
  <>
    <Header 
      title="Live Results" 
      subtitle="Monitoring responses in real-time"
    />
    <div className="bg-white rounded-xl p-8 shadow-sm">
      <h3 className="text-xl font-semibold text-dark mb-6">{question}</h3>
      {Object.entries(results).length === 0 ? (
        <div className="text-center py-8">
          <div className="animate-pulse mb-4">
            <div className="w-16 h-16 bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
              <GraduationCap size={24} className="text-primary" />
            </div>
          </div>
          <p className="text-mediumgray text-lg">Waiting for responses...</p>
          <p className="text-mediumgray text-sm mt-2">Students will see your question and can submit their answers.</p>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-lg font-semibold text-dark">Student Responses</h4>
            <span className="text-sm text-mediumgray">
              {Object.entries(results).length} response(s)
            </span>
          </div>
          {Object.entries(results).map(([student, answer]) => (
            <div
              key={student}
              className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border-l-4 border-primary"
            >
              <span className="text-dark font-medium">{student}</span>
              <span className="text-primary font-medium bg-primary/10 px-3 py-1 rounded-full text-sm">
                {answer}
              </span>
            </div>
          ))}
        </div>
      )}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <p className="text-blue-800 text-sm">
          💡 The poll will end when all students respond or the timer expires.
        </p>
      </div>
    </div>
  </>
);


