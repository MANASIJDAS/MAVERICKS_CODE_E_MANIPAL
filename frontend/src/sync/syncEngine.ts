import db, { Measurement } from '../db/dexieDB'
import { getUnsyncedMeasurements, markMeasurementsSynced } from '../services/measurementService'
import { postMeasurement, markSyncedOnServer } from '../services/apiClient'

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export async function syncOnce(): Promise<{ synced: number; errors: number }> {
  const unsynced = await getUnsyncedMeasurements()
  if (!unsynced || unsynced.length === 0) return { synced: 0, errors: 0 }

  let syncedCount = 0
  let errorCount = 0
  const idsToMark: string[] = []

  for (const m of unsynced) {
    let attempt = 0
    let success = false
    while (attempt < 4 && !success) {
      try {
        await postMeasurement(m)
        idsToMark.push(m.id)
        success = true
        syncedCount += 1
      } catch (err) {
        attempt += 1
        errorCount += 1
        const backoff = Math.pow(2, attempt) * 250
        await sleep(backoff)
      }
    }
  }

  if (idsToMark.length) {
    try {
      await markSyncedOnServer(idsToMark)
      await markMeasurementsSynced(idsToMark)
    } catch (err) {
      // best-effort local mark; if server call fails, don't mark
    }
  }

  return { synced: syncedCount, errors: errorCount }
}

export async function startAutoSync(intervalMs = 30000) {
  while (true) {
    try {
      await syncOnce()
    } catch (e) {
      // noop
    }
    await sleep(intervalMs)
  }
}
