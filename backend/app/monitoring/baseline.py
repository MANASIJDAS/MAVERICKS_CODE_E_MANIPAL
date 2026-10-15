from typing import List, Tuple
import numpy as np


def median_mad(values: List[float]) -> Tuple[float, float]:
    arr = np.array(values, dtype=float)
    med = float(np.median(arr))
    mad = float(np.median(np.abs(arr - med)))
    # scale MAD to be comparable to std (approximate)
    scaled_mad = mad * 1.4826
    return med, scaled_mad


def ewma(values: List[float], alpha: float = 0.3) -> float:
    if not values:
        return 0.0
    s = values[0]
    for v in values[1:]:
        s = alpha * v + (1 - alpha) * s
    return float(s)
