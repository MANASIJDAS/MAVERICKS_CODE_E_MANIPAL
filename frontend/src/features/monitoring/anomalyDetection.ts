import { medianMad } from './baseline'
import { linearSlope } from './trendAnalysis'

export function detectAnomalies(points: { timestamp: string; value: number }[], window = 7, zThresh = 2.5, persistence = 3) {
  const values = points.map((p) => p.value)
  const tail = values.slice(Math.max(0, values.length - window))
  const { median, mad } = medianMad(tail)
  const zscores = values.map((v) => (mad <= 0 ? 0 : (v - median) / mad))
  const flags = zscores.map((z) => Math.abs(z) > zThresh)
  const res = points.map((p, i) => {
    const start = Math.max(0, i - persistence + 1)
    const windowFlags = flags.slice(start, i + 1)
    const persistent = windowFlags.length >= persistence && windowFlags.every(Boolean)
    const sliceStart = Math.max(0, i - window + 1)
    const slice = points.slice(sliceStart, i + 1)
    const { slope } = linearSlope(slice)
    return { timestamp: p.timestamp, value: p.value, zscore: zscores[i], persistent, slope_per_day: slope }
  })
  return res
}
