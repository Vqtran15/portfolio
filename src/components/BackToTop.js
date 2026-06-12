import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import * as styles from './BackToTop.module.css'

const BackToTop = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          className={styles.btn}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.25 }}
          aria-label="Back to top"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  )
}

export default BackToTop
