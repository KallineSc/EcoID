
from app.models.usuarioModel import Usuario

from app import create_app

from app.database import db
from werkzeug.security import generate_password_hash
if __name__ == '__main__':
    app = create_app()
    with app.app_context():
        usuarioExiste = db.session.execute(db.select(Usuario).where(Usuario.nome=="Maria")).scalar()
        if usuarioExiste is None:
            hash_senha = generate_password_hash("senha123")
            usuario = Usuario(nome="Maria", email="maria@hotmail.com", senha=hash_senha)
            db.session.add(usuario)
        db.session.commit()