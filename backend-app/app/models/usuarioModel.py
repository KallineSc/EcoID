from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String
from ..database import db
from sqlalchemy.dialects.postgresql import UUID
import uuid

class Usuario(db.Model):
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    nome: Mapped[str] = mapped_column(String(50), nullable=False)
    email: Mapped[str] = mapped_column(String(255), nullable=False, unique=True)
    senha: Mapped[str] = mapped_column(String(255), nullable=True)
    