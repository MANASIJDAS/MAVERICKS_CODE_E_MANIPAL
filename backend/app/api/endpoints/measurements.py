from fastapi import APIRouter, HTTPException, status
from typing import List
from pydantic import BaseModel
from ..schemas.measurement import MeasurementCreate, MeasurementOut
from ...services.measurement_service import save_measurement, list_unsynced, set_synced

router = APIRouter(prefix="/measurements", tags=["measurements"])

@router.post("/", response_model=MeasurementOut, status_code=status.HTTP_201_CREATED)
def create_measurement_endpoint(payload: MeasurementCreate):
    try:
        m = save_measurement(payload)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    return {
        "id": m.id,
        "timestamp": m.timestamp,
        "type": m.type,
        "value": m.value,
        "unit": m.unit,
        "metadata": m.metadata,
        "synced": m.synced,
        "created_at": m.created_at,
        "updated_at": m.updated_at
    }

@router.get("/unsynced", response_model=List[MeasurementOut])
def get_unsynced_endpoint(limit: int = 100):
    rows = list_unsynced(limit)
    return [
        {
            "id": r.id,
            "timestamp": r.timestamp,
            "type": r.type,
            "value": r.value,
            "unit": r.unit,
            "metadata": r.metadata,
            "synced": r.synced,
            "created_at": r.created_at,
            "updated_at": r.updated_at
        }
        for r in rows
    ]

class SyncPayload(BaseModel):
    ids: List[str]

@router.post("/mark_synced", status_code=204)
def mark_synced_endpoint(payload: SyncPayload):
    set_synced(payload.ids)
    return
