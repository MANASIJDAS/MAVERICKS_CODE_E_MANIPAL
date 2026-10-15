from typing import List, Dict


def evidence_for_flags(flags: List[Dict]) -> List[Dict]:
    out = []
    for f in flags:
        reasons = []
        if abs(f['zscore']) > 2.5:
            reasons.append('value deviates from baseline')
        if f['persistent']:
            reasons.append('change persisted across multiple measurements')
        if abs(f['slope_per_day']) > 3.0:
            reasons.append('rapid trend change')
        out.append({'timestamp': f['timestamp'], 'evidence': reasons, 'confidence_score': _confidence_from_reasons(reasons)})
    return out


def _confidence_from_reasons(reasons: List[str]) -> float:
    if not reasons:
        return 0.0
    score = min(1.0, 0.4 * len(reasons))
    return round(score, 3)
