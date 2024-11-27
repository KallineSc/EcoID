from flask_restx import fields, Namespace

usuarioNs = Namespace('usuarios', description='Operações relacionadas aos usuários')

UsuarioModel = usuarioNs.model('Usuario', {
    'nome': fields.String(
        description='Nome do usuário',
        required=True,
        example='João Silva'
    ),
    'email': fields.String(
        description='Email do usuário',
        required=True,
        example='joao.silva@example.com'
    ),
    'senha': fields.String(
        description='Senha do usuário',
        required=True,
        example='senhaSegura123'
    )
})
usuarioNs.add_model('Usuario', UsuarioModel)
