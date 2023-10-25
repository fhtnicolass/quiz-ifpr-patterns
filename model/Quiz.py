import random
from flask import jsonify  # Importe jsonify aqui

class Quiz:
    _instance = None

    def __new__(cls, perguntas):
        if cls._instance is None:
            cls._instance = super(Quiz, cls).__new__(cls)
            cls._instance.perguntas = perguntas
            cls._instance.pontuacao = 0
            cls._instance.pergunta_atual = 0  # Inicialize como a primeira pergunta
        return cls._instance

    def obter_pergunta_atual(self):
        return self.perguntas[self.pergunta_atual]

    def responder_pergunta(self, alternativa_escolhida):
        # Lógica para verificar a resposta e calcular a pontuação
        if alternativa_escolhida == self.perguntas[self.pergunta_atual].resposta_correta:
            self.pontuacao += 1
            return jsonify({'resultado': 'Resposta correta'})
        self.pergunta_atual += 1
        return jsonify({'resultado': 'Resposta incorreta'})

    def jogar(self):
        random.shuffle(self.perguntas)
        for pergunta in self.perguntas:
            pergunta.mostrar_pergunta()

