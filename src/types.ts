export interface ApodData {
  date: string
  title: string
  explanation: string
  url: string
  hdurl?: string
  media_type: 'image' | 'video'
  copyright?: string
  service_version: string
  thumbnail_url?: string
}

export type FetchStatus = 'idle' | 'loading' | 'success' | 'error'
