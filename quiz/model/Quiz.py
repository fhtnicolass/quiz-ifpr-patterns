from flask import jsonify


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
        if 0 <= self.pergunta_atual < len(self.perguntas):
            pergunta_atual = self.perguntas[self.pergunta_atual]
            return {
                'pergunta': pergunta_atual.pergunta,
                'alternativas': pergunta_atual.alternativas,
                'nivel_de_dificuldade': pergunta_atual.nivel_de_dificuldade,
                'resposta_correta': pergunta_atual.resposta_correta
            }
        else:
            return None
            
    def responder_pergunta(self, alternativa_escolhida):
        pergunta_atual = self.obter_pergunta_atual()

        if pergunta_atual is not None:
            resultado = 'incorreta'

            if alternativa_escolhida == pergunta_atual.resposta_correta:
                self.pontuacao += self.calcular_pontuacao(pergunta_atual.nivel_de_dificuldade)
                resultado = 'correta'

            # Avance para a próxima pergunta apenas se a resposta for correta
            if resultado == 'correta':
                self.pergunta_atual += 1

            return jsonify({'resultado': resultado})
        else:
            return jsonify({'resultado': 'sem_pergunta'})


    def calcular_pontuacao(self, nivel_de_dificuldade):
        if nivel_de_dificuldade == 'Fácil':
            return 1
        elif nivel_de_dificuldade == 'Médio':
            return 2
        elif nivel_de_dificuldade == 'Difícil':
            return 3
        else:
            return 0


