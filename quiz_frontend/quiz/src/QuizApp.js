import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Snackbar } from '@mui/material';
import QuestionCard from './QuestionCard';
import * as QuizService from './services/QuizServices'; // Certifique-se de que o caminho esteja correto
// ... (importações e outras partes do código)

function QuizApp() {
  const [question, setQuestion] = useState({});
  const [score, setScore] = useState(0);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [canAnswer, setCanAnswer] = useState(true);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    QuizService.obterPergunta()
      .then((data) => {
        if (data && data.resultado === 'sem_pergunta') {
          setGameOver(true);
        } else {
          setQuestion(data);
        }
      })
      .catch((error) => console.error('Erro ao carregar pergunta:', error));
  }, []);

  const handleAnswer = (selectedAnswer) => {
    if (!canAnswer || gameOver) {
      // Se não puder responder ou o jogo acabou, retorne
      return;
    }

    setCanAnswer(false);

    QuizService.responderPergunta(selectedAnswer)
      .then((data) => {
        if (data.resultado === 'correta') {
          setMessage('Resposta correta! Você acertou.');
        } else {
          setMessage('Resposta incorreta! Você errou.');
        }

        setOpen(true);

        setTimeout(() => {
          QuizService.obterPergunta()
            .then((data) => {
              if (data && data.resultado === 'sem_pergunta') {
                setGameOver(true);
              } else {
                setQuestion(data);
                setCanAnswer(true);
                return QuizService.obterPontuacao();
              }
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
    if (gameOver) {
      QuizService.reiniciarJogo()
        .then((data) => {
          setScore(0);
          setGameOver(false);
        })
        .catch((error) => console.error('Erro ao reiniciar o jogo:', error));

      QuizService.obterPergunta()
        .then((data) => {
          if (data && data.resultado === 'sem_pergunta') {
            setGameOver(true);
          } else {
            setQuestion(data);
          }
        })
        .catch((error) => console.error('Erro ao carregar pergunta:', error));
    }
  };

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Quiz App
      </Typography>

      {gameOver ? (
        <div>
          <Typography variant="h5" gutterBottom style={{ marginTop: 10 }}>
            Fim de Jogo
          </Typography>
          <Typography variant="h5" gutterBottom style={{ marginTop: 10 }}>
            Pontuação: {score}
          </Typography>
        </div>
      ) : (
        <div>
          <QuestionCard question={question} onAnswer={handleAnswer} />
          <Typography variant="h5" gutterBottom style={{ marginTop: 10 }}>
            Pontuação: {score}
          </Typography>
        </div>
      )}

      <Button variant="contained" color="primary" onClick={handleRestart}>
        Reiniciar Jogo
      </Button>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleSnackbarClose} message={message} />
    </Container>
  );
}

export default QuizApp;