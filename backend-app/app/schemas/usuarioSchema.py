from marshmallow import Schema, fields

class UsuarioSchema(Schema):
    nome = fields.Str(required=True, error_messages={"required": "O campo 'nome' é obrigatório."})
    email = fields.Email(required=True, error_messages={
        "required": "O campo 'email' é obrigatório.",
        "invalid": "O campo 'email' deve conter um endereço de e-mail válido."
    })
