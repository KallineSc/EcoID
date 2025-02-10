from app.models.usuarioModel import Usuario
from app.models.pontoDeColetaModel import PontoDeColeta
from app import create_app
from app.database import db
from werkzeug.security import generate_password_hash

if __name__ == '__main__':
    app = create_app()
    with app.app_context():
        usuarioExiste = db.session.execute(db.select(Usuario).where(Usuario.nome == "Maria")).scalar()
        if usuarioExiste is None:
            hash_senha = generate_password_hash("senha123")
            usuario = Usuario(nome="Maria", email="maria@hotmail.com", senha=hash_senha)
            db.session.add(usuario)
        
        pontoDeColetaExiste = db.session.execute(db.select(PontoDeColeta).where(PontoDeColeta.nome == "Reciclagem Centro")).scalar()
        if pontoDeColetaExiste is None:
            ponto_de_coleta = PontoDeColeta(
                nome="Reciclagem Centro",
                endereco="Sen. Pompeu, 834",
                bairro="Centro",
                cidade="Fortaleza",
                estado="CE",
                cep="60025-000",
                tipos_de_residuos="plástico, vidro, papel, metal"
            )
            db.session.add(ponto_de_coleta)
        
        db.session.commit()
