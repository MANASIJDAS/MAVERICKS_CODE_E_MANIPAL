import React from 'react'

export default function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-gray-100 flex items-center justify-center">
      <div className="max-w-4xl w-full p-6">
        <h1 className="text-3xl font-bold mb-4">CrewSignal — Initial Scaffold</h1>
        <p className="mb-6">This is a minimal frontend that displays the repository root DashboardBG.jpg served at /DashboardBG.jpg.</p>
        <img src="/DashboardBG.jpg" alt="Dashboard background" className="w-full rounded shadow" />
      </div>
    </div>
  )
}
