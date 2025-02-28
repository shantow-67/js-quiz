import React, { useEffect } from 'react';
import { Timer } from 'lucide-react';
import useQuizStore from '../../store/quizStore';

const QuizTimer = ({ onTimeUp }) => {
  const { timeLeft, decrementTime, isAnswered } = useQuizStore();
  
  useEffect(() => {
    if (timeLeft > 0 && !isAnswered) {
      const timer = setTimeout(() => {
        decrementTime();
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isAnswered) {
      onTimeUp();
    }
  }, [timeLeft, isAnswered, decrementTime, onTimeUp]);
  
  return (
    <div className="flex items-center gap-2">
      <Timer className="h-5 w-5 text-blue-600" />
      <span className={`font-bold ${timeLeft < 10 ? 'text-red-500' : 'text-blue-600'}`}>
        {timeLeft}s
      </span>
    </div>
  );
};

export default QuizTimer;