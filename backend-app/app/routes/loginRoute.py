import os
from flask import request
from flask_restx import Resource, Namespace
from flask_jwt_extended import create_access_token
from werkzeug.security import check_password_hash
from ..schemas.loginSchema import LoginSchema
from dotenv import load_dotenv, find_dotenv
from ..models.loginModel import LoginModel
from ..models.usuarioModel import Usuario

from marshmallow import ValidationError

dotenv_path = find_dotenv()
if dotenv_path:
    load_dotenv(dotenv_path)

seconds_to_expire = (60*60*(int(os.getenv("JWT_EXPIRE_TIME_IN_HOURS"))))

loginNs = Namespace('login', description='Login')

loginNs.models[LoginModel.name] = LoginModel

def validate_data_token(data):
    required_fields = ["client_id", "client_secret"]

    for field in required_fields:
        if field not in data or not data[field]:
                return {"error": "invalid_request", "error_description": f"Missing required parameter: {field}"}, 400

    return None, 200

@loginNs.route('/')
class Token(Resource):
    @loginNs.doc(description='Endpoint para fazer login')
    @loginNs.expect(LoginModel)
    @loginNs.response(200, 'Success', LoginModel)
    # @loginNs.response(400, 'Bad Request', authError400)
    # @loginNs.response(401, 'Unauthorized', authError401)
    def post(self):
        schema = LoginSchema()
        try:
            data = schema.load(request.json)
        except ValidationError as err:
            return {"errors": err.messages}, 400
        
        # usuario = Usuario.query.filter_by(email=data["email"]).first()
        # if not usuario or not check_password_hash(usuario.senha, data["senha"]):
        #     return {"error": "Credenciais inválidas"}, 401
        
        # access_token = create_access_token(identity=usuario.id)
        access_token = create_access_token(identity=1)
        return {
            "access_token": access_token,
            "expires_in": seconds_to_expire
        }, 200

