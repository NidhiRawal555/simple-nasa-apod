import { useState, useCallback } from 'react'
import type { ApodData, FetchStatus } from '../types'
const API_KEY = 'DGASscFDRvODCceQN8TqML41sY4QePfRRMJhXtb7'
const BASE_URL = 'https://api.nasa.gov/planetary/apod'

const MIN_DATE = '1995-06-16'

function getTodayStr(): string {
  return new Date().toLocaleDateString('en-CA').split('T')[0]
}

interface UseApodReturn {
  data: ApodData | null
  status: FetchStatus
  error: string | null
  fetchApod: (date: string) => Promise<void>
  minDate: string
  maxDate: string
}

export function useApod(): UseApodReturn {
  const [data, setData] = useState<ApodData | null>(null)
  const [status, setStatus] = useState<FetchStatus>('idle')
  const [error, setError] = useState<string | null>(null)

  const maxDate = getTodayStr()

  const fetchApod = useCallback(async (date: string) => {
    setStatus('loading')
    setError(null)
    setData(null)

    try {
      const params = new URLSearchParams({
        api_key: API_KEY,
        date,
        thumbs: 'true',
      })
      const res = await fetch(`${BASE_URL}?${params.toString()}`)

      if (!res.ok) {
        const errorBody = await res.json().catch(() => ({}))
        const msg =
          (errorBody as { msg?: string; error?: { message?: string } })?.msg ||
          (errorBody as { msg?: string; error?: { message?: string } })?.error?.message ||
          `HTTP ${res.status}: Failed to fetch data from NASA.`
        throw new Error(msg)
      }

      const json: ApodData = await res.json()
      setData(json)
      setStatus('success')
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.')
    }
  }, [])

  return { data, status, error, fetchApod, minDate: MIN_DATE, maxDate }
}
