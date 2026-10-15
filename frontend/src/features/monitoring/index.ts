import { detectAnomalies } from '../features/monitoring/anomalyDetection'
import { evidenceForFlags } from '../features/monitoring/evidence'

export async function analyzeStream(points: { timestamp: string; value: number }[]) {
  const flags = detectAnomalies(points)
  const evidence = evidenceForFlags(flags)
  return { flags, evidence }
}
