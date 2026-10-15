export function linearSlope(points: { timestamp: string; value: number }[]): { slope: number; intercept: number } {
  if (!points || points.length < 2) return { slope: 0, intercept: 0 }
  const xs = points.map((p) => new Date(p.timestamp).getTime() / 86400000)
  const ys = points.map((p) => p.value)
  const x0 = xs[0]
  const xn = xs.map((x) => x - x0)
  const n = xn.length
  const sumX = xn.reduce((a, b) => a + b, 0)
  const sumY = ys.reduce((a, b) => a + b, 0)
  const sumXY = xn.reduce((a, b, i) => a + b * ys[i], 0)
  const sumXX = xn.reduce((a, b) => a + b * b, 0)
  const denom = n * sumXX - sumX * sumX
  if (denom === 0) return { slope: 0, intercept: 0 }
  const slope = (n * sumXY - sumX * sumY) / denom
  const intercept = (sumY - slope * sumX) / n
  return { slope, intercept }
}
