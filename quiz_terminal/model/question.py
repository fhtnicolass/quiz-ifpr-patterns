from strategy.difficulty_strategy import EasyDifficultyStrategy,MediumDifficultyStrategy,HardDifficultyStrategy
import json

# Classe pergunta
class Question:
    def __init__(self, data, difficulty_strategy):
        self.pergunta = data["pergunta"]
        self.alternativas = data["alternativas"]
        self.resposta_correta = data["resposta_correta"]
        self.difficulty_strategy = difficulty_strategy

    def check_answer(self, resposta):
        if resposta == self.resposta_correta:
            return self.difficulty_strategy.get_score()
        return 0