import React from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Trophy } from 'lucide-react';

const QuizStart = ({ quizData, onStart }) => {
  return (
    <Card className="w-full max-w-2xl mx-auto mt-8">
      <CardHeader>
        <div className="flex items-center justify-center space-x-2">
          <Trophy className="w-8 h-8 text-yellow-500" />
          <h1 className="text-2xl font-bold">{quizData.title}</h1>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
          <h2 className="font-semibold text-lg">Quiz Details</h2>
          <ul className="space-y-2">
            <li className="flex justify-between">
              <span>Duration:</span>
              <span className="font-medium">{quizData.duration} minutes</span>
            </li>
            <li className="flex justify-between">
              <span>Total Questions:</span>
              <span className="font-medium">{quizData.questions_count}</span>
            </li>
            <li className="flex justify-between">
              <span>Correct Answer:</span>
              <span className="font-medium text-green-600">+{quizData.correct_answer_marks} points</span>
            </li>
            <li className="flex justify-between">
              <span>Wrong Answer:</span>
              <span className="font-medium text-red-600">-{quizData.negative_marks} points</span>
            </li>
          </ul>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={onStart}
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          Start Quiz
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuizStart;