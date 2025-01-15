import os
from flask import request
from flask_restx import Resource, Namespace
from flask_jwt_extended import create_access_token
from ..schemas.loginSchema import LoginSchema
from dotenv import load_dotenv, find_dotenv
from ..models.authModel import AuthModel
from ..models.usuarioModel import Usuario
from werkzeug.security import check_password_hash
from flask_jwt_extended import jwt_required, get_jwt
from app.models.blacklistTokenModel import BlacklistToken
from ..database import db
from marshmallow import ValidationError

dotenv_path = find_dotenv()
if dotenv_path:
    load_dotenv(dotenv_path)

seconds_to_expire = (60 * 60 * (int(os.getenv("JWT_EXPIRE_TIME_IN_HOURS"))))

authNs = Namespace('auth', description='Autenticação')

authNs.models[AuthModel.name] = AuthModel

@authNs.route('/')
class Token(Resource):
    @authNs.doc(description='Endpoint para fazer autenticação')
    @authNs.expect(AuthModel)
    @authNs.response(200, 'Success', AuthModel)
    def post(self):
        schema = LoginSchema()
        try:
            data = schema.load(request.json)
        except ValidationError as err:
            return {"errors": err.messages}, 400

        usuario = Usuario.query.filter_by(email=data["email"]).first()
        if not usuario or not check_password_hash(usuario.senha, data['senha']):
            return {"error": "Credenciais inválidas"}, 401

        access_token = create_access_token(identity=usuario.id)
        return {
            "access_token": access_token,
            "expires_in": seconds_to_expire
        }, 200
    
@authNs.route('/logout')
class Logout(Resource):
    @authNs.doc(description='Endpoint para fazer logout', security='Bearer')
    @jwt_required()
    def post(self):
        """Realiza o logout do usuário"""
        jti = get_jwt()["jti"]

        blacklist_token = BlacklistToken(jti=jti)
        db.session.add(blacklist_token)
        db.session.commit()

        return {"mensagem": "Logout realizado com sucesso!"}, 200