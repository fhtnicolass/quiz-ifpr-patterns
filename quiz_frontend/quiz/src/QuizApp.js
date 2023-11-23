import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Snackbar } from '@mui/material';
import QuestionCard from './QuestionCard';
import * as QuizService from './services/QuizServices'; // Certifique-se de que o caminho esteja correto

function QuizApp() {
  const [question, setQuestion] = useState({});
  const [score, setScore] = useState(0);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [canAnswer, setCanAnswer] = useState(true); // Nova variável de estado

  useEffect(() => {
    QuizService.obterPergunta()
      .then((data) => setQuestion(data))
      .catch((error) => console.error('Erro ao carregar pergunta:', error));
  }, []);

  const handleAnswer = (selectedAnswer) => {
    if (!canAnswer) {
      // Se não puder responder, retorne
      return;
    }

    setCanAnswer(false); // Desabilita a capacidade de responder

    QuizService.responderPergunta(selectedAnswer)
      .then((data) => {
        if (data.resultado === 'correta') {
          setMessage('Resposta correta! Você acertou.');
        } else {
          setMessage('Resposta incorreta! Você errou.');
        }

        setOpen(true);

        // Introduzir um atraso de 2 segundos antes de obter a próxima pergunta
        setTimeout(() => {
          QuizService.obterPergunta()
            .then((data) => {
              setQuestion(data);
              setCanAnswer(true); // Habilita a capacidade de responder novamente
              return QuizService.obterPontuacao();
            })
            .then((data) => setScore(data.pontuacao))
            .catch((error) => console.error('Erro ao obter a próxima pergunta:', error));
        }, 2000);
      })
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
