from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, Text, DateTime
from ..database import db
from sqlalchemy.dialects.postgresql import UUID
import uuid
from datetime import datetime

class PontoDeColeta(db.Model):
    __tablename__ = 'pontos_de_coleta'
    
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    nome: Mapped[str] = mapped_column(String(255), nullable=False)
    endereco: Mapped[str] = mapped_column(String(255), nullable=False)
    bairro: Mapped[str] = mapped_column(String(100), nullable=False)
    cidade: Mapped[str] = mapped_column(String(100), nullable=False)
    estado: Mapped[str] = mapped_column(String(2), nullable=False)  
    cep: Mapped[str] = mapped_column(String(10), nullable=True)
    tipos_de_residuos: Mapped[str] = mapped_column(Text, nullable=False)
    data_cadastro: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"<PontoDeColeta {self.id} - {self.nome} - {self.endereco}>"
