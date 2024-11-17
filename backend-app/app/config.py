import os
from dotenv import load_dotenv, find_dotenv
from datetime import timedelta

dotenv_path = find_dotenv()
if dotenv_path:
    load_dotenv(dotenv_path)

psqlUser = os.getenv('PSQL_USER')
psqlDb = os.getenv('PSQL_DB')
psqlPassword = os.getenv('PSQL_PASSWORD')
psqlPort = os.getenv('PSQL_PORT')
psqlHost = os.getenv('PSQL_HOST')

class Config:
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')
    RESTX_MASK_SWAGGER = os.getenv('RESTX_MASK_SWAGGER')
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=(int(os.getenv("JWT_EXPIRE_TIME_IN_HOURS"))))
    JWT_BLACKLIST_ENABLED = True
    JWT_BLACKLIST_TOKEN_CHECKS = ['access']
    PROPAGATE_EXCEPTIONS = True
    SQLALCHEMY_DATABASE_URI = f"postgresql://{psqlUser}:{psqlPassword}@{psqlHost}:{psqlPort}/{psqlDb}"