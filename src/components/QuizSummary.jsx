import React from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { calculateScore,formatTime } from '../utils/helpers';

const QuizSummary = ({ answers, totalQuestions, onRestart,timeLeft,highestStreak}) => {
  const score = calculateScore(answers);
  const correctAnswers = answers.filter(a => a.isCorrect).length;
  const accuracy = ((correctAnswers / totalQuestions) * 100).toFixed(1);
  
  return (
    <Card className="w-full max-w-2xl mx-auto mt-8">
      <CardHeader>
        <h2 className="text-2xl font-bold text-center">Quiz Complete!</h2>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="text-center">
          <p className="text-5xl font-bold text-blue-600">{score}</p>
          <p className="text-gray-600 mt-2">Total Score</p>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-xl font-bold">{totalQuestions}</p>
            <p className="text-sm text-gray-600">Total Questions</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-xl font-bold text-green-600">{correctAnswers}</p>
            <p className="text-sm text-gray-600">Correct</p>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <p className="text-xl font-bold text-red-600">{totalQuestions - correctAnswers}</p>
            <p className="text-sm text-gray-600">Incorrect</p>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="font-semibold mb-4">Performance Analysis</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Accuracy</span>
              <span>{accuracy}%</span>
            </div>
            <div className="flex justify-between">
              <span>Time Taken</span>
              <span>{formatTime(900-timeLeft)}</span>
            </div>
            <div className="flex justify-between">
              <span>Longest Streak</span>
              <span>{highestStreak}</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-4">
        <Button
          onClick={onRestart}
          className="w-full"
        >
          Try Again
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuizSummary;