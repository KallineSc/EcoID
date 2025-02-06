from marshmallow import Schema, fields, validates_schema, ValidationError

class UsuarioAlterarSenhaSchema(Schema):
    senha_atual = fields.Str(required=True, error_messages={'required': 'Senha atual é obrigatória'})
    senha_nova = fields.Str(required=True, error_messages={'required': 'Nova senha é obrigatória'})
    confirmar_senha_nova = fields.Str(required=True, error_messages={'required': 'Confirmação da nova senha é obrigatória'})

    @validates_schema
    def validar_senhas_iguais(self, data, **kwargs):
        """
        Valida se a senha nova e a confirmação da senha são iguais.
        """
        senha_nova = data.get('senha_nova')
        confirmar_senha_nova = data.get('confirmar_senha_nova')
        
        if senha_nova != confirmar_senha_nova:
            raise ValidationError("A nova senha e a confirmação da senha não coincidem.", field_names=['confirmar_senha_nova'])
        