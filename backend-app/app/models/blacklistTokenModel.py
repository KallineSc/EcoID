from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String
from ..database import db
from sqlalchemy.dialects.postgresql import UUID
import uuid

class BlacklistToken(db.Model):
    __tablename__ = 'blacklist_tokens'

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    jti: Mapped[str] = mapped_column(String(255), nullable=False, unique=True)

    def __repr__(self):
        return f"<BlacklistToken {self.id} - {self.jti}>"
