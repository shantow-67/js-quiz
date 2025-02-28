import React from 'react';
import { Button } from '../../components/ui/button';
import { CheckCircle2, XCircle } from 'lucide-react';
import useQuizStore from '../../store/quizStore';

const QuizQuestion = ({ question, options, correctAnswer }) => {
  const { selectedOption, isAnswered, handleAnswerSelection } = useQuizStore();
  
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">{question}</h2>
      <div className="space-y-3">
        {options.map((option, index) => (
          <Button
            key={index}
            variant={selectedOption === index 
              ? index === correctAnswer 
                ? "outline" 
                : "destructive" 
              : selectedOption !== null && index === correctAnswer 
                ? "outline" 
                : "outline"}
            className={`w-full justify-start text-left p-4 h-auto ${
              selectedOption === index 
                ? index === correctAnswer 
                  ? "border-green-500 bg-green-50" 
                  : "border-red-500 bg-red-50" 
                : selectedOption !== null && index === correctAnswer 
                  ? "border-green-500 bg-green-50" 
                  : ""
            }`}
            onClick={() => handleAnswerSelection(index, correctAnswer)}
            disabled={isAnswered}
          >
            <div className="flex items-start w-full">
              <span className="mr-2 flex-shrink-0">{String.fromCharCode(65 + index)}.</span>
              <span className="flex-1 break-words whitespace-normal">{option}</span>
              {isAnswered && index === correctAnswer && (
                <CheckCircle2 className="h-5 w-5 text-green-500 ml-2 flex-shrink-0" />
              )}
              {isAnswered && selectedOption === index && index !== correctAnswer && (
                <XCircle className="h-5 w-5 text-red-500 ml-2 flex-shrink-0" />
              )}
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuizQuestion;