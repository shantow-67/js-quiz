import React, { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Progress } from '../../components/ui/progress';
import QuizTimer from './QuizTimer';
import QuizQuestion from './QuizQuestion';
import QuizResults from './QuizResults';
import useQuizStore from '../../store/quizStore';
import quizData from '../../data/quizData';

const QuizApp = () => {
  const { 
    currentQuestion, 
    score, 
    showScore, 
    animation, 
    isAnswered,
    handleAnswerSelection, 
    moveToNextQuestion, 
    setIsAnswered
  } = useQuizStore();

  // Handle timeout
  const handleTimeUp = () => {
    handleAnswerSelection(null, quizData[currentQuestion].correctAnswer);
  };

  // After answering, move to next question
  useEffect(() => {
    if (isAnswered) {
      const timer = setTimeout(() => {
        moveToNextQuestion(quizData.length);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isAnswered, moveToNextQuestion]);

  // Calculate progress percentage
  const progress = ((currentQuestion) / quizData.length) * 100;

  return (
    <div className="flex flex-col gap-4 items-center justify-center p-4">
      <h1 className=' text-gray-950 text-center font-bold text-3xl'>JavaScript Quiz</h1>
      <Card className={`w-full max-w-lg shadow-lg ${animation === 'correct' ? 'bg-green-50' : animation === 'incorrect' ? 'bg-red-50' : 'bg-white'}`}>
        {!showScore ? (
          <>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl">Quiz Challenge</CardTitle>
                <QuizTimer onTimeUp={handleTimeUp} />
              </div>
              <CardDescription>
                Question {currentQuestion + 1} of {quizData.length}
              </CardDescription>
              <Progress value={progress} className="h-2 mt-2" />
            </CardHeader>
            <CardContent>
              <QuizQuestion 
                question={quizData[currentQuestion].question}
                options={quizData[currentQuestion].options}
                correctAnswer={quizData[currentQuestion].correctAnswer}
              />
            </CardContent>
          </>
        ) : (
          <QuizResults totalQuestions={quizData.length} />
        )}
        <CardFooter className="flex justify-between">
          <div className="text-sm text-gray-500">Score: {score}</div>
          {!showScore && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => handleAnswerSelection(null, quizData[currentQuestion].correctAnswer)}
              disabled={isAnswered}
            >
              Skip
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default QuizApp;