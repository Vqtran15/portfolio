import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import * as styles from './SectionNav.module.css'

const SECTIONS = ['home', 'about', 'projects', 'contact']

const SectionNav = () => {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const container = document.getElementById('h-scroll')
    if (!container) return

    const onScroll = () => {
      const mid = container.scrollLeft + window.innerWidth / 2
      let closest = 0, minDist = Infinity
      SECTIONS.forEach((id, i) => {
        const el = document.getElementById(id)
        if (!el) return
        const dist = Math.abs(el.offsetLeft + el.offsetWidth / 2 - mid)
        if (dist < minDist) { minDist = dist; closest = i }
      })
      setCurrent(closest)
    }

    container.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => container.removeEventListener('scroll', onScroll)
  }, [])

  const go = (targetId) => {
    window.dispatchEvent(new CustomEvent('section-navigate', { detail: { targetId } }))
  }

  const navigate = (dir) => {
    const idx = Math.max(0, Math.min(SECTIONS.length - 1, current + dir))
    go(SECTIONS[idx])
  }

  return (
    <>
      <AnimatePresence>
        {current > 0 && (
          <motion.button
            key="prev"
            className={`${styles.arrow} ${styles.arrowLeft}`}
            onClick={() => navigate(-1)}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.2 }}
            aria-label="Previous section"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {current < SECTIONS.length - 1 && (
          <motion.button
            key="next"
            className={`${styles.arrow} ${styles.arrowRight} ${current === 0 ? styles.arrowHint : ''}`}
            onClick={() => navigate(1)}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            transition={{ duration: 0.2 }}
            aria-label="Next section"
          >
            <motion.span
              animate={current === 0
                ? { x: [0, 6, 0], scale: [1, 1.18, 1] }
                : { x: 0, scale: 1 }
              }
              transition={current === 0
                ? { duration: 0.75, repeat: Infinity, repeatDelay: 2.5, ease: 'easeInOut', delay: 1.5 }
                : { duration: 0.3 }
              }
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </motion.span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Dot indicators */}
      <div className={styles.dots}>
        {SECTIONS.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
            onClick={() => go(SECTIONS[i])}
            aria-label={`Go to section ${i + 1}`}
          />
        ))}
      </div>
    </>
  )
}

export default SectionNav
