import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import * as styles from './Hero.module.css'

// ── Scramble hook ──────────────────────────────────────────────
const useScramble = (finalText, duration = 1600, startDelay = 700) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@!'
  const randomChar = () => chars[Math.floor(Math.random() * chars.length)]
  const [display, setDisplay] = React.useState(finalText)

  React.useEffect(() => {
    setDisplay(finalText.split('').map(c => (c === ' ' ? ' ' : randomChar())).join(''))
    let interval
    const timeout = setTimeout(() => {
      const start = Date.now()
      interval = setInterval(() => {
        const progress = Math.min((Date.now() - start) / duration, 1)
        const resolved = Math.floor(progress * finalText.length)
        setDisplay(
          finalText.split('').map((char, i) =>
            i < resolved || char === ' ' ? char : randomChar()
          ).join('')
        )
        if (progress >= 1) {
          clearInterval(interval)
          setDisplay(finalText)
        }
      }, 45)
    }, startDelay)
    return () => {
      clearTimeout(timeout)
      clearInterval(interval)
    }
  }, [finalText])

  return display
}

// ── Pine tree path helper ──────────────────────────────────────
const pineTree = (cx, by, h, w) => {
  const th = Math.round(h * 0.15)
  const tw = Math.round(w * 0.07)
  const tt = by - th
  const trunk = `M${cx - tw},${by} L${cx + tw},${by} L${cx + tw},${tt} L${cx - tw},${tt} Z`
  const t1 = `M${cx},${Math.round(by - h * 0.42)} L${cx + Math.round(w * 0.5)},${tt} L${cx - Math.round(w * 0.5)},${tt} Z`
  const t2 = `M${cx},${Math.round(by - h * 0.63)} L${cx + Math.round(w * 0.42)},${Math.round(by - h * 0.28)} L${cx - Math.round(w * 0.42)},${Math.round(by - h * 0.28)} Z`
  const t3 = `M${cx},${Math.round(by - h)} L${cx + Math.round(w * 0.3)},${Math.round(by - h * 0.56)} L${cx - Math.round(w * 0.3)},${Math.round(by - h * 0.56)} Z`
  return `${trunk} ${t1} ${t2} ${t3}`
}

// Left half — sweep upper-left
const treesLeftPath = [
  pineTree(30,   500, 80, 48),
  pineTree(100,  500, 100, 60),
  pineTree(170,  500, 72, 44),
  pineTree(240,  500, 92, 56),
  pineTree(310,  500, 84, 52),
  pineTree(385,  500, 96, 60),
  pineTree(455,  500, 74, 46),
  pineTree(525,  500, 88, 54),
  pineTree(600,  500, 78, 48),
].join(' ')

// Right half — sweep upper-right
const treesRightPath = [
  pineTree(670,  500, 102, 62),
  pineTree(745,  500, 70, 44),
  pineTree(815,  500, 90, 56),
  pineTree(885,  500, 82, 50),
  pineTree(960,  500, 98, 60),
  pineTree(1030, 500, 76, 46),
  pineTree(1100, 500, 94, 58),
  pineTree(1170, 500, 86, 52),
].join(' ')

// ── Hero ───────────────────────────────────────────────────────
const Hero = () => {
  const { scrollY } = useScroll()
  const yTrees       = useTransform(scrollY, [0, 800], [0, -320])
  const xTreesLeft   = useTransform(scrollY, [0, 800], [0, -200])
  const xTreesRight  = useTransform(scrollY, [0, 800], [0,  200])
  const rotateLeft   = useTransform(scrollY, [0, 800], [0, -25])
  const rotateRight  = useTransform(scrollY, [0, 800], [0,  25])

  const tagline = useScramble('Principal Implementation Consultant', 1600, 700)

  return (
    <section id="home" className={styles.hero}>

      {/* ── Full-width nature scene (behind everything) ── */}
      <motion.div
        className={styles.natureScene}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.3 }}
        aria-hidden="true"
      >
        <div className={`${styles.natureLayer} ${styles.floatSun}`}>
          <svg viewBox="0 0 1200 500" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
            <circle cx="880" cy="115" r="95" fill="#C9A040" opacity="0.85" />
          </svg>
        </div>

        <div className={styles.natureLayer}>
          <svg viewBox="0 0 1200 500" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
            <path
              d="M0,308 L100,188 L200,238 L320,152 L440,208 L560,128 L680,182 L800,102 L920,160 L1040,115 L1160,148 L1200,138 L1200,500 L0,500 Z"
              fill="#C5D9C0"
            />
          </svg>
        </div>

        <div className={styles.natureLayer}>
          <svg viewBox="0 0 1200 500" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
            <path
              d="M0,372 L128,265 L258,312 L398,245 L528,290 L658,225 L788,265 L918,208 L1048,250 L1178,225 L1200,232 L1200,500 L0,500 Z"
              fill="#6A9A5F"
            />
          </svg>
        </div>

        <div className={styles.natureLayer}>
          <svg viewBox="0 0 1200 500" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
            <path
              d="M0,425 L152,322 L308,368 L462,302 L618,350 L772,292 L928,332 L1082,285 L1200,318 L1200,500 L0,500 Z"
              fill="#3D6B35"
            />
          </svg>
        </div>

        <motion.div
          style={{ y: yTrees, x: xTreesLeft, rotate: rotateLeft }}
          className={styles.natureLayer}
        >
          <svg viewBox="0 0 1200 500" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
            <path d={treesLeftPath} fill="#1E1A14" />
          </svg>
        </motion.div>

        <motion.div
          style={{ y: yTrees, x: xTreesRight, rotate: rotateRight }}
          className={styles.natureLayer}
        >
          <svg viewBox="0 0 1200 500" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
            <path d={treesRightPath} fill="#1E1A14" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Gradient overlay — keeps left-side text legible */}
      <div className={styles.heroOverlay} aria-hidden="true" />

      {/* ── Content ── */}
      <div className={styles.content}>
        <motion.p
          className={styles.greeting}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Hello, I'm
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
            animate={{ opacity: 1 }}
            transition={{ delay: 0.62, duration: 0.01 }}
          >
            Vuong Tran
          </motion.h1>
        </div>

        <motion.p
          className={styles.tagline}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.65 }}
        >
          {tagline}
        </motion.p>

        <motion.div
          className={styles.ctas}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
        >
          <a href="#projects" className={styles.btnPrimary}>View My Work</a>
          <a
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
        <motion.div
          className={styles.avatarRing}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'backOut' }}
        >
          <div className={styles.avatar}>
            <img src="/images/headshot.jpg" alt="Vuong Tran" className={styles.avatarImg} />
          </div>
        </motion.div>
      </div>

    </section>
  )
}

export default Hero
