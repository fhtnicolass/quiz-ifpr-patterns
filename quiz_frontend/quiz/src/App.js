import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      pergunta: '',
      alternativas: [],
      pontuacao: 0,
      mensagem: '',
    };
  }

  componentDidMount() {
    this.carregarPergunta();
  }

  carregarPergunta() {
    fetch('/pergunta') // Altere a URL, se necessário
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          pergunta: data.pergunta,
          alternativas: data.alternativas,
          mensagem: '',
        });
      })
      .catch((error) => {
        console.error('Erro ao carregar a pergunta:', error);
      });
  }

  responderPergunta(alternativa_escolhida) {
    fetch(`/responder/${alternativa_escolhida}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ alternativa_escolhida }),
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          mensagem: data.resposta,
          pontuacao: data.pontuacao,
        });
        this.carregarPergunta();
      })
      .catch((error) => {
        console.error('Erro ao responder à pergunta:', error);
      });
  }

  reiniciarJogo() {
    fetch('/reiniciar', {
      method: 'POST',
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          mensagem: data.mensagem,
          pontuacao: 0,
        });
        this.carregarPergunta();
      })
      .catch((error) => {
        console.error('Erro ao reiniciar o jogo:', error);
      });
  }

  render() {
    return (
      <div className="App">
        <h1>Quiz</h1>
        <p>Pergunta: {this.state.pergunta}</p>
        <ul>
          {this.state.alternativas.map((alternativa, index) => (
            <li key={index}>
              <button onClick={() => this.responderPergunta(index)}>
                {alternativa}
              </button>
            </li>
          ))}
        </ul>
        <p>Pontuação: {this.state.pontuacao}</p>
        <p>{this.state.mensagem}</p>
        <button onClick={() => this.reiniciarJogo()}>Reiniciar Jogo</button>
      </div>
    );
  }
}

export default App;
