from typing import List, Dict, Tuple
from .baseline import median_mad
from .trend_analysis import linear_slope


def detect_anomalies(points: List[Dict], window: int = 7, z_thresh: float = 2.5, persistence: int = 3):
    # points assumed sorted by timestamp ascending
    res = []
    values = [p['value'] for p in points]
    med, mad = median_mad(values[-max(window, 1):])

    # compute z-scores
    zscores = []
    for v in values:
        if mad <= 0:
            z = 0.0
        else:
            z = (v - med) / mad
        zscores.append(z)

    # flag points where z > z_thresh
    flags = [abs(z) > z_thresh for z in zscores]

    # apply persistence: look for consecutive flags of length >= persistence
    for i in range(len(points)):
        start = max(0, i - persistence + 1)
        window_flags = flags[start:i+1]
        persistent = all(window_flags) and len(window_flags) >= persistence
        slope, intercept = linear_slope(points[max(0, i - window + 1):i+1])
        res.append({
            'timestamp': points[i]['timestamp'],
            'value': points[i]['value'],
            'zscore': zscores[i],
            'persistent': persistent,
            'slope_per_day': slope
        })
    return res
