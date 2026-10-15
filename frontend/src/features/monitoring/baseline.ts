export function medianMad(values: number[]): { median: number; mad: number } {
  const sorted = [...values].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)
  const median = sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid]
  const absDev = values.map((v) => Math.abs(v - median))
  const mad = (() => {
    const s = [...absDev].sort((a, b) => a - b)
    const m = Math.floor(s.length / 2)
    return s.length % 2 === 0 ? (s[m - 1] + s[m]) / 2 : s[m]
  })()
  const scaled = mad * 1.4826
  return { median, mad: scaled }
}

export function ewma(values: number[], alpha = 0.3): number {
  if (!values || values.length === 0) return 0
  let s = values[0]
  for (let i = 1; i < values.length; i++) s = alpha * values[i] + (1 - alpha) * s
  return s
}
