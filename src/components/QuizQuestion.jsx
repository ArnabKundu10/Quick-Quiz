import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { formatTime } from '../utils/helpers';

const QuizQuestion = ({ 
  question, 
  onAnswer, 
  currentQuestion, 
  totalQuestions, 
  timeLeft 
}) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSubmit = () => {
    if (selectedOption) {
      onAnswer(selectedOption);
      setSelectedOption(null);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto mt-8">
      <CardHeader className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">
            Question {currentQuestion + 1} of {totalQuestions}
          </span>
          <span className="text-sm font-medium">
            Time Left: {formatTime(timeLeft)}
          </span>
        </div>
        <Progress value={(currentQuestion / totalQuestions) * 100} />
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-lg">{question.description}</p>
        <div className="space-y-3">
          {question.options.map((option) => (
            <button
              key={option.id}
              onClick={() => setSelectedOption(option)}
              className={`w-full p-4 text-left rounded-lg border transition-colors ${
                selectedOption?.id === option.id
                  ? 'bg-blue-50 border-blue-500'
                  : 'hover:bg-gray-50 border-gray-200'
              }`}
            >
              {option.description}
            </button>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleSubmit}
          disabled={!selectedOption}
          className="w-full"
        >
          Next Question
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuizQuestion;