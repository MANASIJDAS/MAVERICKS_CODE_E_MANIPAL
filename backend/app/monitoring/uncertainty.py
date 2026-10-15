from typing import List, Dict


def uncertainty_score(points: List[Dict]) -> float:
    n = len(points)
    if n == 0:
        return 1.0
    # uncertainty decreases with more samples
    score = max(0.0, 1.0 - min(0.9, n / 30.0))
    return round(score, 3)
