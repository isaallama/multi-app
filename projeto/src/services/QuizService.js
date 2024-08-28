const getQuestions = () => {
  try {
    return [
      {
        question: "What is 2+2?", 
        options: ["3", "4", "5", "6"], 
        answer: "4",
      },
      {
        question: "What is 3+3?",
        options: ["5", "6", "7", "8"], 
        answer: "6", 
      },
    ];
  } catch (error) {
    console.error("Error retrieving questions:", error);
    throw new Error("Unable to load quiz questions. Please try again later.");
  }
};

const checkAnswer = (selectedAnswer, correctAnswer) => {
  try {
    return selectedAnswer === correctAnswer;
  } catch (error) {
    console.error("Error checking answer:", error);
    throw new Error("Unable to check the answer. Please try again.");
  }
};

export default { getQuestions, checkAnswer };
