import React, { useState, useEffect } from 'react';
import { Container, Typography, Button } from '@mui/material';
import QuestionCard from './QuestionCard';

function QuizApp() {
  const [question, setQuestion] = useState({});
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Fazer uma chamada para a sua API Flask e obter a primeira pergunta ao carregar o componente
    // Substitua 'your-api-endpoint' pela URL da sua API Flask
    fetch('your-api-endpoint/pergunta')
      .then((response) => response.json())
      .then((data) => setQuestion(data))
      .catch((error) => console.error('Erro ao carregar pergunta:', error));
  }, []);

  const handleAnswer = (selectedAnswer) => {
    // Fazer uma chamada para a sua API Flask para responder à pergunta
    fetch(`your-api-endpoint/responder/${selectedAnswer}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ alternativa_escolhida: selectedAnswer }),
    })
      .then((response) => response.json())
      .then((data) => {
        setScore(data.pontuacao);
        setQuestion(data.pergunta);
      })
      .catch((error) => console.error('Erro ao responder à pergunta:', error));
  };

  const handleRestart = () => {
    // Fazer uma chamada para a sua API Flask para reiniciar o jogo
    fetch('your-api-endpoint/reiniciar', {
      method: 'POST',
    })
      .then((response) => response.json())
      .then((data) => {
        setScore(0);
        setQuestion(data.pergunta);
      })
      .catch((error) => console.error('Erro ao reiniciar o jogo:', error));
  };

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Quiz App
      </Typography>
      <QuestionCard question={question} onAnswer={handleAnswer} />
      <Typography variant="h5" gutterBottom>
        Pontuação: {score}
      </Typography>
      <Button variant="contained" color="primary" onClick={handleRestart}>
        Reiniciar Jogo
      </Button>
    </Container>
  );
}

export default QuizApp;
