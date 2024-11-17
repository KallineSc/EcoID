from marshmallow import Schema, fields, ValidationError

class LoginSchema(Schema):
    email = fields.Str(required=True, error_messages={"required": "O campo 'email' é obrigatório."})
    senha = fields.Str(required=True, error_messages={"required": "O campo 'senha' é obrigatório."})
