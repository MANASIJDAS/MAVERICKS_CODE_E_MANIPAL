import React, { useState } from 'react'
import { syncOnce } from '../sync/syncEngine'

export default function SyncButton() {
  const [status, setStatus] = useState<string>('idle')

  const onClick = async () => {
    setStatus('syncing')
    try {
      const res = await syncOnce()
      setStatus(`synced:${res.synced} errors:${res.errors}`)
    } catch (e) {
      setStatus('error')
    }
    setTimeout(() => setStatus('idle'), 4000)
  }

  return (
    <button onClick={onClick} className="px-3 py-2 bg-indigo-600 text-white rounded">
      Sync Now ({status})
    </button>
  )
}
