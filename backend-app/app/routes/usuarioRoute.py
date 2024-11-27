import os
from flask import request
from flask_restx import Resource
from ..schemas.usuarioSchema import UsuarioSchema
from ..models.usuarioModel import Usuario
from ..swagger.usuarioModel import usuarioNs, UsuarioModel
from marshmallow import ValidationError
from werkzeug.security import generate_password_hash
from ..database import db

@usuarioNs.route('/')
class UsuarioPostResource(Resource):
    @usuarioNs.doc(description='Endpoint para fazer operações do usuário')
    @usuarioNs.expect(UsuarioModel)
    @usuarioNs.response(200, 'Successo', UsuarioModel)
    def post(self):
        """Cria um novo usuário"""
        schema = UsuarioSchema()
        try:
            data = schema.load(request.json)
        except ValidationError as err:
            return {"erros": err.messages}, 400
        
        data = request.get_json()
        if Usuario.query.filter_by(email=data['email']).first():
            return {"erros": "Email já cadastrado"}, 400
        
        hashed_password = generate_password_hash(data['senha'])

        novo_usuario = Usuario(
            nome=data['nome'],
            email=data['email'],
            senha=hashed_password
        )

        db.session.add(novo_usuario)
        db.session.commit()
        return {"messagem": "Usuário criado com sucesso!", "usuario_id": str(novo_usuario.id)}, 201