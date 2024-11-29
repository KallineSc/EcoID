from flask import request
from flask_restx import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from marshmallow import ValidationError
from ..schemas.denunciaSchema import DenunciaSchema
from ..models.denunciaModel import Denuncia
from ..swagger.denunciaModel import denunciaNs, DenunciaModel, DenunciaUpdateModel
from ..database import db

@denunciaNs.route('/')
class DenunciaListResource(Resource):
    @denunciaNs.doc(description='Endpoint para cadastrar uma denúncia', security='Bearer')
    @denunciaNs.expect(DenunciaModel)
    @jwt_required()
    def post(self):
        """Cria uma nova denúncia"""
        schema = DenunciaSchema()
        try:
            data = schema.load(request.json)
        except ValidationError as err:
            return {"erros": err.messages}, 400

        usuario_id = get_jwt_identity()
        nova_denuncia = Denuncia(
            titulo=data['titulo'],
            descricao=data['descricao'],
            latitude=data['latitude'],
            longitude=data['longitude'],
            usuario_id=usuario_id
        )

        db.session.add(nova_denuncia)
        db.session.commit()
        return {"mensagem": "Denúncia criada com sucesso!", "denuncia_id": str(nova_denuncia.id)}, 201

    @denunciaNs.doc(description='Endpoint para listar todas as denúncias', security='Bearer')
    @jwt_required()
    def get(self):
        """Lista todas as denúncias"""
        denuncias = Denuncia.query.all()
        resultado = [
            {
                'id': str(denuncia.id),
                'titulo': denuncia.titulo,
                'descricao': denuncia.descricao,
                'latitude': denuncia.latitude,
                'longitude': denuncia.longitude,
                'usuario_id': str(denuncia.usuario_id)
            }
            for denuncia in denuncias
        ]
        return {"denuncias": resultado}, 200

@denunciaNs.route('/<uuid:id>')
@denunciaNs.param('id', 'ID da denúncia')
class DenunciaResource(Resource):
    @denunciaNs.doc(description='Endpoint para listar uma denúncia específica', security='Bearer')
    @jwt_required()
    def get(self, id):
        """Obtém uma denúncia específica"""
        denuncia = Denuncia.query.filter_by(id=str(id)).first()
        if not denuncia:
            return {"error": "Denúncia não encontrada"}, 404
        return {
            'id': str(denuncia.id),
            'titulo': denuncia.titulo,
            'descricao': denuncia.descricao,
            'latitude': denuncia.latitude,
            'longitude': denuncia.longitude,
            'usuario_id': str(denuncia.usuario_id)
        }, 200

    @denunciaNs.doc(description='Endpoint para atualizar uma denúncia específica', security='Bearer')
    @denunciaNs.expect(DenunciaUpdateModel)
    @jwt_required()
    def put(self, id):
        """Atualiza uma denúncia específica"""
        denuncia = Denuncia.query.filter_by(id=str(id)).first()
        if not denuncia:
            return {"error": "Denúncia não encontrada"}, 404

        usuario_id = get_jwt_identity()
        if str(denuncia.usuario_id) != usuario_id:
            return {"error": "Permissão negada"}, 403

        data = request.get_json()
        if 'titulo' in data:
            denuncia.titulo = data['titulo']
        if 'descricao' in data:
            denuncia.descricao = data['descricao']
        if 'latitude' in data:
            denuncia.latitude = data['latitude']
        if 'longitude' in data:
            denuncia.longitude = data['longitude']

        db.session.commit()
        return {'mensagem': 'Denúncia atualizada com sucesso!', 'id': str(denuncia.id)}, 200

    @denunciaNs.doc(description='Endpoint para deletar uma denúncia específica', security='Bearer')
    @jwt_required()
    def delete(self, id):
        """Deleta uma denúncia específica"""
        denuncia = Denuncia.query.filter_by(id=str(id)).first()
        if not denuncia:
            return {"error": "Denúncia não encontrada"}, 404

        usuario_id = get_jwt_identity()
        if str(denuncia.usuario_id) != usuario_id:
            return {"error": "Permissão negada"}, 403

        db.session.delete(denuncia)
        db.session.commit()
        return {'mensagem': 'Denúncia deletada com sucesso!'}, 200
