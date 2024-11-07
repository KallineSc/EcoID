from flask_restx import fields, Model

AuthModel = Model('AuthModel', {
    'email': fields.String(required=True, description='E-mail de usuário'),
    'senha': fields.String(required=True, description='Senha')
})