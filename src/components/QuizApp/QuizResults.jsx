import React from 'react';
import { Button } from '../../components/ui/button';
import { CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import useQuizStore from '../../store/quizStore';

const QuizResults = ({ totalQuestions }) => {
  const { score, restartQuiz } = useQuizStore();
  
  return (
    <>
      <CardHeader>
        <CardTitle className="text-xl text-center">Quiz Results</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <div className="text-5xl font-bold mb-4">{score} / {totalQuestions}</div>
        <p className="text-lg mb-6">
          {score === totalQuestions 
            ? "Perfect! You got all the questions right!" 
            : score >= totalQuestions / 2 
              ? "Good job! You passed the quiz." 
              : "Keep practicing. You'll do better next time."}
        </p>
        <Button onClick={restartQuiz} className="w-full">Restart Quiz</Button>
      </CardContent>
    </>
  );
};

export default QuizResults;