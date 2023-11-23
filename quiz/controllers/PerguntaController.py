from flask import Blueprint, jsonify, request
from model.Quiz import Quiz
from model.Pergunta import Pergunta
import os
import json

pergunta_controller = Blueprint('pergunta_controller', __name__)

root_directory = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))

json_file_path = os.path.join(root_directory, 'data', 'quiz_data.json')

# Crie uma instância única do Quiz usando o padrão Singleton
# Suponha que você já tenha carregado as perguntas da mesma maneira que antes
with open(json_file_path, 'r') as file:
    quiz_data = json.load(file)

perguntas_json = quiz_data["perguntas"]
perguntas = []

for pergunta_json in perguntas_json:
    pergunta = Pergunta(pergunta_json["pergunta"], pergunta_json["alternativas"],
                        pergunta_json["resposta_correta"], pergunta_json["nivel_de_dificuldade"])
    perguntas.append(pergunta)

Quiz.inicializar(perguntas)

@pergunta_controller.route('/teste', methods=['GET'])
def teste():
    teste = "/teste controller"
    print(teste)
    return teste

@pergunta_controller.route('/pergunta', methods=['GET'])
def obter_pergunta():
    pergunta_atual = Quiz.get_instance().obter_pergunta_atual()
    return jsonify({
        'pergunta': pergunta_atual.pergunta,
        'alternativas': pergunta_atual.alternativas,
        'nivel_de_dificuldade': pergunta_atual.pergunta.nivel_de_dificuldade
    })

@pergunta_controller.route('/pontuacao', methods=['GET'])
def obter_pontuacao():
    return jsonify({'pontuacao': Quiz.get_instance().pontuacao})

@pergunta_controller.route('/reiniciar', methods=['POST'])
def reiniciar_jogo():
    Quiz.inicializar(perguntas)
    return jsonify({'mensagem': 'Jogo reiniciado'})

@pergunta_controller.route('/responder/<int:alternativa_escolhida>', methods=['POST'])
def responder_pergunta(alternativa_escolhida):
    data = request.get_json()
    alternativa_escolhida = data.get("alternativa_escolhida")

    quiz = Quiz.get_instance()
    resposta_correta = quiz.obter_pergunta_atual().resposta_correta
    pontuacao = quiz.responder_pergunta(alternativa_escolhida)

    return jsonify({
        'resultado': 'Resposta correta' if alternativa_escolhida == resposta_correta else 'Resposta incorreta',
        'resposta_correta': resposta_correta,
        'pontuacao': pontuacao
    })
