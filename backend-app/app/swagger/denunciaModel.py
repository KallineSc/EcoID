from flask_restx import fields, Namespace

denunciaNs = Namespace('denuncias', description='Operações relacionadas às denúncias')

DenunciaModel = denunciaNs.model('Denuncia', {
    'titulo': fields.String(
        description='Título da denúncia',
        required=True,
        example='Descarte irregular de lixo'
    ),
    'descricao': fields.String(
        description='Descrição detalhada da denúncia',
        required=True,
        example='Lixo descartado na calçada próxima à escola durante a noite.'
    ),
    'latitude': fields.Float(
        description='Latitude da localização do incidente',
        required=True,
        example=-23.55052
    ),
    'longitude': fields.Float(
        description='Longitude da localização do incidente',
        required=True,
        example=-46.633308
    ),
    'usuario_id': fields.String(
        description='ID do usuário que fez a denúncia',
        required=True,
        example='7b61d89a-8c3e-4e2d-9d7d-b830d5ed59cd'
    )
})

DenunciaUpdateModel = denunciaNs.model('DenunciaUpdate', {
    'titulo': fields.String(
        description='Título da denúncia',
        example='Descarte irregular de lixo'
    ),
    'descricao': fields.String(
        description='Descrição detalhada da denúncia',
        example='Lixo descartado na calçada próxima à escola durante a noite.'
    ),
    'latitude': fields.Float(
        description='Latitude da localização do incidente',
        example=-23.55052
    ),
    'longitude': fields.Float(
        description='Longitude da localização do incidente',
        example=-46.633308
    )
})

denunciaNs.add_model('Denuncia', DenunciaModel)
denunciaNs.add_model('DenunciaUpdate', DenunciaUpdateModel)
