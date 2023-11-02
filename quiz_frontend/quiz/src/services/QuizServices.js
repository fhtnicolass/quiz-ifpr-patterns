
export const obterPergunta = () => {
    return fetch('http://127.0.0.1:5000/pergunta')
      .then((response) => response.json())
      .catch((error) => {
        console.error('Erro ao obter pergunta:', error);
        throw error;
      });
  };
  
  export const responderPergunta = (selectedAnswer) => {
    return fetch(`http://127.0.0.1:5000/responder/${selectedAnswer}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ alternativa_escolhida: selectedAnswer }),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Erro ao responder à pergunta:', error);
        throw error;
      });
  };
  
  export const obterPontuacao = () => {
    return fetch('http://127.0.0.1:5000/pontuacao')
      .then((response) => response.json())
      .catch((error) => {
        console.error('Erro ao obter pontuação:', error);
        throw error;
      });
  };
  
  export const reiniciarJogo = () => {
    return fetch('http://127.0.0.1:5000/reiniciar', {
      method: 'POST',
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Erro ao reiniciar o jogo:', error);
        throw error;
      });
  };