from flask import Blueprint, jsonify
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
    pergunta = Pergunta(pergunta_json["pergunta"], pergunta_json["alternativas"], pergunta_json["resposta_correta"], pergunta_json["nivel_de_dificuldade"])
    perguntas.append(pergunta)

quiz = Quiz(perguntas)

@pergunta_controller.route('/pergunta', methods=['GET'])
def obter_pergunta():
    pergunta_atual = quiz.obter_pergunta_atual()
    return jsonify({
        'pergunta': pergunta_atual.pergunta,
        'alternativas': pergunta_atual.alternativas
    })

@pergunta_controller.route('/responder/<int:alternativa_escolhida>', methods=['POST'])
def responder_pergunta(alternativa_escolhida):
    resposta = quiz.responder_pergunta(alternativa_escolhida)
    return resposta