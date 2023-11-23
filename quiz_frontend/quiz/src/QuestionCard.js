import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

function QuestionCard({ question, onAnswer, questionNumber }) {
  const [userAnswer, setUserAnswer] = useState(null);

  useEffect(() => {
    // Reset userAnswer quando uma nova pergunta é recebida
    setUserAnswer(null);
  }, [question]);

  const handleAnswer = (index) => {
    setUserAnswer(index);
    onAnswer(index);
  };

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
          Valor em Pontos: {question.valor_em_pontos}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default QuestionCard;
