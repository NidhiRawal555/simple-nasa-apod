import { useEffect } from 'react'
import { useApod } from './hooks/useApod'
import DatePicker from './components/DatePicker'
import ApodCard from './components/ApodCard'
import styles from './App.module.css'

export default function App() {
  const { data, status, error, fetchApod, minDate, maxDate } = useApod()

  useEffect(() => {
    fetchApod(maxDate)
  }, [fetchApod, maxDate])

  return (
    <div className={styles.layout}>
      <a href="#main-content" className={styles.skipLink}>
        Skip to main content
      </a>

      <header className={styles.header} role="banner">
        <div className={styles.headerInner}>
          <div className={styles.logo} aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true" focusable="false">
              <circle cx="14" cy="14" r="13" stroke="#4f8ef7" strokeWidth="1.5" fill="none" />
              <circle cx="14" cy="14" r="4" fill="#4f8ef7" />
              <circle cx="14" cy="4.5" r="1.5" fill="#a8c4fd" opacity="0.7" />
              <circle cx="23.5" cy="9" r="1" fill="#a8c4fd" opacity="0.5" />
              <circle cx="4.5" cy="9" r="1" fill="#a8c4fd" opacity="0.5" />
              <circle cx="23.5" cy="19" r="1.5" fill="#a8c4fd" opacity="0.4" />
              <circle cx="4.5" cy="19" r="1" fill="#a8c4fd" opacity="0.3" />
            </svg>
          </div>
          <div>
            <h1 className={styles.siteTitle}>NASA APOD Explorer</h1>
            <p className={styles.siteSubtitle}>Astronomy Picture of the Day</p>
          </div>
        </div>
      </header>

      <main id="main-content" className={styles.main}>
        <div className={styles.container}>
          <DatePicker
            onSubmit={fetchApod}
            isLoading={status === 'loading'}
            minDate={minDate}
            maxDate={maxDate}
          />

          <div aria-live="polite" aria-atomic="true" className={styles.resultRegion}>
            {status === 'loading' && (
              <div className={styles.loadingState} role="status">
                <div className={styles.loadingOrb} aria-hidden="true" />
                <p className={styles.loadingText}>Fetching from NASA…</p>
              </div>
            )}

            {status === 'error' && error && (
              <div className={styles.errorState} role="alert">
                <p className={styles.errorTitle}>Something went wrong</p>
                <p className={styles.errorMsg}>{error}</p>
                <p className={styles.errorHint}>
                  The NASA DEMO_KEY allows 30 requests/hour per IP. Try again shortly.
                </p>
              </div>
            )}

            {status === 'success' && data && (
              <ApodCard data={data} />
            )}
          </div>
        </div>
      </main>

      <footer className={styles.footer} role="contentinfo">
        <p>
          Data provided by{' '}
          <a
            href="https://api.nasa.gov/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="NASA APIs (opens in a new tab)"
          >
            NASA APIs
          </a>
          {' '}· Built with React &amp; TypeScript
        </p>
      </footer>
    </div>
  )
}
