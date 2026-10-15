import { Measurement } from './measurementService'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export async function postMeasurement(m: Measurement) {
  const resp = await fetch(`${API_URL}/measurements/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(m)
  })
  if (!resp.ok) throw new Error(`post failed ${resp.status}`)
  return await resp.json()
}

export async function markSyncedOnServer(ids: string[]) {
  const resp = await fetch(`${API_URL}/measurements/mark_synced`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ids })
  })
  if (!resp.ok) throw new Error(`mark_synced failed ${resp.status}`)
  return
}
