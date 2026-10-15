import { analyzeStream } from '../../features/monitoring'

export async function runMonitoringOnMock() {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'
  const resp = await fetch(`${API_URL}/crew/stream`)
  const data = await resp.json()
  // transform to {timestamp, value} per metric; pick heart_rate for demo
  const hr = data.filter((d: any) => d.type === 'heart_rate').map((d: any) => ({ timestamp: d.timestamp, value: d.value }))
  return analyzeStream(hr)
}
