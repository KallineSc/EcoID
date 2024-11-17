from flask import Flask
from flask_jwt_extended import JWTManager
from flask_restx import Api
from flask_cors import CORS
from .config import Config

from .routes.authRoute import authNs
from .database import init_db

jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    authorizations = {
        "Bearer": {
            "type": "apiKey",
            "in": "header",
            "name": "Authorization",
            "description": "Type in the *'Value'* input box below: **'Bearer &lt;JWT&gt;'**, where JWT is the token"
        }
    }
    init_db(app)
    api = Api(app, version='1.0', title='EcoID', description='', authorizations=authorizations)
    
    CORS(app)
    jwt.init_app(app)
    api.add_namespace(authNs)
    
    return app
