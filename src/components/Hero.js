import React, { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import * as styles from './Hero.module.css'
import useScramble from '../hooks/useScramble'

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

// Individual tree data with unique sway params
const treeData = [
  { cx: 30,   h: 80,  w: 48, amp: 2.5, dur: 4.8, delay: 0.0 },
  { cx: 100,  h: 100, w: 60, amp: 3.2, dur: 5.5, delay: 0.6 },
  { cx: 170,  h: 72,  w: 44, amp: 2.0, dur: 4.2, delay: 1.1 },
  { cx: 240,  h: 92,  w: 56, amp: 2.8, dur: 5.8, delay: 0.3 },
  { cx: 310,  h: 84,  w: 52, amp: 3.5, dur: 4.5, delay: 1.8 },
  { cx: 385,  h: 96,  w: 60, amp: 2.2, dur: 6.0, delay: 0.9 },
  { cx: 455,  h: 74,  w: 46, amp: 3.0, dur: 5.2, delay: 0.2 },
  { cx: 525,  h: 88,  w: 54, amp: 2.6, dur: 4.7, delay: 1.5 },
  { cx: 600,  h: 78,  w: 48, amp: 3.3, dur: 5.0, delay: 0.7 },
  { cx: 670,  h: 102, w: 62, amp: 2.8, dur: 5.3, delay: 0.4 },
  { cx: 745,  h: 70,  w: 44, amp: 3.5, dur: 4.6, delay: 1.2 },
  { cx: 815,  h: 90,  w: 56, amp: 2.3, dur: 5.9, delay: 0.1 },
  { cx: 885,  h: 82,  w: 50, amp: 3.0, dur: 4.3, delay: 1.7 },
  { cx: 960,  h: 98,  w: 60, amp: 2.7, dur: 5.6, delay: 0.5 },
  { cx: 1030, h: 76,  w: 46, amp: 3.2, dur: 4.9, delay: 1.0 },
  { cx: 1100, h: 94,  w: 58, amp: 2.5, dur: 5.1, delay: 0.8 },
  { cx: 1170, h: 86,  w: 52, amp: 3.8, dur: 4.4, delay: 1.4 },
]

// Firefly star positions (deterministic so SSR matches)
const stars = [
  { cx: 120, cy: 40, r: 1.8, delay: 0 },
  { cx: 280, cy: 70, r: 1.2, delay: 0.8 },
  { cx: 460, cy: 30, r: 2.0, delay: 1.4 },
  { cx: 620, cy: 55, r: 1.5, delay: 0.3 },
  { cx: 780, cy: 20, r: 1.0, delay: 2.1 },
  { cx: 940, cy: 60, r: 1.8, delay: 0.6 },
  { cx: 1080, cy: 35, r: 1.3, delay: 1.7 },
  { cx: 200, cy: 90, r: 1.0, delay: 1.1 },
  { cx: 540, cy: 80, r: 1.6, delay: 2.4 },
  { cx: 860, cy: 85, r: 1.2, delay: 0.4 },
  { cx: 1150, cy: 75, r: 1.4, delay: 1.9 },
  { cx: 350, cy: 45, r: 1.0, delay: 3.0 },
  { cx: 700, cy: 42, r: 1.7, delay: 2.7 },
]

// Cycling greetings
const GREETINGS = ['Hi there,', 'Hey friend,', 'Hello,']

// ── Hero ───────────────────────────────────────────────────────
const Hero = () => {
  const { scrollY } = useScroll()
  // Sun color: gold → orange → deep red as user scrolls
  const sunColor    = useTransform(scrollY, [0, 400, 800], ['#C9A040', '#D4521A', '#8B2500'])

  const tagline = useScramble('Principal Implementation Consultant', 1600, 700)

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

      {/* ── Full-width nature scene (behind everything) ── */}
      <motion.div
        className={styles.natureScene}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.3 }}
        aria-hidden="true"
      >
        {/* Firefly stars */}
        <div className={styles.natureLayer}>
          <svg viewBox="0 0 1200 500" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
            {stars.map((s, i) => (
              <circle
                key={i}
                cx={s.cx}
                cy={s.cy}
                r={s.r}
                fill="#F5EFE0"
                className={styles.star}
                style={{ animationDelay: `${s.delay}s` }}
              />
            ))}
          </svg>
        </div>

        {/* Sun — color shifts on scroll */}
        <div className={`${styles.natureLayer} ${styles.floatSun}`}>
          <svg viewBox="0 0 1200 500" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
            <motion.circle cx="880" cy="115" r="95" style={{ fill: sunColor }} opacity="0.85" />
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

        <div className={styles.natureLayer}>
          <svg viewBox="0 0 1200 500" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" overflow="visible">
            {treeData.map((t, i) => (
              <g
                key={i}
                style={{
                  transformBox: 'fill-box',
                  transformOrigin: 'center bottom',
                  animation: `treeSway ${t.dur}s ease-in-out ${t.delay}s infinite alternate`,
                }}
              >
                <path d={pineTree(t.cx, 500, t.h, t.w)} fill="#1E1A14" />
              </g>
            ))}
          </svg>
        </div>
      </motion.div>

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
