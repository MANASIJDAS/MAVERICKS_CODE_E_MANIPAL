from datetime import datetime
from ..models.measurement import Measurement as MeasurementModel
from ..schemas.measurement import MeasurementCreate
from ..database import SessionLocal
from ..repositories.measurement_repository import create_measurement, get_unsynced, mark_synced


def save_measurement(payload: MeasurementCreate):
    db = SessionLocal()
    try:
        m = MeasurementModel(
            id=payload.id,
            timestamp=payload.timestamp,
            type=payload.type,
            value=payload.value,
            unit=payload.unit,
            metadata=payload.metadata,
            synced=False
        )
        return create_measurement(db, m)
    finally:
        db.close()


def list_unsynced(limit: int = 100):
    db = SessionLocal()
    try:
        return get_unsynced(db, limit)
    finally:
        db.close()


def set_synced(ids):
    db = SessionLocal()
    try:
        mark_synced(db, ids)
    finally:
        db.close()
