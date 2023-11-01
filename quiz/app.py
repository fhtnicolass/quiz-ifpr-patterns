
from flask import Flask
from flask_cors import CORS
from controllers.PerguntaController import pergunta_controller

app = Flask(__name__)
CORS(app, resources={r"/quiz/*": {"origins": "*"}}) # Substitua com a URL do seu frontend
app.register_blueprint(pergunta_controller)

if __name__ == '__main__':
    app.run()
