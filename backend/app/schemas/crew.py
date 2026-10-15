from __future__ import annotations
from pydantic import BaseModel
from typing import List, Dict, Any


class CrewProfile(BaseModel):
    name: str
    role: str
    mission: str
    status: str
    crew_id: str
    baseline: Dict[str, float]


class MeasurementPoint(BaseModel):
    timestamp: str
    type: str
    value: float
    unit: str
    source: str


class MissionEvent(BaseModel):
    timestamp: str
    title: str
    description: str
    severity: str
