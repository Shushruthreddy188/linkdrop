from sqlalchemy import Column, String, Text, DateTime, Boolean
from datetime import datetime, timezone
from .database import Base

class Note(Base):
    __tablename__ = "notes"

    id = Column(String, primary_key=True, index=True)
    content = Column(Text, nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    expires_at = Column(DateTime, nullable=False)
    is_expired = Column(Boolean, default=False)
    view_once = Column(Boolean, default=False)
    viewed = Column(Boolean, default=False)