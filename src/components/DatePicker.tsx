import { useState, type FormEvent } from 'react'
import styles from './DatePicker.module.css'

interface DatePickerProps {
  onSubmit: (date: string) => void
  isLoading: boolean
  minDate: string
  maxDate: string
}

const QUICK_DATES = [
  { label: 'Mars Rover landing', getValue: () => '2021-02-18' },
]

export default function DatePicker({ onSubmit, isLoading, minDate, maxDate }: DatePickerProps) {
  const [date, setDate] = useState<string>(maxDate)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (date) onSubmit(date)
  }

  function handleQuickDate(value: string) {
    setDate(value)
    onSubmit(value)
  }
console.log('DatePicker rendered with:', { date, isLoading, minDate, maxDate })
  return (
    <section className={styles.section} aria-label="Date selection">
      <div className={styles.card}>
        <h2 className={styles.heading}>Explore the cosmos</h2>
        <p className={styles.subtext}>
          Pick any date since June 16, 1995 — NASA's first APOD.
        </p>

        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          <div className={styles.inputRow}>
            <label htmlFor="apod-date" className={styles.label}>
              Select a date
            </label>
            <div className={styles.inputGroup}>
              <input
                id="apod-date"
                type="date"
                value={date}
                min={minDate}
                max={maxDate}
                onChange={(e) => setDate(e.target.value)}
                required
                aria-required="true"
                aria-describedby="date-hint"
                className={styles.input}
              />
              <button
                type="submit"
                disabled={isLoading || !date}
                className={styles.button}
                aria-label={isLoading ? 'Loading astronomy picture...' : 'Explore this date'}
              >
                {isLoading ? (
                  <span className={styles.spinner} aria-hidden="true" />
                ) : (
                  'Explore'
                )}
              </button>
            </div>
            <p id="date-hint" className={styles.hint}>
              Available from {minDate} to {maxDate}
            </p>
          </div>
        </form>

        <div className={styles.quickDates} role="group" aria-label="Quick date shortcuts">
          <span className={styles.quickLabel}>Jump to:</span>
          {QUICK_DATES.map(({ label, getValue }) => {
            const value = getValue()
            const isDisabled = value < minDate || value > maxDate
            return (
              <button
                key={label}
                type="button"
                onClick={() => handleQuickDate(value)}
                disabled={isLoading || isDisabled}
                className={styles.chip}
                aria-label={`Explore ${label}`}
              >
                {label}
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
