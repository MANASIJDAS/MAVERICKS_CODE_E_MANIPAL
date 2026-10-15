import React from 'react'
import SyncButton from './components/SyncButton'

export default function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-gray-100 flex items-center justify-center">
      <div className="max-w-4xl w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">CrewSignal — Initial Scaffold</h1>
          <SyncButton />
        </div>
        <p className="mb-6">This is a minimal frontend that displays the repository root DashboardBG.jpg served at /DashboardBG.jpg.</p>
        <img src="/DashboardBG.jpg" alt="Dashboard background" className="w-full rounded shadow" />
      </div>
    </div>
  )
}
