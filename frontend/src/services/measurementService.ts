import db, { Measurement } from '../db/dexieDB'
import { v4 as uuidv4 } from 'uuid'

export async function addMeasurement(payload: Omit<Measurement, 'id' | 'synced'>) {
  const m: Measurement = { ...payload, id: uuidv4(), synced: false }
  await db.table('measurements').add(m)
  return m
}

export async function getUnsyncedMeasurements() {
  return await db.table('measurements').where('synced').equals(false).toArray()
}

export async function markMeasurementsSynced(ids: string[]) {
  await Promise.all(ids.map(id => db.table('measurements').update(id, { synced: true })))
}
