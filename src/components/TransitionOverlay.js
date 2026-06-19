import React, { useEffect, useRef } from 'react'
import { motion, useAnimation } from 'framer-motion'

const SECTION_ORDER = ['home', 'about', 'projects', 'contact']

const LEAF_COLORS = [
  '#D4521A', '#D4521A', '#D4521A',
  '#F07B3A', '#F07B3A',
  '#C9A040', '#C9A040',
  '#3D6B35', '#6A9A5F',
  '#1E1A14',
  '#F5D4BF',
]

const LEAF_RADII = [
  '49% 51% 51% 49% / 57% 57% 43% 43%',
  '50% 0% 50% 0% / 50% 0% 50% 0%',
  '0% 100% 0% 100% / 50% 50% 50% 50%',
  '70% 30% 70% 30% / 30% 70% 30% 70%',
  '40% 60% 60% 40% / 60% 40% 40% 60%',
]

// Deterministic pseudo-random — safe for SSR
// Use golden-ratio-derived multiplier (1.618) for good fractional distribution
const s = (i, n) => ((i * 137.508 * n) % 1 + 1) % 1

// 8 cols × 10 rows grid with per-cell jitter — guarantees even spread
const COLS = 8, ROWS = 10
const CW = 100 / COLS, CH = 100 / ROWS

const LEAVES = Array.from({ length: COLS * ROWS }, (_, i) => {
  const col = i % COLS
  const row = Math.floor(i / COLS)
  const cx  = col * CW + CW / 2   // cell centre x %
  const cy  = row * CH + CH / 2   // cell centre y %
  return {
    id:     i,
    left:   Math.max(2, Math.min(98, cx + (s(i, 1.618) - 0.5) * CW * 0.75)),
    top:    Math.max(2, Math.min(98, cy + (s(i, 2.718) - 0.5) * CH * 0.75)),
    size:   Math.floor(s(i, 3.14)  * 140 + 80),
    rot:    Math.floor(s(i, 4.669) * 90 - 45),
    spin:   Math.floor(s(i, 5.77)  * 300 + 120) * (s(i, 6.28) > 0.5 ? 1 : -1),
    delay:  s(i, 7.39) * 0.28,
    color:  LEAF_COLORS[Math.floor(s(i, 8.44)  * LEAF_COLORS.length)],
    radius: LEAF_RADII[Math.floor(s(i, 9.51)   * LEAF_RADII.length)],
  }
})

const TransitionOverlay = () => {
  const leafCtrl = useAnimation()
  const bgCtrl   = useAnimation()
  const busy     = useRef(false)

  useEffect(() => {
    // Start off-screen to the right
    leafCtrl.set({ x: '110vw' })
    bgCtrl.set({ opacity: 0 })

    const handler = async (e) => {
      if (busy.current) return

      const { targetId } = e.detail
      const target = document.getElementById(targetId)

      if (window.innerWidth < 768) {
        target?.scrollIntoView({ behavior: 'smooth' })
        return
      }

      busy.current = true

      const hscroll = document.getElementById('h-scroll')

      // Determine direction
      const mid = hscroll.scrollLeft + window.innerWidth / 2
      let currentId = 'home', minDist = Infinity
      SECTION_ORDER.forEach(id => {
        const el = document.getElementById(id)
        if (!el) return
        const dist = Math.abs(el.offsetLeft + el.offsetWidth / 2 - mid)
        if (dist < minDist) { minDist = dist; currentId = id }
      })
      const goingRight = SECTION_ORDER.indexOf(targetId) >= SECTION_ORDER.indexOf(currentId)
      const enterFrom  = goingRight ? '110vw'  : '-110vw'
      const exitTo     = goingRight ? '-110vw' : '110vw'

      // Snap leaves to entry side (instant, off-screen so invisible)
      await leafCtrl.start((i) => ({
        x: enterFrom,
        y: 0,
        rotate: LEAVES[i].rot,
        transition: { duration: 0 },
      }))

      // Phase 1: leaves sweep in while backdrop fades up to fully opaque
      bgCtrl.start({ opacity: 1, transition: { duration: 0.25, ease: 'easeIn' } })
      await leafCtrl.start((i) => ({
        x: 0,
        y: (s(i, 11.3) * 80 - 40),
        rotate: LEAVES[i].rot + LEAVES[i].spin * 0.5,
        transition: {
          duration: 0.45,
          ease: [0.2, 0, 0.5, 1],
          delay: LEAVES[i].delay,
        },
      }))

      // Scroll while covered
      if (hscroll && target) {
        hscroll.style.scrollBehavior = 'auto'
        hscroll.scrollLeft = target.offsetLeft
        hscroll.style.scrollBehavior = ''
      }

      // Phase 2: leaves sweep out while backdrop fades down
      bgCtrl.start({ opacity: 0, transition: { duration: 0.3, ease: 'easeOut', delay: 0.1 } })
      await leafCtrl.start((i) => ({
        x: exitTo,
        y: (s(i, 11.3) * 80 - 40) + (s(i, 12.7) * 60 - 30),
        rotate: LEAVES[i].rot + LEAVES[i].spin,
        transition: {
          duration: 0.42,
          ease: [0.4, 0, 0.8, 1],
          delay: LEAVES[i].delay,
        },
      }))

      busy.current = false
    }

    window.addEventListener('section-navigate', handler)
    return () => window.removeEventListener('section-navigate', handler)
  }, [leafCtrl, bgCtrl])

  return (
    <>
      {/* Dark backdrop fills any gaps between leaves */}
      <motion.div
        animate={bgCtrl}
        initial={{ opacity: 0 }}
        style={{
          position: 'fixed',
          inset: 0,
          background: '#1E1A14',
          zIndex: 8999,
          pointerEvents: 'none',
        }}
      />

      {/* Leaves */}
      {LEAVES.map((leaf, i) => (
        <motion.div
          key={leaf.id}
          custom={i}
          animate={leafCtrl}
          initial={{ x: '110vw', rotate: leaf.rot }}
          style={{
            position: 'fixed',
            left:         `${leaf.left}%`,
            top:          `${leaf.top}%`,
            width:        leaf.size,
            height:       leaf.size,
            background:   leaf.color,
            borderRadius: leaf.radius,
            zIndex:       9000,
            pointerEvents: 'none',
            willChange:   'transform',
          }}
        />
      ))}
    </>
  )
}

export default TransitionOverlay
