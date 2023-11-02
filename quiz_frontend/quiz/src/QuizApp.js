import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Snackbar } from '@mui/material';
import QuestionCard from './QuestionCard';
import * as QuizService from './services/QuizServices'; // Certifique-se de que o caminho esteja correto

function QuizApp() {
  const [question, setQuestion] = useState({});
  const [score, setScore] = useState(0);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    QuizService.obterPergunta()
      .then((data) => setQuestion(data))
      .catch((error) => console.error('Erro ao carregar pergunta:', error));
  }, []);

  const handleAnswer = (selectedAnswer) => {
    QuizService.responderPergunta(selectedAnswer)
      .then((data) => {
        if (data.resultado === 'correta') {
          setMessage('Resposta correta! Você acertou.');
          return QuizService.obterPergunta(); // Obter a próxima pergunta após uma resposta correta
        } else {
          setMessage('Resposta incorreta! Você errou.');
          return null; // Retorna null para evitar processamento adicional
        }
      })
      .then((data) => {
        if (data) {
          setQuestion(data);
        }
        setOpen(true);
        return QuizService.obterPontuacao();
      })
      .then((data) => setScore(data.pontuacao))
      .catch((error) => console.error('Erro ao responder à pergunta:', error));
  };

  const handleSnackbarClose = () => {
    setOpen(false);
  };

  const handleRestart = () => {
    QuizService.reiniciarJogo()
      .then((data) => {
        setScore(0);
      })
      .catch((error) => console.error('Erro ao reiniciar o jogo:', error));

    QuizService.obterPergunta()
      .then((data) => setQuestion(data))
      .catch((error) => console.error('Erro ao carregar pergunta:', error));
  };

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Quiz App
      </Typography>
      <QuestionCard question={question} onAnswer={handleAnswer} />
      <Typography variant="h5" gutterBottom style={{ marginTop: 10 }}>
        Pontuação: {score}
      </Typography>
      <Button variant="contained" color="primary" onClick={handleRestart}>
        Reiniciar Jogo
      </Button>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={message}
      />
    </Container>
  );
}

export default QuizApp;
