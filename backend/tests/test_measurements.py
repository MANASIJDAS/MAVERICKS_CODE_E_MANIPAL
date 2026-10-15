import pytest
from fastapi.testclient import TestClient
from backend.app.main import app
import uuid
from datetime import datetime, timezone

client = TestClient(app)

def test_create_and_idempotency():
    payload = {
        "id": str(uuid.uuid4()),
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "type": "heart_rate",
        "value": 72.5,
        "unit": "bpm",
        "metadata": {"sim": True}
    }
    r1 = client.post("/measurements/", json=payload)
    assert r1.status_code == 201
    data1 = r1.json()
    assert data1["id"] == payload["id"]

    r2 = client.post("/measurements/", json=payload)
    assert r2.status_code in (200, 201)
    data2 = r2.json()
    assert data2["id"] == payload["id"]
