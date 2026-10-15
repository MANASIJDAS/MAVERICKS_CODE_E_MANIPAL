import db from './dexieDB'
import { v4 as uuidv4 } from 'uuid'

export interface Measurement {
  id: string
  timestamp: string
  type: string
  value: number
  unit?: string
  notes?: string
  synced?: boolean
}

const DexieLib = (db as any)

export default DexieLib

// helper functions kept in services/measurementService.ts
