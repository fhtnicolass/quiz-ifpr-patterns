import json
from service.difficulty_selector import DifficultySelector
from service.question_manager import QuestionManager
from strategy.difficulty_strategy import EasyDifficultyStrategy, MediumDifficultyStrategy, HardDifficultyStrategy
from model.question import Question
from colorama import Fore, Back, Style, init
import os

# Inicialize o Colorama para formatação de texto colorida
init(autoreset=True)

# Função para limpar a tela do terminal com base no sistema operacional
def clear_screen():
    if os.name == 'nt':  # Windows
        os.system('cls')
    else:  # Unix/Linux/Mac
        os.system('clear')

# Função para imprimir a pergunta formatada
def print_question(question, total_score):
    print(Fore.YELLOW + question.pergunta)
    for i, alternativa in enumerate(question.alternativas):
        print(Fore.WHITE + f"{i}. {alternativa}")
    print(Fore.GREEN + f"Pontuação total: {total_score}")  # Adicione esta linha para mostrar a pontuação
    print(Style.RESET_ALL)

# Função para obter uma resposta válida do jogador
def get_valid_input():
    while True:
        resposta = input("Escolha a alternativa correta (0/1/2/3): ").strip()
        if resposta.isdigit() and 0 <= int(resposta) <= 3:
            return int(resposta)
        print(Fore.RED + "Por favor, escolha uma alternativa válida (0/1/2/3).")

# Função principal do quiz
def main():
    while True:  # Loop infinito para continuar o jogo
        clear_screen()  # Limpar a tela antes de iniciar
        # Use o seletor de dificuldade
        selector = DifficultySelector()
        difficulty = selector.select_difficulty()

        question_manager = QuestionManager()
        question_manager.load_questions("data/perguntas.json")

        total_score = 0
        for index in range(len(question_manager.questions)):
            question_data = question_manager.get_question(index)

            # Verifique se a dificuldade corresponde
            if "nivel_de_dificuldade" in question_data and question_data["nivel_de_dificuldade"] == difficulty:
                difficulty_strategy = None
                if difficulty == "Fácil":
                    difficulty_strategy = EasyDifficultyStrategy()
                elif difficulty == "Médio":
                    difficulty_strategy = MediumDifficultyStrategy()
                elif difficulty == "Difícil":
                    difficulty_strategy = HardDifficultyStrategy()

                question = Question(question_data, difficulty_strategy)

                # Imprima a pergunta formatada e a pontuação
                print_question(question, total_score)

                resposta = get_valid_input()
                score = question.check_answer(resposta)
                total_score += score

                if score > 0:
                    print(Fore.GREEN + "Resposta correta!")
                else:
                    print(Fore.RED + "Resposta incorreta.")

                print(Fore.CYAN + f"Pontuação: {score}\n")
                input("Pressione Enter para continuar...")  # Aguarda a entrada do usuário

                clear_screen()  # Limpar a tela antes de exibir a próxima pergunta

        print(Fore.MAGENTA + f"Pontuação total: {total_score}")

        replay = input("Deseja jogar novamente? (s/n): ").strip().lower()
        if replay != 's':
            break  # Encerrar o jogo se o jogador não deseja jogar novamente

if __name__ == "__main__":
    main()
