import json

# Padrão Singleton para gerenciamento de perguntas
class QuestionManager:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(QuestionManager, cls).__new__(cls)
            cls._instance.questions = []
        return cls._instance

    def load_questions(self, json_file):
        with open(json_file, 'r', encoding="utf-8") as file:
            data = json.load(file)
            self.questions = data['perguntas']

    def get_question(self, index):
        if 0 <= index < len(self.questions):
            return self.questions[index]
        return None
