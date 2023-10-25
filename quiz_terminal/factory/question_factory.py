from model.question import Question

# Padrão Factory para criar objetos de pergunta
class QuestionFactory:
    @staticmethod
    def create_question(question_data):
        return Question(question_data)