import React, { useEffect, useState, useRef } from 'react'
import * as styles from './CursorTrailer.module.css'

const LIFETIME = 600
const COLORS = ['#D4521A', '#C9A040', '#F07B3A', '#6A9A5F']

const CursorTrailer = () => {
  const [particles, setParticles] = useState([])
  const idRef = useRef(0)

  useEffect(() => {
    const onMove = (e) => {
      const id = idRef.current++
      const color = COLORS[id % COLORS.length]
      const size = 4 + Math.random() * 4
      setParticles(prev => [
        ...prev.slice(-24),
        { id, x: e.clientX, y: e.clientY, color, size, born: Date.now() }
      ])
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now()
      setParticles(prev => prev.filter(p => now - p.born < LIFETIME))
    }, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={styles.container} aria-hidden="true">
      {particles.map(p => (
        <div
          key={p.id}
          className={styles.particle}
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            background: p.color,
          }}
        />
      ))}
    </div>
  )
}

export default CursorTrailer
