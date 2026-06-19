import React, { useEffect, useRef } from 'react'
import { motion, useAnimation } from 'framer-motion'

const SECTION_ORDER = ['home', 'about', 'projects', 'contact']

const BLOBS = [
  // ── grid strokes (30) ──────────────────────────────────────────────────
  { x:  9, y:  6, w: 38, h: 10, rot:  -10, ox: 0.5, oy: 0.3 },
  { x: 30, y:  5, w: 39, h: 10, rot:    7, ox: 0.0, oy: 1.0 },
  { x: 46, y:  9, w: 28, h: 10, rot:   -4, ox: 0.2, oy: 1.0 },
  { x: 71, y:  8, w: 31, h: 15, rot:   10, ox: 1.0, oy: 0.7 },
  { x: 91, y:  7, w: 37, h: 12, rot:  -10, ox: 0.2, oy: 0.7 },
  { x: 12, y: 21, w: 30, h: 11, rot:    0, ox: 0.0, oy: 0.0 },
  { x: 24, y: 26, w: 33, h: 16, rot:    1, ox: 1.0, oy: 0.5 },
  { x: 54, y: 23, w: 35, h: 14, rot:   -7, ox: 0.8, oy: 0.0 },
  { x: 71, y: 26, w: 41, h: 15, rot:    9, ox: 0.5, oy: 1.0 },
  { x: 89, y: 27, w: 29, h: 10, rot:   -3, ox: 0.5, oy: 0.0 },
  { x:  8, y: 39, w: 29, h: 13, rot:   -2, ox: 0.8, oy: 0.5 },
  { x: 26, y: 41, w: 33, h: 11, rot:   -2, ox: 0.0, oy: 1.0 },
  { x: 50, y: 42, w: 39, h: 11, rot:   -5, ox: 0.8, oy: 0.7 },
  { x: 71, y: 43, w: 39, h: 14, rot:   -3, ox: 0.5, oy: 0.0 },
  { x: 87, y: 38, w: 28, h: 16, rot:    0, ox: 0.8, oy: 0.5 },
  { x: 12, y: 59, w: 42, h: 14, rot:    0, ox: 0.2, oy: 0.7 },
  { x: 32, y: 58, w: 35, h: 11, rot:   -2, ox: 0.2, oy: 0.3 },
  { x: 52, y: 56, w: 32, h: 15, rot:    8, ox: 0.8, oy: 1.0 },
  { x: 68, y: 60, w: 31, h: 11, rot:    6, ox: 0.8, oy: 0.0 },
  { x: 87, y: 57, w: 29, h: 11, rot:   10, ox: 0.2, oy: 0.7 },
  { x: 14, y: 76, w: 34, h: 14, rot:    4, ox: 1.0, oy: 0.5 },
  { x: 29, y: 70, w: 28, h: 15, rot:   -7, ox: 1.0, oy: 0.5 },
  { x: 50, y: 74, w: 32, h: 13, rot:   -5, ox: 0.8, oy: 0.0 },
  { x: 76, y: 74, w: 40, h: 11, rot:    6, ox: 0.0, oy: 0.5 },
  { x: 94, y: 70, w: 31, h: 11, rot:    1, ox: 0.2, oy: 1.0 },
  { x: 11, y: 91, w: 37, h: 12, rot:    5, ox: 0.0, oy: 0.0 },
  { x: 25, y: 85, w: 40, h: 12, rot:   -3, ox: 0.0, oy: 0.3 },
  { x: 48, y: 90, w: 39, h: 13, rot:   -8, ox: 1.0, oy: 0.3 },
  { x: 74, y: 86, w: 35, h: 14, rot:   -5, ox: 0.5, oy: 1.0 },
  { x: 91, y: 88, w: 42, h: 14, rot:   -4, ox: 0.5, oy: 0.7 },
  // ── scatter strokes (20) ────────────────────────────────────────────────
  { x: 71, y: 62, w: 15, h:  7, rot:   -8, ox: 0.0, oy: 0.5 },
  { x:  7, y: 80, w: 22, h:  7, rot:    3, ox: 0.2, oy: 0.0 },
  { x: 14, y: 95, w: 14, h:  7, rot:  -13, ox: 0.0, oy: 0.5 },
  { x: 14, y: 70, w: 17, h:  8, rot:    6, ox: 0.8, oy: 0.3 },
  { x: 74, y: 21, w: 21, h:  7, rot:   10, ox: 0.8, oy: 0.7 },
  { x: 29, y: 17, w: 15, h: 11, rot:   -2, ox: 0.5, oy: 0.7 },
  { x: 57, y: 64, w: 14, h: 11, rot:    5, ox: 0.0, oy: 0.0 },
  { x: 56, y: 48, w: 15, h:  7, rot:   -9, ox: 0.2, oy: 1.0 },
  { x: 62, y: 22, w: 20, h:  7, rot:   -7, ox: 0.8, oy: 0.3 },
  { x: 14, y: 61, w: 22, h:  6, rot:  -14, ox: 1.0, oy: 0.0 },
  { x: 16, y: 35, w: 16, h:  9, rot:    0, ox: 0.8, oy: 0.3 },
  { x: 56, y: 12, w: 16, h:  9, rot:  -15, ox: 0.8, oy: 0.5 },
  { x: 63, y: 41, w: 20, h: 11, rot:   15, ox: 1.0, oy: 0.7 },
  { x: 24, y: 29, w: 18, h:  7, rot:   15, ox: 0.0, oy: 1.0 },
  { x: 74, y: 12, w: 19, h:  6, rot:  -14, ox: 1.0, oy: 0.7 },
  { x: 69, y: 72, w: 16, h:  6, rot:   15, ox: 1.0, oy: 0.0 },
  { x: 28, y: 13, w: 15, h: 11, rot:   12, ox: 0.2, oy: 0.7 },
  { x: 20, y: 77, w: 17, h: 10, rot:    4, ox: 0.0, oy: 1.0 },
  { x: 15, y: 58, w: 22, h:  8, rot:   14, ox: 0.5, oy: 0.3 },
  { x: 90, y: 45, w: 17, h:  8, rot:   -3, ox: 0.2, oy: 0.5 },
]

const RADII = [
  '17% 83% 31% 69% / 56% 41% 40% 55%',
  '23% 77% 22% 78% / 40% 45% 49% 47%',
  '32% 68% 31% 69% / 63% 58% 54% 38%',
  '67% 33% 82% 18% / 42% 46% 41% 41%',
  '54% 46% 66% 34% / 44% 60% 48% 44%',
  '77% 23% 70% 30% / 46% 65% 39% 40%',
  '76% 24% 85% 15% / 48% 62% 42% 58%',
  '55% 45% 68% 32% / 60% 51% 55% 38%',
  '37% 63% 49% 51% / 64% 49% 56% 55%',
  '19% 81% 39% 61% / 63% 65% 39% 49%',
  '22% 78% 39% 61% / 62% 55% 65% 51%',
  '73% 27% 80% 20% / 63% 63% 43% 51%',
  '38% 62% 37% 63% / 63% 59% 65% 61%',
  '58% 42% 82% 18% / 50% 65% 39% 65%',
  '21% 79% 41% 59% / 64% 63% 65% 45%',
  '36% 64% 40% 60% / 46% 65% 40% 62%',
  '35% 65% 29% 71% / 64% 55% 48% 38%',
  '23% 77% 42% 58% / 39% 41% 57% 51%',
  '25% 75% 34% 66% / 41% 50% 56% 44%',
  '37% 63% 34% 66% / 63% 55% 59% 61%',
  '73% 27% 74% 26% / 51% 40% 59% 48%',
  '71% 29% 62% 38% / 47% 54% 47% 59%',
  '27% 73% 33% 67% / 42% 44% 51% 59%',
  '71% 29% 66% 34% / 56% 47% 50% 55%',
  '59% 41% 72% 28% / 63% 56% 57% 58%',
  '29% 71% 44% 56% / 54% 53% 63% 63%',
  '71% 29% 69% 31% / 59% 58% 57% 48%',
  '22% 78% 43% 57% / 63% 44% 42% 38%',
  '30% 70% 26% 74% / 40% 52% 51% 58%',
  '72% 28% 70% 30% / 50% 45% 42% 58%',
  '78% 22% 72% 28% / 45% 43% 63% 60%',
  '51% 49% 82% 18% / 52% 42% 63% 52%',
  '67% 33% 71% 29% / 57% 64% 61% 54%',
  '32% 68% 45% 55% / 61% 65% 53% 52%',
  '22% 78% 26% 74% / 62% 54% 53% 58%',
  '29% 71% 41% 59% / 45% 46% 48% 48%',
  '52% 48% 78% 22% / 50% 60% 42% 60%',
  '28% 72% 33% 67% / 52% 51% 39% 44%',
  '62% 38% 63% 37% / 38% 65% 62% 56%',
  '15% 85% 26% 74% / 50% 65% 64% 51%',
  '73% 27% 78% 22% / 53% 45% 46% 51%',
  '27% 73% 29% 71% / 63% 50% 61% 43%',
  '54% 46% 85% 15% / 50% 56% 56% 59%',
  '35% 65% 23% 77% / 52% 43% 39% 46%',
  '21% 79% 40% 60% / 62% 50% 46% 62%',
  '63% 37% 70% 30% / 38% 61% 55% 39%',
  '61% 39% 83% 17% / 62% 58% 39% 62%',
  '22% 78% 50% 50% / 57% 42% 45% 42%',
  '18% 82% 36% 64% / 60% 46% 62% 49%',
  '34% 66% 47% 53% / 62% 64% 43% 47%',
]

const PALETTES = {
  about: [
    '#1E1A14','#1E1A14','#1E1A14','#D4521A','#F5EFE0',
    '#1E1A14','#D4521A','#1E1A14','#D4521A','#1E1A14',
    '#1E1A14','#D4521A','#F07B3A','#1E1A14','#1E1A14',
    '#F5EFE0','#D4521A','#1E1A14','#1E1A14','#1E1A14',
    '#1E1A14','#1E1A14','#D4521A','#D4521A','#1E1A14',
    '#F5EFE0','#1E1A14','#D4521A','#D4521A','#1E1A14',
    '#D4521A','#F5EFE0','#1E1A14','#D4521A','#1E1A14',
    '#1E1A14','#1E1A14','#D4521A','#1E1A14','#F07B3A',
    '#D4521A','#1E1A14','#F07B3A','#1E1A14','#1E1A14',
    '#1E1A14','#1E1A14','#1E1A14','#F07B3A','#1E1A14',
  ],
  projects: [
    '#F07B3A','#F5D4BF','#F07B3A','#F5D4BF','#D4521A',
    '#F07B3A','#F07B3A','#1E1A14','#F07B3A','#D4521A',
    '#D4521A','#F5D4BF','#D4521A','#D4521A','#D4521A',
    '#F5D4BF','#F07B3A','#F07B3A','#D4521A','#F07B3A',
    '#D4521A','#D4521A','#D4521A','#F07B3A','#D4521A',
    '#F07B3A','#D4521A','#F07B3A','#F07B3A','#F07B3A',
    '#F07B3A','#F07B3A','#D4521A','#F5D4BF','#F07B3A',
    '#F07B3A','#D4521A','#D4521A','#1E1A14','#D4521A',
    '#F07B3A','#F07B3A','#F07B3A','#F07B3A','#F07B3A',
    '#F07B3A','#D4521A','#F07B3A','#1E1A14','#D4521A',
  ],
  contact: [
    '#6A9A5F','#3D6B35','#C5D9C0','#3D6B35','#C5D9C0',
    '#6A9A5F','#3D6B35','#3D6B35','#3D6B35','#3D6B35',
    '#1E1A14','#3D6B35','#C5D9C0','#3D6B35','#3D6B35',
    '#6A9A5F','#3D6B35','#3D6B35','#6A9A5F','#3D6B35',
    '#1E1A14','#3D6B35','#6A9A5F','#6A9A5F','#6A9A5F',
    '#3D6B35','#3D6B35','#3D6B35','#3D6B35','#C5D9C0',
    '#1E1A14','#3D6B35','#6A9A5F','#6A9A5F','#6A9A5F',
    '#1E1A14','#3D6B35','#3D6B35','#6A9A5F','#3D6B35',
    '#3D6B35','#3D6B35','#3D6B35','#3D6B35','#6A9A5F',
    '#3D6B35','#3D6B35','#6A9A5F','#6A9A5F','#3D6B35',
  ],
  home: [
    '#F5EFE0','#3D6B35','#F5EFE0','#1E1A14','#F5EFE0',
    '#3D6B35','#1E1A14','#1E1A14','#1E1A14','#3D6B35',
    '#F5EFE0','#D4521A','#D4521A','#D4521A','#F5EFE0',
    '#1E1A14','#D4521A','#D4521A','#F5EFE0','#F5EFE0',
    '#3D6B35','#1E1A14','#1E1A14','#D4521A','#D4521A',
    '#1E1A14','#D4521A','#D4521A','#D4521A','#3D6B35',
    '#F5EFE0','#1E1A14','#3D6B35','#3D6B35','#F5EFE0',
    '#D4521A','#D4521A','#F5EFE0','#1E1A14','#F5EFE0',
    '#3D6B35','#D4521A','#1E1A14','#1E1A14','#1E1A14',
    '#D4521A','#D4521A','#D4521A','#F5EFE0','#3D6B35',
  ],
}

const TransitionOverlay = () => {
  const ctrl     = useAnimation()
  const busy     = useRef(false)
  const blobRefs = useRef([])

  useEffect(() => {
    ctrl.set({ scale: 0 })

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

      // Determine navigation direction from current scroll position
      const mid = hscroll.scrollLeft + window.innerWidth / 2
      let currentId = 'home', minDist = Infinity
      SECTION_ORDER.forEach(id => {
        const el = document.getElementById(id)
        if (!el) return
        const dist = Math.abs(el.offsetLeft + el.offsetWidth / 2 - mid)
        if (dist < minDist) { minDist = dist; currentId = id }
      })
      const goingRight = SECTION_ORDER.indexOf(targetId) >= SECTION_ORDER.indexOf(currentId)

      // Reset from previous scrape (invisible at scale 0)
      ctrl.set({ scale: 0, y: 0 })

      const palette = PALETTES[targetId] || PALETTES.home
      blobRefs.current.forEach((el, i) => {
        if (el) el.style.background = palette[i]
      })

      // Phase 1: directional wave — blobs arrive from the direction of travel
      await ctrl.start((i) => ({
        scale: 1,
        rotate: BLOBS[i].rot,
        transition: {
          type: 'spring',
          stiffness: 500,
          damping: 28,
          delay: goingRight
            ? ((100 - BLOBS[i].x) / 100) * 0.22
            : (BLOBS[i].x / 100) * 0.22,
        },
      }))

      if (hscroll && target) {
        hscroll.style.scrollBehavior = 'auto'
        hscroll.scrollLeft = target.offsetLeft
        hscroll.style.scrollBehavior = ''
      }

      // Phase 2: directional scrape — squeegee sweeps in the direction of travel
      await ctrl.start((i) => ({
        y: '110vh',
        transition: {
          duration: 0.22,
          ease: [0.4, 0, 0.9, 0.6],
          delay: goingRight
            ? (BLOBS[i].x / 100) * 0.2
            : ((100 - BLOBS[i].x) / 100) * 0.2,
        },
      }))

      ctrl.set({ scale: 0, y: 0 })
      busy.current = false
    }

    window.addEventListener('section-navigate', handler)
    return () => window.removeEventListener('section-navigate', handler)
  }, [ctrl])

  return (
    <>
      {BLOBS.map((blob, i) => (
        <motion.div
          key={i}
          custom={i}
          animate={ctrl}
          ref={el => { blobRefs.current[i] = el }}
          initial={{ scale: 0, rotate: blob.rot }}
          style={{
            position: 'fixed',
            left: `calc(${blob.x}% - ${blob.w / 2}vw)`,
            top: `calc(${blob.y}% - ${blob.h / 2}vh)`,
            width: `${blob.w}vw`,
            height: `${blob.h}vh`,
            background: PALETTES.home[i],
            borderRadius: RADII[i],
            originX: blob.ox,
            originY: blob.oy,
            zIndex: 9000,
            pointerEvents: 'none',
            willChange: 'transform',
          }}
        />
      ))}
    </>
  )
}

export default TransitionOverlay
