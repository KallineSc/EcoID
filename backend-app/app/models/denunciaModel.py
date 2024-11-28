from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import Float, Text, String, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from ..database import db
import uuid

class Denuncia(db.Model):
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    titulo: Mapped[str] = mapped_column(String(100), nullable=False)
    descricao: Mapped[str] = mapped_column(Text, nullable=False)
    latitude: Mapped[float] = mapped_column(Float, nullable=False)
    longitude: Mapped[float] = mapped_column(Float, nullable=False)
    usuario_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("usuario.id"), nullable=False)

    def __repr__(self):
        return f"<Denuncia {self.id} - {self.titulo}>"
