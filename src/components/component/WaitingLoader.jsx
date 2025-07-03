import React from 'react';
import { GraduationCap } from 'lucide-react';

export default function WaitingLoader() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      {/* Header Badge */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium">
          <GraduationCap size={16} />
          Intervue Poll
        </div>
      </div>

      {/* Spinning Loader */}
      <div className="mb-8">
        <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
      </div>

      {/* Loading Text */}
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Wait for the teacher to ask questions..
      </h2>
    </div>
  );
}