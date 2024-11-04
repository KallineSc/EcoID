from flask_restx import fields, Model

LoginModel = Model('LoginModel', {
    'email': fields.String(required=True, description='E-mail de usuário'),
    'senha': fields.String(required=True, description='Senha')
})