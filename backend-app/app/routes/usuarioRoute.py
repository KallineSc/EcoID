from flask import request
from flask_restx import Resource
from flask_jwt_extended import jwt_required
from ..schemas.usuarioSchema import UsuarioSchema
from ..models.usuarioModel import Usuario
from ..swagger.usuarioModel import usuarioNs, UsuarioModel, UsuarioUpdateModel
from marshmallow import ValidationError
from ..database import db
from werkzeug.security import generate_password_hash

@usuarioNs.route('/')
class UsuarioResource(Resource):
    @usuarioNs.doc(description='Endpoint para cadastrar usuários')
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
        
        senha_hash = generate_password_hash(data['senha'])

        novo_usuario = Usuario(
            nome=data['nome'],
            email=data['email'],
            senha=senha_hash
        )

        db.session.add(novo_usuario)
        db.session.commit()
        return {"mensagem": "Usuário criado com sucesso!", "usuario_id": str(novo_usuario.id)}, 201

    @usuarioNs.doc(description='Endpoint para listar todos os usuários', security='Bearer')
    @usuarioNs.response(200, 'Successo', UsuarioModel)
    @jwt_required()
    def get(self):
        """Lista todos os usuários"""
        usuarios = Usuario.query.all()
        resultado = [{'id': str(usuario.id), 'nome': usuario.nome, 'email': usuario.email} for usuario in usuarios]
        return {"usuarios": resultado}, 200

@usuarioNs.route('/<uuid:id>')
@usuarioNs.param('id', 'ID do usuário')
class UsuarioResource(Resource):
    @usuarioNs.doc(description='Endpoint para listar um usuário específico', security='Bearer')
    @jwt_required()
    def get(self, id):
        """Obtém um usuário específico"""
        usuario = Usuario.query.filter_by(id=str(id)).first()
        if not usuario:
            return {"error": "Usuário não encontrado"}, 401
        return {'id': str(usuario.id), 'nome': usuario.nome, 'email': usuario.email}, 200


    @usuarioNs.doc(description='Endpoint para atualizar um usuário específico', security='Bearer')
    @usuarioNs.expect(UsuarioUpdateModel)
    @jwt_required()
    def put(self, id):
        """Atualiza um usuário específico"""
        usuario = Usuario.query.filter_by(id=str(id)).first()
        if not usuario:
            return {"error": "Usuário não encontrado"}, 404
        
        data = request.get_json()
        if 'nome' in data:
            usuario.nome = data['nome']
        if 'email' in data:
            usuario.email = data['email']
        if 'senha' in data:
            usuario.senha = generate_password_hash(data['senha'])

        db.session.commit()
        return {'mensagem': 'Usuário atualizado com sucesso!', 'id': str(usuario.id)}, 200

    @usuarioNs.doc(description='Endpoint para deletar um usuário específico', security='Bearer')
    @jwt_required()
    def delete(self, id):
        """Deleta um usuário específico"""
        usuario = Usuario.query.filter_by(id=str(id)).first()
        if not usuario:
            return {"error": "Usuário não encontrado"}, 404
        
        db.session.delete(usuario)
        db.session.commit()
        return {'mensagem': 'Usuário deletado com sucesso!'}, 200