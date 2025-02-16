import requests
import json
import base64
from flask import request
from flask_restx import Resource, Namespace
from flask_jwt_extended import jwt_required
from werkzeug.datastructures import FileStorage

classificacaoNs = Namespace("classificacao", description="Classificação de materiais recicláveis")

upload_parser = classificacaoNs.parser()
upload_parser.add_argument("imagem", location="files", type=FileStorage, required=True, help="Imagem do material")

GOOGLE_API_KEY = "AIzaSyC-fguddq_sK-i_yCEG9249qOq72Jv2h9M"
GEMINI_URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={GOOGLE_API_KEY}"

@classificacaoNs.route("/")
class ClassificacaoResource(Resource):
    @classificacaoNs.doc(description="Classifica um material reciclável a partir de uma imagem", security="Bearer")
    @classificacaoNs.expect(upload_parser)
    @jwt_required()
    def post(self):
        """Recebe uma imagem e classifica o material reciclável"""
        args = upload_parser.parse_args()
        imagem = args["imagem"]

        if not imagem:
            return {"erro": "Nenhuma imagem enviada"}, 400

        try:
            # Lê a imagem e codifica para base64
            imagem_bytes = imagem.read()
            imagem_base64 = base64.b64encode(imagem_bytes).decode('utf-8')

            payload = {
                "contents": [{
                    "parts": [
                        {"inlineData": {"mimeType": imagem.mimetype, "data": imagem_base64}},  
                        {"text": "Esta imagem contém material reciclável? Identifique se é plástico, vidro, papel, metal ou outro material. Se for material reciclável, informe como pode ser descartado"}
                    ]
                }]
            }

            headers = {"Content-Type": "application/json"}

            # Envia a requisição para a API GEMINI
            response = requests.post(GEMINI_URL, headers=headers, data=json.dumps(payload))
            resposta_gemini = response.json()

            if "candidates" in resposta_gemini:
                classificacao = resposta_gemini["candidates"][0]["content"]["parts"][0]["text"]
                return {"classificacao": classificacao}, 200
            else:
                return {"erro": resposta_gemini}, 500

        except Exception as e:
            return {"erro": f"Erro na requisição à API: {str(e)}"}, 500
