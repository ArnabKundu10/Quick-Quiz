import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import QuizStart from '../components/QuizStart';
import QuizQuestion from '../components/QuizQuestion';
import QuizSummary from '../components/QuizSummary';
import Gamification from '../components/Gamification';
import { fetchQuizData } from '../utils/api';

const Quiz = () => {
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quizState, setQuizState] = useState('start'); // start, quiz, summary
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [gameState, setGameState] = useState({
    score: 0,
    streak: 0,
    achievements: [],
    highestStreak:0,
  });

  useEffect(() => {
    loadQuizData();
  }, []);

  const loadQuizData = async () => {
    try {
      const data = await fetchQuizData();
      console.log(data);
      setQuizData(data);
      setTimeLeft(data.duration * 60);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let timer;
    if (quizState === 'quiz' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setQuizState('summary');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [quizState, timeLeft]);

  const handleStart = () => {
    setQuizState('quiz');
  };

  const handleAnswer = (selectedOption) => {
    const isCorrect = selectedOption.is_correct;
    setAnswers([...answers, { questionId: currentQuestion, isCorrect }]);
    
    // Update game state
    setGameState(prev => ({
      ...prev,
      score: prev.score + (isCorrect ? 4 : -1),
      streak: isCorrect ? prev.streak + 1 : 0,
      highestStreak: isCorrect ? Math.max(prev.highestStreak,prev.streak+1):Math.max(prev.highestStreak,0),
    }));

    if (currentQuestion + 1 >= quizData.questions.length) {
      setQuizState('summary');
    } else {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setQuizState('start');
    setTimeLeft(quizData.duration * 60);
    setGameState(prev => ({ ...prev,
       score: 0,
      streak: 0,
      achievements: [],
      highestStreak:0, }));
  };

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (error) return <div className="text-center p-8 text-red-600">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      {quizState === 'start' && (
        <QuizStart quizData={quizData} onStart={handleStart} />
      )}
      {quizState === 'quiz' && (
        <QuizQuestion
          question={quizData.questions[currentQuestion]}
          onAnswer={handleAnswer}
          currentQuestion={currentQuestion}
          totalQuestions={quizData.questions.length}
          timeLeft={timeLeft}
        />
      )}
      {quizState === 'summary' && (
        <QuizSummary
          answers={answers}
          totalQuestions={quizData.questions.length}
          onRestart={handleRestart}
          timeLeft={timeLeft}
          highestStreak={gameState.highestStreak}
        />
      )}
      <Gamification {...gameState} />
    </div>
  );
};

export default Quiz;