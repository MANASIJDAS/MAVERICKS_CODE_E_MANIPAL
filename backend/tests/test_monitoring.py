import pytest
from backend.app.monitoring.baseline import median_mad, ewma
from backend.app.monitoring.trend_analysis import linear_slope
from backend.app.monitoring.anomaly_detection import detect_anomalies
from datetime import datetime, timedelta, timezone


def make_series(n=10, base=70, noise=1.0):
    now = datetime.now(timezone.utc)
    pts = []
    for i in range(n):
        ts = (now - timedelta(days=n - 1 - i)).isoformat()
        val = base + ((i // 3) * 2) + (noise * ((i % 2) - 0.5))
        pts.append({'timestamp': ts, 'value': val})
    return pts


def test_baseline_mad():
    vals = [60, 61, 62, 100, 63]
    med, mad = median_mad(vals)
    assert round(med, 1) == 62.0
    assert mad > 0


def test_trend_slope():
    now = datetime.now(timezone.utc)
    pts = [{'timestamp': (now - timedelta(days=2)).isoformat(), 'value': 70},
           {'timestamp': (now - timedelta(days=1)).isoformat(), 'value': 72},
           {'timestamp': now.isoformat(), 'value': 74}]
    slope, intercept = linear_slope(pts)
    assert slope > 0


def test_detect_anomalies():
    pts = make_series(n=12, base=70)
    flags = detect_anomalies(pts, window=5, z_thresh=1.5, persistence=2)
    assert len(flags) == len(pts)
