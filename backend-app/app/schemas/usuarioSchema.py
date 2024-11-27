from marshmallow import Schema, fields
from marshmallow.validate import Length

class UsuarioSchema(Schema):
    nome = fields.Str(
        required=True,
        validate=Length(min=1, error="O campo 'nome' não pode estar vazio."),
        error_messages={"required": "O campo 'nome' é obrigatório."}
    )
    email = fields.Email(required=True, error_messages={
        "required": "O campo 'email' é obrigatório.",
        "invalid": "O campo 'email' deve conter um endereço de e-mail válido."
    })
    senha = fields.Str(required=True, load_only=True, error_messages={
        "required": "O campo 'senha' é obrigatório."
    })
