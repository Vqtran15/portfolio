import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SECTION_ICONS = {
  about:    '✏️',
  projects: '☕',
  contact:  '✉️',
}

const SectionCursor = () => {
  const [pos, setPos]   = useState({ x: -200, y: -200 })
  const [icon, setIcon] = useState(null)

  useEffect(() => {
    const onMove = (e) => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useEffect(() => {
    const sections = Object.keys(SECTION_ICONS)

    const getActive = () => {
      const mid = window.innerHeight / 2
      let closest = null
      let closestDist = Infinity
      sections.forEach(id => {
        const el = document.getElementById(id)
        if (!el) return
        const rect = el.getBoundingClientRect()
        const dist = Math.abs(rect.top + rect.height / 2 - mid)
        if (dist < closestDist) { closestDist = dist; closest = id }
      })
      // Only set icon if that section is actually visible
      const activeEl = closest ? document.getElementById(closest) : null
      if (activeEl) {
        const rect = activeEl.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setIcon(SECTION_ICONS[closest] || null)
        } else {
          setIcon(null)
        }
      }
    }

    window.addEventListener('scroll', getActive, { passive: true })
    getActive()
    return () => window.removeEventListener('scroll', getActive)
  }, [])

  return (
    <AnimatePresence>
      {icon && (
        <motion.div
          key={icon}
          style={{
            position: 'fixed',
            left: pos.x + 10,
            top: pos.y - 10,
            pointerEvents: 'none',
            zIndex: 9998,
            fontSize: '1.3rem',
            userSelect: 'none',
            lineHeight: 1,
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.2 }}
        >
          {icon}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default SectionCursor
