import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import * as styles from './Hero.module.css'
import useScramble from '../hooks/useScramble'

// Cycling greetings
const GREETINGS = ['Hi there,', 'Hey friend,', 'Hello,']

const POPUP_LINES = [
  'Deploying enterprise solutions by day',
  'Building digital products by night',
]

// ── Hero ───────────────────────────────────────────────────────
const Hero = () => {

  const [nameHovered, setNameHovered] = useState(false)
  const scrambledName = useScramble(nameHovered ? 'An implementation consultant' : 'Vuong Tran', 700, 0)

  const [burst, setBurst] = useState(false)
  const [showTagline, setShowTagline] = useState(false)
  const taglineTimerRef = useRef(null)

  const handleAvatarClick = () => {
    setBurst(true)
    setTimeout(() => setBurst(false), 700)
    clearTimeout(taglineTimerRef.current)
    setShowTagline(true)
    taglineTimerRef.current = setTimeout(() => setShowTagline(false), 4000)
  }

  useEffect(() => () => clearTimeout(taglineTimerRef.current), [])

  const BURST_COLORS = ['#D4521A', '#C9A040', '#F07B3A', '#6A9A5F', '#F5EFE0', '#D4521A', '#C9A040', '#F07B3A']

  // Cycling greeting
  const [greetIdx, setGreetIdx] = useState(0)
  const [greetVisible, setGreetVisible] = useState(true)
  useEffect(() => {
    if (greetIdx >= GREETINGS.length - 1) return
    const show = setTimeout(() => setGreetVisible(false), 900)
    const next = setTimeout(() => {
      setGreetIdx(i => i + 1)
      setGreetVisible(true)
    }, 1200)
    return () => { clearTimeout(show); clearTimeout(next) }
  }, [greetIdx])

  return (
    <section id="home" className={styles.hero}>

      {/* Gradient overlay — keeps left-side text legible */}
      <div className={styles.heroOverlay} aria-hidden="true" />

      {/* ── Content ── */}
      <div className={styles.content}>
        <motion.p
          className={styles.greeting}
          key={greetIdx}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: greetVisible ? 1 : 0, y: greetVisible ? 0 : -8 }}
          transition={{ duration: 0.25 }}
        >
          {GREETINGS[greetIdx]} I'm
        </motion.p>

        <div className={styles.nameWrapper}>
          <motion.div
            className={styles.revealBlock}
            initial={{ x: '-100%' }}
            animate={{ x: '101%' }}
            transition={{ duration: 0.65, delay: 0.35, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.h1
            className={styles.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, scale: nameHovered ? 0.38 : 1 }}
            transition={{
              opacity: { delay: 0.62, duration: 0.01 },
              scale: { duration: 0.35, ease: [0.25, 0, 0.5, 1] },
            }}
            onMouseEnter={() => setNameHovered(true)}
            onMouseLeave={() => setNameHovered(false)}
            style={{ cursor: 'default', transformOrigin: 'left center', whiteSpace: 'nowrap' }}
          >
            {scrambledName}
          </motion.h1>
        </div>

        <motion.div
          className={styles.ctas}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
        >
          <a id="hero-cta-view-work" href="#projects" className={styles.btnPrimary}>View My Work</a>
          <a
            id="hero-cta-about-me"
            href="#about"
            className={styles.btnSecondary}
            onClick={(e) => {
              e.preventDefault()
              const el = document.getElementById('about')
              if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' })
            }}
          >About Me</a>
        </motion.div>
      </div>

      {/* ── Avatar ── */}
      <div className={styles.visual}>
        <div style={{ position: 'relative', display: 'inline-flex' }}>
          <motion.div
            className={styles.avatarRing}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: 'backOut' }}
            whileTap={{ scale: 1.08 }}
            onClick={handleAvatarClick}
            style={{ cursor: 'pointer' }}
          >
            <div className={styles.avatar}>
              <img src="/images/headshot.jpg" alt="Vuong Tran" className={styles.avatarImg} />
            </div>
          </motion.div>

          {/* Burst particles */}
          <AnimatePresence>
            {burst && [...Array(8)].map((_, i) => {
              const angle = (i * 45 * Math.PI) / 180
              const dist = 110
              return (
                <motion.div
                  key={i}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    background: BURST_COLORS[i],
                    pointerEvents: 'none',
                  }}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{
                    x: Math.cos(angle) * dist,
                    y: Math.sin(angle) * dist,
                    opacity: 0,
                    scale: 0.3,
                  }}
                  exit={{}}
                  transition={{ duration: 0.65, ease: 'easeOut' }}
                />
              )
            })}
          </AnimatePresence>

          {/* Click-to-reveal tagline */}
          <div style={{ position: 'absolute', top: 'calc(100% + 1.25rem)', left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none', width: 'max-content' }}>
            <AnimatePresence>
              {showTagline && (
                <motion.div
                  key="tagline-popup"
                  exit={{ opacity: 0, y: 10, transition: { duration: 0.5, ease: 'easeIn' } }}
                  style={{ background: 'rgba(30, 26, 20, 0.78)', padding: '0.55em 0.9em', borderRadius: '4px' }}
                >
                  {POPUP_LINES.map((line, li) => {
                    const lineStartIdx = POPUP_LINES.slice(0, li).reduce((s, l) => s + l.split(' ').length, 0)
                    return (
                      <p key={li} style={{ margin: li === 0 ? '0 0 0.15em' : '0', textAlign: 'center', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0 0.3em' }}>
                        {line.split(' ').map((word, wi) => (
                          <motion.span
                            key={wi}
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: (lineStartIdx + wi) * 0.07, duration: 0.35, ease: [0.25, 0, 0.5, 1] }}
                            style={{ display: 'inline-block', fontFamily: "'Courier New', Courier, monospace", fontSize: '0.95rem', fontWeight: 400, color: '#F5EFE0', letterSpacing: '0.02em', lineHeight: 1.65 }}
                          >
                            {word}
                          </motion.span>
                        ))}
                      </p>
                    )
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

    </section>
  )
}

export default Hero
