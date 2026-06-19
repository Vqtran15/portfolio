import React, { useEffect, useRef } from 'react'
import { motion, useAnimation, useMotionValue } from 'framer-motion'

const SECTION_ORDER = ['home', 'about', 'projects', 'contact']

const INK_COLOR = {
  home:     '#1E1A14',
  about:    '#1E1A14',
  projects: '#B8400F',
  contact:  '#2A4D24',
}

const TransitionOverlay = () => {
  const ctrl      = useAnimation()
  const busy      = useRef(false)
  const overlayEl = useRef(null)
  const originX   = useMotionValue(1)

  useEffect(() => {
    ctrl.set({ scaleX: 0 })

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

      // Determine direction from current scroll position
      const mid = hscroll.scrollLeft + window.innerWidth / 2
      let currentId = 'home', minDist = Infinity
      SECTION_ORDER.forEach(id => {
        const el = document.getElementById(id)
        if (!el) return
        const dist = Math.abs(el.offsetLeft + el.offsetWidth / 2 - mid)
        if (dist < minDist) { minDist = dist; currentId = id }
      })
      const goingRight = SECTION_ORDER.indexOf(targetId) >= SECTION_ORDER.indexOf(currentId)

      // Set ink colour and expand origin before animating
      if (overlayEl.current) {
        overlayEl.current.style.background = INK_COLOR[targetId] || '#1E1A14'
      }
      originX.set(goingRight ? 1 : 0)

      // Phase 1: ink bleeds across the screen
      await ctrl.start({
        scaleX: 1,
        transition: { duration: 0.65, ease: [0.4, 0, 0.15, 1] },
      })

      // Instant scroll while screen is covered
      if (hscroll && target) {
        hscroll.style.scrollBehavior = 'auto'
        hscroll.scrollLeft = target.offsetLeft
        hscroll.style.scrollBehavior = ''
      }

      // Phase 2: ink recedes back in the same direction
      await ctrl.start({
        scaleX: 0,
        transition: { duration: 0.5, ease: [0.6, 0, 0.9, 1] },
      })

      busy.current = false
    }

    window.addEventListener('section-navigate', handler)
    return () => window.removeEventListener('section-navigate', handler)
  }, [ctrl, originX])

  return (
    <>
      {/* SVG ink-bleed displacement filter */}
      <svg
        style={{ position: 'absolute', width: 0, height: 0 }}
        aria-hidden="true"
      >
        <defs>
          <filter id="ink-bleed" x="-25%" y="-25%" width="150%" height="150%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.028 0.018"
              numOctaves="4"
              seed="12"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="90"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <motion.div
        ref={overlayEl}
        animate={ctrl}
        initial={{ scaleX: 0 }}
        style={{
          position: 'fixed',
          inset: 0,
          background: '#1E1A14',
          filter: 'url(#ink-bleed)',
          originX,
          zIndex: 9000,
          pointerEvents: 'none',
          willChange: 'transform',
        }}
      />
    </>
  )
}

export default TransitionOverlay
