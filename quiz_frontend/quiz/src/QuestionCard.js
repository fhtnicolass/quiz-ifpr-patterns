import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

function QuestionCard({ question, onAnswer, questionNumber }) {
  const [userAnswer, setUserAnswer] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    // Reset userAnswer quando uma nova pergunta é recebida
    setUserAnswer(null);

    // Verifica se a pergunta é null, indicando que o jogo acabou
    if (question === null) {
      setGameOver(true);
    }
  }, [question]);

  const handleAnswer = (index) => {
    setUserAnswer(index);
    onAnswer(index);
  };

  // Função para calcular pontos com base no nível de dificuldade
  const calcularPontos = () => {
    // Certifique-se de que question.nivel_de_dificuldade não é undefined antes de chamar toLowerCase
    const nivel = question.nivel_de_dificuldade ? question.nivel_de_dificuldade.toLowerCase() : '';

    if (nivel === 'fácil') {
      return 1;
    } else if (nivel === 'médio') {
      return 2;
    } else if (nivel === 'difícil') {
      return 3;
    } else {
      return 0;
    }
  };

  // Renderiza a tela de fim de jogo
  if (gameOver) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Fim de Jogo
          </Typography>
          <Typography variant="body2" style={{ marginTop: 10 }}>
            Sua Pontuação: {calcularPontos()}
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Pergunta: {question.pergunta} ({question.nivel_de_dificuldade})
        </Typography>
        <ul style={{ marginTop: 10 }}>
          {question.alternativas && question.alternativas.map((alternativa, index) => (
            <li key={index}>
              <Button
                variant="outlined"
                onClick={() => handleAnswer(index)}
                style={{
                  backgroundColor: userAnswer === index && index !== question.resposta_correta ? 'red' : 'white',
                  color: 'black',
                  marginTop: 10,
                }}
              >
                {alternativa}
              </Button>
            </li>
          ))}
        </ul>
        <Typography variant="body2" style={{ marginTop: 10 }}>
          Valor em Pontos: {calcularPontos(question.nivel_de_dificuldade)}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default QuestionCard;
