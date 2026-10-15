import { useEffect, useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export async function fetchCrewProfile() {
  const response = await fetch(`${API_URL}/crew/profile`)
  if (!response.ok) throw new Error('Failed to fetch crew profile')
  return response.json()
}

export async function fetchCrewStream() {
  const response = await fetch(`${API_URL}/crew/stream`)
  if (!response.ok) throw new Error('Failed to fetch crew stream')
  return response.json()
}

export function useCrewProfile() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchCrewProfile()
      .then(setData)
      .catch(() => setError('Profile unavailable'))
      .finally(() => setLoading(false))
  }, [])

  return { data, loading, error }
}
