import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

function QuestionCard({ question, onAnswer }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Pergunta: {question.pergunta}
        </Typography>
        <ul>
          {question.alternativas && question.alternativas.map((alternativa, index) => (
            <li key={index}>
              <Button
                variant="outlined"
                onClick={() => onAnswer(index)}
              >
                {alternativa}
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export default QuestionCard;