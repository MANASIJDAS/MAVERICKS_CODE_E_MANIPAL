from typing import List, Tuple, Dict
import numpy as np
from datetime import datetime


def linear_slope(points: List[Dict]) -> Tuple[float, float]:
    # points: list of {'timestamp': iso, 'value': float}
    if not points:
        return 0.0, 0.0
    xs = np.array([_to_epoch(p['timestamp']) for p in points], dtype=float)
    ys = np.array([p['value'] for p in points], dtype=float)
    if len(xs) < 2:
        return 0.0, 0.0
    # normalize x to days for interpretable slope
    xs = (xs - xs[0]) / 86400.0
    A = np.vstack([xs, np.ones_like(xs)]).T
    m, c = np.linalg.lstsq(A, ys, rcond=None)[0]
    # m is change per day
    return float(m), float(c)


def _to_epoch(ts_iso: str) -> float:
    dt = datetime.fromisoformat(ts_iso)
    return dt.timestamp()
