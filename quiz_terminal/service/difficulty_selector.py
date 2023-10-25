class DifficultySelector:
    def select_difficulty(self):
        while True:
            print("Escolha o nível de dificuldade:")
            print("1. Fácil")
            print("2. Médio")
            print("3. Difícil")

            choice = input("Digite o número da dificuldade desejada: ")

            if choice == "1":
                return "Fácil"
            elif choice == "2":
                return "Médio"
            elif choice == "3":
                return "Difícil"
            else:
                print("Escolha inválida. Por favor, escolha uma opção válida.")
