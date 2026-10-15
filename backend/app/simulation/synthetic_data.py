from __future__ import annotations
from datetime import datetime, timedelta, timezone
from typing import List, Dict, Any


def generate_crew_profile() -> Dict[str, Any]:
    return {
        'name': 'Astra Vega',
        'role': 'Flight Engineer',
        'mission': 'ISS-12 Deep Habitat Simulation',
        'status': 'Nominal',
        'crew_id': 'CV-2048',
        'baseline': {
            'heart_rate': 72.0,
            'blood_pressure': 120.0,
            'oxygen_saturation': 98.0,
            'sleep_hours': 8.0,
            'activity_score': 52.0,
        }
    }


def generate_measurement_stream(days: int = 10) -> List[Dict[str, Any]]:
    now = datetime.now(timezone.utc)
    data: List[Dict[str, Any]] = []
    for i in range(days):
        ts = now - timedelta(days=days - 1 - i)
        data.append({
            'timestamp': ts.isoformat(),
            'type': 'heart_rate',
            'value': round(72 + (i % 5) * 1.5 - (1 if i % 3 == 0 else 0), 2),
            'unit': 'bpm',
            'source': 'simulated'
        })
        data.append({
            'timestamp': ts.isoformat(),
            'type': 'oxygen_saturation',
            'value': round(98.0 - (0.2 if i % 4 == 0 else 0), 2),
            'unit': '%',
            'source': 'simulated'
        })
        data.append({
            'timestamp': ts.isoformat(),
            'type': 'sleep_hours',
            'value': round(8.1 - (0.4 if i % 2 == 0 else 0), 2),
            'unit': 'h',
            'source': 'simulated'
        })
        data.append({
            'timestamp': ts.isoformat(),
            'type': 'activity_score',
            'value': round(50 + (i % 4) * 6, 2),
            'unit': '%',
            'source': 'simulated'
        })
    return data


def generate_mission_timeline() -> List[Dict[str, Any]]:
    now = datetime.now(timezone.utc)
    return [
        {
            'timestamp': (now - timedelta(days=3)).isoformat(),
            'title': 'Sleep debt acceleration',
            'description': 'Sleep dropped below baseline for three consecutive nights.',
            'severity': 'watch'
        },
        {
            'timestamp': (now - timedelta(days=2)).isoformat(),
            'title': 'Resting HR increase',
            'description': 'Measured resting rate increased by ~7% across the low-activity window.',
            'severity': 'review'
        },
        {
            'timestamp': (now - timedelta(days=1)).isoformat(),
            'title': 'Environmental status check',
            'description': 'Habitat conditions remained nominal; no conclusive environment trigger identified.',
            'severity': 'insufficient'
        }
    ]
