from flask import request
from flask_restx import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..schemas.usuarioSchema import UsuarioSchema
from ..schemas.usuarioAlterarSenhaSchema import UsuarioAlterarSenhaSchema
from ..models.usuarioModel import Usuario
from ..swagger.usuarioModel import usuarioNs, UsuarioModel, UsuarioUpdateModel, UsuarioUpdateSenha
from marshmallow import ValidationError
from ..database import db
from werkzeug.security import generate_password_hash, check_password_hash

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
            return {"erros": {"email": ["Email já cadastrado"]}}, 400
        
        
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
    @usuarioNs.response(200, 'Successo', UsuarioUpdateModel)
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
    
@usuarioNs.route('/<uuid:id>/senha')
@usuarioNs.param('id', 'ID do usuário')
class UsuarioResource(Resource):
    @usuarioNs.doc(description='Endpoint para alterar a senha de um usuário', security='Bearer')
    @usuarioNs.expect(UsuarioUpdateSenha) 
    @jwt_required()
    def put(self, id):
        """Altera a senha de um usuário"""
        usuario_id_autenticado = get_jwt_identity()

        if usuario_id_autenticado != str(id):
            return {"error": "Você não tem permissão para alterar a senha de outro usuário."}, 403

        usuario = Usuario.query.filter_by(id=str(id)).first()
        if not usuario:
            return {"error": "Usuário não encontrado"}, 404
        
        schema = UsuarioAlterarSenhaSchema()
        try:
            data = schema.load(request.json)
        except ValidationError as err:
            return {"erros": err.messages}, 400
        
        data = request.get_json()
        
        senha_atual = data['senha_atual']
        senha_nova = data['senha_nova']
        
        if not check_password_hash(usuario.senha, senha_atual):
            return {"error": "Senha atual incorreta."}, 400
        
        usuario.senha = generate_password_hash(senha_nova)
        db.session.commit()
        return {"mensagem": "Senha alterada com sucesso!"}, 200