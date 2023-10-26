from strategy.DifficultyStrategy import EasyDifficultyStrategy,MediumDifficultyStrategy,HardDifficultyStrategy
class Pergunta:
    def __init__(self, pergunta, alternativas, resposta_correta, nivel_de_dificuldade):
        self.pergunta = pergunta
        self.alternativas = alternativas
        self.resposta_correta = resposta_correta
        self.nivel_de_dificuldade = nivel_de_dificuldade

        if self.nivel_de_dificuldade == "Fácil":
            self.difficulty_strategy = EasyDifficultyStrategy(self.nivel_de_dificuldade)
        elif self.nivel_de_dificuldade == "Médio":
            self.difficulty_strategy = MediumDifficultyStrategy(self.nivel_de_dificuldade)
        elif self.nivel_de_dificuldade == "Difícil":
            self.difficulty_strategy = HardDifficultyStrategy(self.nivel_de_dificuldade)

    def mostrar_pergunta(self):
        print(self.pergunta)
        for i, alternativa in enumerate(self.alternativas):
            print(f"{i + 1}. {alternativa}")

    def verificar_resposta(self, resposta):
        if resposta == self.resposta_correta:
            return self.difficulty_strategy.get_score()
        return 0

class PerguntaFactory:
    @staticmethod
    def criar_pergunta(pergunta_data):
        return Pergunta(
            pergunta_data["pergunta"],
            pergunta_data["alternativas"],
            pergunta_data["resposta_correta"],
            pergunta_data["nivel_de_dificuldade"]
        )