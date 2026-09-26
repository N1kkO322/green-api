import { useEffect, useState } from 'react'
import type { Credentials } from '../types/chat'

const KEY = 'greenApi'

export function useCredentials() {
  const [credentials, setCredentials] = useState<Credentials | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const raw = localStorage.getItem(KEY)
    if (raw) {
      try {
        setCredentials(JSON.parse(raw))
      } catch {
        localStorage.removeItem(KEY)
      }
    }
    setLoaded(true)
  }, [])

  const save = (creds: Credentials) => {
    localStorage.setItem(KEY, JSON.stringify(creds))
    setCredentials(creds)
  }

  const clear = () => {
    localStorage.removeItem(KEY)
    setCredentials(null)
  }

  return { credentials, loaded, save, clear }
}
