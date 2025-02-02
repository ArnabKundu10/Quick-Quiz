import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center space-y-8">
        <h1 className="text-4xl font-bold">Quiz App</h1>
        <p className="text-gray-600 max-w-md mx-auto">
          Test your knowledge with our interactive quizzes. Track your progress and earn achievements!
        </p>
        <Button 
          onClick={() => navigate('/quiz')}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Start Quiz
        </Button>
      </div>
    </div>
  );
};

export default Home;