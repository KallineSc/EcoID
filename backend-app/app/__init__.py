from flask import Flask
from flask_jwt_extended import JWTManager
from flask_restx import Api
from flask_cors import CORS
from .config import Config
from .routes.authRoute import authNs
from .routes.usuarioRoute import usuarioNs
from .routes.denunciaRoute import denunciaNs
from .routes.relatorioRoute import relatorioNs
from .database import init_db
from app.models.blacklistTokenModel import BlacklistToken
from app.models.pontoDeColetaModel import PontoDeColeta

jwt = JWTManager()

@jwt.token_in_blocklist_loader
def check_if_token_in_blocklist(jwt_header, jwt_payload):
    """
    Verifica se o token JWT está na blacklist.
    """
    jti = jwt_payload['jti']  # JWT ID
    return BlacklistToken.query.filter_by(jti=jti).first() is not None

@jwt.revoked_token_loader
def token_revoked_callback(jwt_header, jwt_payload):
    """
    Callback para personalizar a mensagem de token revogado.
    """
    return {"mensagem": "O token foi revogado."}, 401

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    authorizations = {
        "Bearer": {
            "type": "apiKey",
            "in": "header",
            "name": "Authorization",
            "description": "Type in the *'Value'* input box below: "
            "**'Bearer &lt;JWT&gt;'**, where JWT is the token"
        }
    }
    init_db(app)
    api = Api(app, version='1.0', title='EcoID', description='', authorizations=authorizations)
    CORS(app)
    jwt.init_app(app)
    api.add_namespace(authNs)
    api.add_namespace(usuarioNs)
    api.add_namespace(denunciaNs)
    api.add_namespace(relatorioNs)

    return app
