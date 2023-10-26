class DifficultyStrategy:
    def __init__(self, difficulty):
        self.difficulty = difficulty

    def get_score(self):
        pass

class EasyDifficultyStrategy(DifficultyStrategy):
    def get_score(self):
        return 1

class MediumDifficultyStrategy(DifficultyStrategy):
    def get_score(self):
        return 2

class HardDifficultyStrategy(DifficultyStrategy):
    def get_score(self):
        return 3
