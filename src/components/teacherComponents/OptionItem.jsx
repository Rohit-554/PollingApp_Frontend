import React from "react";
export const OptionItem = ({ option, index, updateOption, correctAnswers, toggleCorrectAnswer, removeOption, canRemove }) => (
  <div className="flex items-center gap-4">
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
    {canRemove && (
      <button
        onClick={() => removeOption(index)}
        className="text-gray-400 hover:text-red-500 text-xl font-bold w-6 h-6 flex items-center justify-center"
      >
        ×
      </button>
    )}
  </div>
);