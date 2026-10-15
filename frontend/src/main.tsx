import { startAutoSync } from './sync/syncEngine'
import './styles/index.css'
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

import('./registerServiceWorker')

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// start background sync (non-blocking)
startAutoSync().catch(() => {})
