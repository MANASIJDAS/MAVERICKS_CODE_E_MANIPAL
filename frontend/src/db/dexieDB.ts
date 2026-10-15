import Dexie from 'dexie'

export interface Measurement {
  id: string
  timestamp: string
  type: string
  value: number
  unit?: string
  notes?: string
  synced?: boolean
}

const db = new Dexie('CrewSignalDB')

db.version(1).stores({ measurements: 'id,timestamp,type, synched' })

export default db
