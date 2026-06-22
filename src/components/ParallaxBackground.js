import React, { useEffect, useRef } from 'react'
import { motion, useMotionValue } from 'framer-motion'
import { gsap } from 'gsap'
import * as styles from './ParallaxBackground.module.css'

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

const treeData = [
  { cx: 30,   h: 80,  w: 48, amp: 2.5, dur: 3.2, delay: 0.0 },
  { cx: 100,  h: 100, w: 60, amp: 3.2, dur: 3.7, delay: 0.6 },
  { cx: 170,  h: 72,  w: 44, amp: 2.0, dur: 2.8, delay: 1.1 },
  { cx: 240,  h: 92,  w: 56, amp: 2.8, dur: 3.9, delay: 0.3 },
  { cx: 310,  h: 84,  w: 52, amp: 3.5, dur: 3.0, delay: 1.8 },
  { cx: 385,  h: 96,  w: 60, amp: 2.2, dur: 4.0, delay: 0.9 },
  { cx: 455,  h: 74,  w: 46, amp: 3.0, dur: 3.5, delay: 0.2 },
  { cx: 525,  h: 88,  w: 54, amp: 2.6, dur: 3.1, delay: 1.5 },
  { cx: 600,  h: 78,  w: 48, amp: 3.3, dur: 3.3, delay: 0.7 },
  { cx: 670,  h: 102, w: 62, amp: 2.8, dur: 3.6, delay: 0.4 },
  { cx: 745,  h: 70,  w: 44, amp: 3.5, dur: 3.0, delay: 1.2 },
  { cx: 815,  h: 90,  w: 56, amp: 2.3, dur: 3.9, delay: 0.1 },
  { cx: 885,  h: 82,  w: 50, amp: 3.0, dur: 2.9, delay: 1.7 },
  { cx: 960,  h: 98,  w: 60, amp: 2.7, dur: 3.7, delay: 0.5 },
  { cx: 1030, h: 76,  w: 46, amp: 3.2, dur: 3.2, delay: 1.0 },
  { cx: 1100, h: 94,  w: 58, amp: 2.5, dur: 3.4, delay: 0.8 },
  { cx: 1170, h: 86,  w: 52, amp: 3.8, dur: 2.9, delay: 1.4 },
]

// Tile trees left (-1200) and right (+1200) to fill the extended viewBox
const allTreeData = [
  ...treeData.map(t => ({ ...t, cx: t.cx - 1200 })),
  ...treeData,
  ...treeData.map(t => ({ ...t, cx: t.cx + 1200 })),
]

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

// Tile stars left and right to fill the extended viewBox
const allStars = [
  ...stars.map(s => ({ ...s, cx: s.cx - 1200 })),
  ...stars,
  ...stars.map(s => ({ ...s, cx: s.cx + 1200 })),
]

const PARALLAX_FACTORS = [0.60, 0.50, 0.38, 0.28, 0.18, 0.08]

// Original viewBox kept so scale/position are identical to the original design.
// Extended paths + allStars/allTreeData render outside this viewBox via overflow="visible"
// on each SVG. The browser viewport clips naturally — no CSS overflow tricks needed.
const VIEW_BOX = '0 0 1200 500'

const ParallaxBackground = () => {
  const sunColor = useMotionValue('#C9A040')

  const pxStarsRef = useRef(null)
  const pxSunRef   = useRef(null)
  const pxMtn1Ref  = useRef(null)
  const pxMtn2Ref  = useRef(null)
  const pxMtn3Ref  = useRef(null)
  const pxTreesRef = useRef(null)

  useEffect(() => {
    const el = document.getElementById('h-scroll')
    if (!el) return
    const palette = [[201,160,64],[212,82,26],[139,37,0]]
    const lerp = (a, b, t) => Math.round(a + (b - a) * t)
    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth
      if (!max) return
      const t = Math.min(el.scrollLeft / max, 1) * 2
      const i = Math.min(Math.floor(t), 1)
      const f = t - i
      sunColor.set(`rgb(${lerp(palette[i][0],palette[i+1][0],f)},${lerp(palette[i][1],palette[i+1][1],f)},${lerp(palette[i][2],palette[i+1][2],f)})`)
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [sunColor])

  useEffect(() => {
    const el = document.getElementById('h-scroll')
    if (!el) return
    const refs = [pxStarsRef, pxSunRef, pxMtn1Ref, pxMtn2Ref, pxMtn3Ref, pxTreesRef]
    const setters = refs.map(r => r.current ? gsap.quickSetter(r.current, 'x', 'px') : null)
    const onScroll = () => {
      const x = el.scrollLeft
      setters.forEach((set, i) => set?.(x * PARALLAX_FACTORS[i]))
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.div
      className={styles.bg}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.3 }}
      aria-hidden="true"
    >
      {/* Stars */}
      <div ref={pxStarsRef} className={styles.layer}>
        <svg viewBox={VIEW_BOX} preserveAspectRatio="xMidYMid slice" width="100%" height="100%" overflow="visible">
          {allStars.map((s, i) => (
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

      {/* Sun */}
      <div ref={pxSunRef} className={`${styles.layer} ${styles.floatSun}`}>
        <svg viewBox={VIEW_BOX} preserveAspectRatio="xMidYMid slice" width="100%" height="100%" overflow="visible">
          <motion.circle cx="880" cy="115" r="95" style={{ fill: sunColor }} opacity="0.85" />
        </svg>
      </div>

      {/* Mountain 1 — far */}
      <div ref={pxMtn1Ref} className={styles.layer}>
        <svg viewBox={VIEW_BOX} preserveAspectRatio="xMidYMid slice" width="100%" height="100%" overflow="visible">
          <path
            d="M-1500,210 L-1380,165 L-1240,215 L-1100,148 L-960,192 L-820,132 L-680,178 L-540,215 L-400,145 L-260,190 L-130,235 L0,308 L100,188 L200,238 L320,152 L440,208 L560,128 L680,182 L800,102 L920,160 L1040,115 L1160,148 L1200,138 L1320,168 L1440,112 L1560,155 L1680,118 L1800,160 L1920,108 L2040,155 L2160,125 L2280,148 L2400,115 L2520,145 L2700,130 L2700,500 L-1500,500 Z"
            fill="#C5D9C0"
          />
        </svg>
      </div>

      {/* Mountain 2 */}
      <div ref={pxMtn2Ref} className={styles.layer}>
        <svg viewBox={VIEW_BOX} preserveAspectRatio="xMidYMid slice" width="100%" height="100%" overflow="visible">
          <path
            d="M-1500,280 L-1360,305 L-1220,252 L-1080,295 L-940,248 L-800,285 L-660,255 L-520,298 L-380,258 L-240,310 L-110,345 L0,372 L128,265 L258,312 L398,245 L528,290 L658,225 L788,265 L918,208 L1048,250 L1178,225 L1200,232 L1330,262 L1460,222 L1590,255 L1720,212 L1850,245 L1980,205 L2110,245 L2240,218 L2370,252 L2500,215 L2700,230 L2700,500 L-1500,500 Z"
            fill="#6A9A5F"
          />
        </svg>
      </div>

      {/* Mountain 3 */}
      <div ref={pxMtn3Ref} className={styles.layer}>
        <svg viewBox={VIEW_BOX} preserveAspectRatio="xMidYMid slice" width="100%" height="100%" overflow="visible">
          <path
            d="M-1500,340 L-1360,368 L-1210,318 L-1060,355 L-910,305 L-760,345 L-610,310 L-460,352 L-310,318 L-160,368 L-70,405 L0,425 L152,322 L308,368 L462,302 L618,350 L772,292 L928,332 L1082,285 L1200,318 L1340,285 L1480,318 L1620,278 L1760,312 L1900,272 L2040,308 L2180,272 L2320,305 L2460,268 L2600,295 L2700,285 L2700,500 L-1500,500 Z"
            fill="#3D6B35"
          />
        </svg>
      </div>

      {/* Trees — closest */}
      <div ref={pxTreesRef} className={styles.layer}>
        <svg viewBox={VIEW_BOX} preserveAspectRatio="xMidYMid slice" width="100%" height="100%" overflow="visible">
          {allTreeData.map((t, i) => (
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
  )
}

export default ParallaxBackground
