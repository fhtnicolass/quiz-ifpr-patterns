# Padrão Strategy para pontuação baseada na dificuldade
class DifficultyStrategy:
    def get_score(self):
        return 0

# Estratégia de pontuação para dificuldade Fácil
class EasyDifficultyStrategy(DifficultyStrategy):
    def get_score(self):
        return 1

# Estratégia de pontuação para dificuldade Média
class MediumDifficultyStrategy(DifficultyStrategy):
    def get_score(self):
        return 2

# Estratégia de pontuação para dificuldade Difícil
class HardDifficultyStrategy(DifficultyStrategy):
    def get_score(self):
        return 3