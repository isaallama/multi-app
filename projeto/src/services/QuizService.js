const getQuestions = () => { // Função para carregar as questões
  try {
    return [
      {
        question: "Quanto é 2+2?", 
        options: ["3", "4", "5", "6"], 
        answer: "4",
      },
      {
        question: "Quanto é 3+3?",
        options: ["5", "6", "7", "8"], 
        answer: "6", 
      },
    ];
  } catch (error) {
    console.error("Erro ao carregar questões:", error);
    throw new Error("Não foi possível carregar as questões. Por favor, tente novamente.");
  }
};

const checkAnswer = (selectedAnswer, correctAnswer) => { // Função para verificar a resposta
  try {
    return selectedAnswer === correctAnswer;
  } catch (error) {
    console.error("Erro ao verificar a resposta:", error);
    throw new Error("Não foi possível verificar a resposta. Por favor, tente novamente.");
  }
};

export default { getQuestions, checkAnswer };
