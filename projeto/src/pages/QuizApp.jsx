import { useState } from 'react';
import { Container, Title, Question, OptionButton, Score, ErrorMessage } from '../styles/QuizApp';
import QuizService from '../services/QuizService'; 

const QuizApp = () => {
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [error, setError] = useState(null); // Novo estado para capturar erros

  let questions = [];
  try {
    questions = QuizService.getQuestions();
  } catch (error) {
    setError(error.message);
  }

  const handleAnswer = (answer) => {
    try {
      if (QuizService.checkAnswer(answer, questions[currentQuestion].answer)) {
        setScore(score + 1);
      }
      setCurrentQuestion(currentQuestion + 1);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container>
      <Title>Quiz App</Title>
      {error && <ErrorMessage>{error}</ErrorMessage>} {/* Exibe a mensagem de erro */}
      {currentQuestion < questions.length ? (
        <div>
          <Question>{questions[currentQuestion].question}</Question>
          {questions[currentQuestion].options.map((option) => (
            <OptionButton key={option} onClick={() => handleAnswer(option)}>
              {option}
            </OptionButton>
          ))}
        </div>
      ) : (
        <Score>Your score: {score}</Score>
      )}
    </Container>
  );
};

export default QuizApp;
