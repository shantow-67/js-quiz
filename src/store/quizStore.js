import { create } from 'zustand';

const useQuizStore = create((set, get) => ({
  // State
  currentQuestion: 0,
  score: 0,
  showScore: false,
  selectedOption: null,
  timeLeft: 30,
  isAnswered: false,
  animation: '',
  
  // Actions
  setCurrentQuestion: (index) => set({ currentQuestion: index }),
  incrementScore: () => set((state) => ({ score: state.score + 1 })),
  setShowScore: (value) => set({ showScore: value }),
  setSelectedOption: (option) => set({ selectedOption: option }),
  setTimeLeft: (time) => set({ timeLeft: time }),
  decrementTime: () => set((state) => ({ timeLeft: state.timeLeft - 1 })),
  setIsAnswered: (value) => set({ isAnswered: value }),
  setAnimation: (value) => set({ animation: value }),
  
  // Complex actions
  handleAnswerSelection: (optionIndex, correctAnswer) => {
    const { isAnswered } = get();
    
    if (isAnswered) return;
    
    set({ 
      isAnswered: true,
      selectedOption: optionIndex
    });
    
    // Check if answer is correct
    if (optionIndex === correctAnswer) {
      set((state) => ({ 
        score: state.score + 1,
        animation: 'correct' 
      }));
    } else {
      set({ animation: 'incorrect' });
    }
  },
  
  moveToNextQuestion: (totalQuestions) => {
    const { currentQuestion } = get();
    
    set({ animation: '' });
    
    if (currentQuestion < totalQuestions - 1) {
      set((state) => ({ 
        currentQuestion: state.currentQuestion + 1,
        isAnswered: false,
        selectedOption: null,
        timeLeft: 30
      }));
    } else {
      set({ showScore: true });
    }
  },
  
  restartQuiz: () => set({
    currentQuestion: 0,
    score: 0,
    showScore: false,
    selectedOption: null,
    timeLeft: 30,
    isAnswered: false,
    animation: ''
  })
}));

export default useQuizStore;