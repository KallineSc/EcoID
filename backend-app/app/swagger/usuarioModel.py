from flask_restx import fields, Namespace

usuarioNs = Namespace('usuarios', description='Operações relacionadas aos usuários')

UsuarioModel = usuarioNs.model('UsuarioModel', {
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

UsuarioUpdateModel = usuarioNs.model('UsuarioUpdateModel', {
    'nome': fields.String(
        description='Nome do usuário',
        example='João Silva'
    ),
    'email': fields.String(
        description='Email do usuário',
        example='joao.silva@example.com'
    )
})

UsuarioUpdateSenha = usuarioNs.model('UsuarioUpdateSenha', {
    'senha_atual': fields.String(
        description='Senha atual do usuário',
        example='senhaSegura'
    ),
    'senha_nova': fields.String(
        description='Senha nova do usuário',
        example='senhaSegura123'
    )
})
