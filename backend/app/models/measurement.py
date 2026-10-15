from sqlalchemy import Column, String, Float, DateTime, Boolean, JSON
from sqlalchemy.sql import func
from ..database import Base

class Measurement(Base):
    __tablename__ = "measurements"

    id = Column(String, primary_key=True, index=True)  # UUID supplied by client
    timestamp = Column(DateTime, nullable=False, index=True)
    type = Column(String, nullable=False, index=True)
    value = Column(Float, nullable=False)
    unit = Column(String, nullable=True)
    metadata = Column(JSON, nullable=True)  # evidence, device info
    synced = Column(Boolean, default=False)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())
