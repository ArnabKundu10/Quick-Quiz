import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent, CardFooter } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { 
  Trophy, 
  Clock, 
  Target, 
  Zap,
  BarChart3,
  Home
} from 'lucide-react';
import { calculateScore } from '../utils/helpers';

const Summary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { answers, quizData, timeTaken } = location.state || {};

  // Redirect to home if accessed directly without quiz data
  if (!answers || !quizData) {
    return navigate('/');
  }

  const score = calculateScore(answers);
  const correctAnswers = answers.filter(a => a.isCorrect).length;
  const accuracy = ((correctAnswers / quizData.questions_count) * 100).toFixed(1);
  
  // Calculate performance metrics
  const performanceLevel = () => {
    if (accuracy >= 90) return { label: 'Excellent', color: 'text-green-500' };
    if (accuracy >= 70) return { label: 'Good', color: 'text-blue-500' };
    if (accuracy >= 50) return { label: 'Average', color: 'text-yellow-500' };
    return { label: 'Needs Improvement', color: 'text-red-500' };
  };

  const performance = performanceLevel();

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">Quiz Results</h1>
            <p className="text-gray-600">{quizData.title}</p>
          </div>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* Score Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <Trophy className="w-6 h-6 mx-auto text-blue-500 mb-2" />
              <p className="text-2xl font-bold">{score}</p>
              <p className="text-sm text-gray-600">Total Score</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <Target className="w-6 h-6 mx-auto text-green-500 mb-2" />
              <p className="text-2xl font-bold">{accuracy}%</p>
              <p className="text-sm text-gray-600">Accuracy</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg text-center">
              <Clock className="w-6 h-6 mx-auto text-yellow-500 mb-2" />
              <p className="text-2xl font-bold">{timeTaken} min</p>
              <p className="text-sm text-gray-600">Time Taken</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <Zap className="w-6 h-6 mx-auto text-purple-500 mb-2" />
              <p className="text-2xl font-bold">{correctAnswers}/{quizData.questions_count}</p>
              <p className="text-sm text-gray-600">Correct Answers</p>
            </div>
          </div>

          {/* Detailed Analysis */}
          <div className="bg-gray-50 p-6 rounded-lg space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Performance Analysis
              </h3>
              <span className={`font-medium ${performance.color}`}>
                {performance.label}
              </span>
            </div>
            
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-medium mb-2">Score Breakdown</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Correct Answers ({correctAnswers})</span>
                    <span className="text-green-600">+{correctAnswers * quizData.correct_answer_marks} points</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Incorrect Answers ({quizData.questions_count - correctAnswers})</span>
                    <span className="text-red-600">-{(quizData.questions_count - correctAnswers) * quizData.negative_marks} points</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-medium mb-2">Time Analysis</h4>
                <div className="flex justify-between">
                  <span>Average Time per Question</span>
                  <span>{(timeTaken / quizData.questions_count).toFixed(1)} minutes</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex gap-4 justify-center">
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            Home
          </Button>
          <Button
            onClick={() => navigate('/quiz')}
            className="flex items-center gap-2"
          >
            <Zap className="w-4 h-4" />
            Try Another Quiz
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Summary;