from pydantic import BaseModel, Field
from typing import Optional, Dict
from datetime import datetime

class MeasurementCreate(BaseModel):
    id: str = Field(..., description="UUID assigned by client for idempotency")
    timestamp: datetime
    type: str
    value: float
    unit: Optional[str] = None
    metadata: Optional[Dict] = None

class MeasurementOut(MeasurementCreate):
    synced: bool
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
