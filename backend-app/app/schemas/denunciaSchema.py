from marshmallow import Schema, fields, validate, ValidationError

def validate_latitude(value):
    if not (-90 <= value <= 90):
        raise ValidationError("A latitude deve estar entre -90 e 90 graus.")

def validate_longitude(value):
    if not (-180 <= value <= 180):
        raise ValidationError("A longitude deve estar entre -180 e 180 graus.")

class DenunciaSchema(Schema):
    titulo = fields.Str(
        required=True,
        validate=validate.Length(min=1, max=100, error="O campo 'título' deve ter entre 1 e 100 caracteres."),
        error_messages={"required": "O campo 'título' é obrigatório."}
    )
    descricao = fields.Str(
        required=True,
        validate=validate.Length(min=1, max=500, error="O campo 'descrição' deve ter entre 1 e 500 caracteres."),
        error_messages={"required": "O campo 'descrição' é obrigatório."}
    )
    latitude = fields.Float(
        required=True,
        validate=validate_latitude,
        error_messages={"required": "O campo 'latitude' é obrigatório.", "invalid": "Latitude inválida."}
    )
    longitude = fields.Float(
        required=True,
        validate=validate_longitude,
        error_messages={"required": "O campo 'longitude' é obrigatório.", "invalid": "Longitude inválida."}
    )
    usuario_id = fields.UUID(
        required=True,
        error_messages={"required": "O campo 'usuario_id' é obrigatório.", "invalid": "ID de usuário inválido."}
    )
