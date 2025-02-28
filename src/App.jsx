import React, { useState } from 'react';
import QuizApp from './components/QuizApp';
import './index.css';

function App() {
  const [quizStarted, setQuizStarted] = useState(false);

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  return (
    <div className='min-h-screen bg-yellow-300'>
      {quizStarted ? (
        <QuizApp />
      ) : (
        <div className='flex flex-col items-center justify-center h-screen px-4'>
          <div className='max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center'>
            <h1 className='text-3xl font-bold mb-6'>Welcome to the Quiz!</h1>
            <p className='text-lg mb-8'>
              Test your Javascript knowledge with our exciting questions.
            </p>
            <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6'>
              <p className='font-medium'>Important:</p>
              <p>Once you start the quiz, you cannot go back until you complete all questions.</p>
            </div>
            <button
              onClick={handleStartQuiz}
              className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors duration-200'
            >
              Let's Start the Quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
