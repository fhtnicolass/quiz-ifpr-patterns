import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Snackbar } from '@mui/material';
import QuestionCard from './QuestionCard';
import * as QuizService from './services/QuizServices';

function QuizApp() {
  const [question, setQuestion] = useState({});
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0); // Novo estado para rastrear o número total de perguntas
  const [questionsAnswered, setQuestionsAnswered] = useState(0); // Novo estado para rastrear o número de perguntas respondidas
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [canAnswer, setCanAnswer] = useState(true);

  useEffect(() => {
    QuizService.obterPergunta()
      .then((data) => {
        setQuestion(data);
        setTotalQuestions(data.numero_total_perguntas); // Defina o número total de perguntas
      })
      .catch((error) => console.error('Erro ao carregar pergunta:', error));
  }, []);

  const handleAnswer = (selectedAnswer) => {
    if (!canAnswer) {
      return;
    }

    setCanAnswer(false);

    QuizService.responderPergunta(selectedAnswer)
      .then((data) => {
        if (data.resultado === 'correta') {
          setMessage('Resposta correta! Você acertou.');
          setQuestionsAnswered(questionsAnswered + 1); // Atualiza o número de perguntas respondidas corretamente
        } else {
          setMessage('Resposta incorreta! Você errou.');
        }

        setOpen(true);

        setTimeout(() => {
          QuizService.obterPergunta()
            .then((data) => {
              setQuestion(data);
              setCanAnswer(true);
              return QuizService.obterPontuacao();
            })
            .then((data) => {
              setScore(data.pontuacao);
              
              // Verifique se todas as perguntas foram respondidas
              if (questionsAnswered === totalQuestions) {
                setMessage(`Jogo concluído! Sua pontuação final é ${score} e você acertou ${questionsAnswered} perguntas do total de ${totalQuestions}.`);
                setOpen(true);
              }
            })
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
        setQuestionsAnswered(0);
      })
      .catch((error) => console.error('Erro ao reiniciar o jogo:', error));
      
    QuizService.obterPergunta()
      .then((data) => {
        setQuestion(data);
        setTotalQuestions(data.numero_total_perguntas);
      })
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
