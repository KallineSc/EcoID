import os
from flask import request
from flask_restx import Resource
from flask_jwt_extended import jwt_required
from ..schemas.usuarioSchema import UsuarioSchema
from ..models.usuarioModel import Usuario
from ..swagger.usuarioModel import usuarioNs, UsuarioModel
from marshmallow import ValidationError
from ..database import db

@usuarioNs.route('/')
class UsuarioResource(Resource):
    @usuarioNs.doc(description='Endpoint para cadastrar usuários', security='Bearer')
    @usuarioNs.expect(UsuarioModel)
    @usuarioNs.response(200, 'Successo', UsuarioModel)
    @jwt_required()
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
        
        novo_usuario = Usuario(
            nome=data['nome'],
            email=data['email'],
            senha=data['senha']
        )

        db.session.add(novo_usuario)
        db.session.commit()
        return {"messagem": "Usuário criado com sucesso!", "usuario_id": str(novo_usuario.id)}, 201

    @usuarioNs.doc(description='Endpoint para listar todos os usuários', security='Bearer')
    @usuarioNs.response(200, 'Successo', UsuarioModel)
    @jwt_required()
    def get(self):
        """Lista todos os usuários"""
        usuarios = Usuario.query.all()
        resultado = [{'id': str(usuario.id), 'nome': usuario.nome, 'email': usuario.email} for usuario in usuarios]
        return {"usuarios": resultado}, 200