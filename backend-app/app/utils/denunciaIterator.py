from collections.abc import Iterator, Iterable
from ..models.denunciaModel import Denuncia
from ..database import db

class DenunciaIterator(Iterator):
    """Iterador para percorrer as denúncias"""
    def __init__(self, denuncias):
        self._denuncias = denuncias
        self._index = 0

    def __next__(self):
        if self._index < len(self._denuncias):
            denuncia = self._denuncias[self._index]
            self._index += 1
            return {
                'id': str(denuncia.id),
                'titulo': denuncia.titulo,
                'descricao': denuncia.descricao,
                'latitude': denuncia.latitude,
                'longitude': denuncia.longitude,
                'usuario_id': str(denuncia.usuario_id)
            }
        raise StopIteration

class ListaDenuncias(Iterable):
    """Classe Iterable que armazena as denúncias"""
    def __init__(self):
        self._denuncias = []

    def carregar_denuncias(self):
        """Carrega todas as denúncias do banco de dados"""
        self._denuncias = Denuncia.query.all()

    def __iter__(self):
        return DenunciaIterator(self._denuncias)
