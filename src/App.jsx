import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/Landingpage';
import TeacherDashboard from './components/TeacherDashboard';
import StudentDashboard from './components/StudentDashboard';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/teacher" element={<TeacherDashboard />} />
      <Route path="/student" element={<StudentDashboard />} />
    </Routes>
  );
}

// export default function App() {
//   return (
//     <h1 className="text-3xl text-purple-600">
//       Hello world
//     </h1>
//   );
// }