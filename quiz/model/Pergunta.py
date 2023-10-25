class Pergunta:
    def __init__(self, pergunta, alternativas, resposta_correta, nivel_de_dificuldade):
        self.pergunta = pergunta
        self.alternativas = alternativas
        self.resposta_correta = resposta_correta
        self.nivel_de_dificuldade = nivel_de_dificuldade

    def mostrar_pergunta(self):
        print(self.pergunta)
        for i, alternativa in enumerate(self.alternativas):
            print(f"{i + 1}. {alternativa}")

class PerguntaFactory:
    @staticmethod
    def criar_pergunta(pergunta_data):
        return Pergunta(
            pergunta_data["pergunta"],
            pergunta_data["alternativas"],
            pergunta_data["resposta_correta"],
            pergunta_data["nivel_de_dificuldade"]
        )