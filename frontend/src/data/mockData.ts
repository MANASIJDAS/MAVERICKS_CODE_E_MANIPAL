export const crewProfile = {
  name: 'Astra Vega',
  role: 'Flight Engineer',
  mission: 'ISS-12 Deep Habitat Simulation',
  status: 'Nominal',
  crewId: 'CV-2048'
}

export const summaryMetrics = [
  { label: 'Resting HR', value: '64 bpm', delta: '-3.1%', status: 'stable' },
  { label: 'SpO2', value: '98%', delta: '+0.4%', status: 'stable' },
  { label: 'Sleep', value: '7.8 h', delta: '-1.2 h', status: 'watch' },
  { label: 'Activity', value: '43%', delta: '+6.1%', status: 'stable' }
]

export const trendSeries = [
  { day: 'D-9', hr: 72, spo2: 97.6, sleep: 7.8 },
  { day: 'D-8', hr: 71, spo2: 97.8, sleep: 8.1 },
  { day: 'D-7', hr: 74, spo2: 97.4, sleep: 6.9 },
  { day: 'D-6', hr: 69, spo2: 98.1, sleep: 8.2 },
  { day: 'D-5', hr: 68, spo2: 98.1, sleep: 8.5 },
  { day: 'D-4', hr: 70, spo2: 97.9, sleep: 7.4 },
  { day: 'D-3', hr: 73, spo2: 97.5, sleep: 7.1 },
  { day: 'D-2', hr: 77, spo2: 97.3, sleep: 6.4 },
  { day: 'D-1', hr: 75, spo2: 97.6, sleep: 6.8 },
  { day: 'D-0', hr: 72, spo2: 98.0, sleep: 7.2 }
]

export const alerts = [
  {
    level: 'watch',
    title: 'Sleep debt converging',
    evidence: 'Sleep has trended 1.1 hours below personal baseline across three consecutive nights.',
    confidence: 0.78
  },
  {
    level: 'review',
    title: 'Moderate HR elevation',
    evidence: 'Resting HR remains elevated 7 bpm above baseline during low-motion periods.',
    confidence: 0.71
  },
  {
    level: 'insufficient',
    title: 'Environmental stress unclear',
    evidence: 'Habitat CO2 and sound remain within nominal range; no conclusive signal yet.',
    confidence: 0.42
  }
]
