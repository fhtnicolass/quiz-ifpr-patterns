from flask import Blueprint, jsonify, request
from model.Quiz import Quiz
from model.Pergunta import Pergunta, PerguntaFactory
import os
import json 

pergunta_controller = Blueprint('pergunta_controller', __name__)

root_directory = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))

json_file_path = os.path.join(root_directory, 'data', 'quiz_data.json')

# Crie uma instância única do Quiz usando o padrão Singleton
# Suponha que você já tenha carregado as perguntas da mesma maneira que antes
with open(json_file_path, 'r', encoding='utf-8') as file:  # Adicione 'encoding='utf-8''
    quiz_data = json.load(file)

perguntas_json = quiz_data["perguntas"]
perguntas = []

# Utilize a PerguntaFactory para criar as perguntas
pergunta_factory = PerguntaFactory()

for pergunta_json in perguntas_json:
    pergunta = pergunta_factory.criar_pergunta(pergunta_json)
    perguntas.append(pergunta)

quiz = Quiz(perguntas)


@pergunta_controller.route('/teste', methods=['GET'])
def teste():
    teste = "/teste controller"
    print(teste)
    return teste

@pergunta_controller.route('/pergunta', methods=['GET'])
def obter_pergunta():
    pergunta_atual = quiz.obter_pergunta_atual()

    if isinstance(pergunta_atual, dict) and 'resultado' in pergunta_atual and pergunta_atual['resultado'] == 'gameover':
        return jsonify({'resultado': 'sem_pergunta'})
    else:
        return jsonify({
            'pergunta': pergunta_atual.pergunta,
            'alternativas': pergunta_atual.alternativas,
            'nivel_de_dificuldade': pergunta_atual.nivel_de_dificuldade,
            'resposta_correta': pergunta_atual.resposta_correta
        })

@pergunta_controller.route('/pontuacao', methods=['GET'])
def obter_pontuacao():
    return jsonify({'pontuacao': quiz.pontuacao})

@pergunta_controller.route('/reiniciar', methods=['POST'])
def reiniciar_jogo():
    quiz.pontuacao = 0
    quiz.pergunta_atual = 0
    return jsonify({'mensagem': 'Jogo reiniciado'})

@pergunta_controller.route('/responder/<int:alternativa_escolhida>', methods=['POST'])
def responder_pergunta(alternativa_escolhida):
    data = request.get_json()  # Obtenha os dados do corpo da solicitação em JSON
    alternativa_escolhida = data.get("alternativa_escolhida")

    resposta = quiz.responder_pergunta(alternativa_escolhida)
    return resposta