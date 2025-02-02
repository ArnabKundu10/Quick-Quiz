import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Summary from './pages/Summary';
import Navbar from "./components/Navbar";
const App = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/summary" element={<Summary />} />
      </Routes>
    </div>
  );
};

export default App;