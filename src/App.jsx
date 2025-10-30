import React, { useEffect, useState } from 'react'

function getTimeLeft() {
  // target: Nov 5, 2025 at 12:00 PM local time
  const target = new Date(2025, 10, 5, 12, 0, 0).getTime() // month is 0-based -> 10 = November
  const now = Date.now()
  const diff = target - now
  if (diff <= 0) return null

  let seconds = Math.floor(diff / 1000)
  const days = Math.floor(seconds / 86400)
  seconds %= 86400
  const hours = Math.floor(seconds / 3600)
  seconds %= 3600
  const minutes = Math.floor(seconds / 60)
  const secs = seconds % 60

  return { days, hours, minutes, seconds: secs }
}

export default function App() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft())

  useEffect(() => {
    const id = setInterval(() => {
      setTimeLeft(getTimeLeft())
    }, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="container">
        <h1>No Screen Until</h1>
      {timeLeft ? (
        <div className="timer">
          <div className="segment">
            <div className="number">{timeLeft.days}</div>
            <div className="label">Days</div>
          </div>
          <div className="segment">
            <div className="number">{String(timeLeft.hours).padStart(2, '0')}</div>
            <div className="label">Hours</div>
          </div>
          <div className="segment">
            <div className="number">{String(timeLeft.minutes).padStart(2, '0')}</div>
            <div className="label">Minutes</div>
          </div>
          <div className="segment">
            <div className="number">{String(timeLeft.seconds).padStart(2, '0')}</div>
            <div className="label">Seconds</div>
          </div>
        </div>
      ) : (
        <p className="started">The target date/time has passed.</p>
      )}
    </div>
  )
}
