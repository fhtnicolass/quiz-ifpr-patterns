Esse projeto é uma API de Quiz


Ao enviar um GET ao endpoint: http://127.0.0.1:5000/pergunta

Você obtém a pergunta. A pergunta começa no index 0.

Ao enviar um POST ao endpoint: http://127.0.0.1:5000/responder/0 

Com o JSON:

{
    "alternativa_escolhida": 0
}

Você obtém a resposta:
{
    "resultado": "Resposta correta"
}

ou incorreta, caso a resposta esteja errada.