export function evidenceForFlags(flags: any[]) {
  return flags.map((f) => {
    const reasons: string[] = []
    if (Math.abs(f.zscore) > 2.5) reasons.push('value deviates from baseline')
    if (f.persistent) reasons.push('change persisted across multiple measurements')
    if (Math.abs(f.slope_per_day) > 3.0) reasons.push('rapid trend change')
    const confidence = Math.min(1, 0.4 * reasons.length)
    return { timestamp: f.timestamp, evidence: reasons, confidence_score: Math.round(confidence * 100) / 100 }
  })
}
