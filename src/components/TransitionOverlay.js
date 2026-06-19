import React, { useEffect, useRef } from 'react'
import { motion, useAnimation, useMotionValue } from 'framer-motion'

const SECTION_ORDER = ['home', 'about', 'projects', 'contact']

const LIQUID_COLOR = {
  home:     '#1E1A14',
  about:    '#1E1A14',
  projects: '#D4521A',
  contact:  '#3D6B35',
}

const TransitionOverlay = () => {
  const ctrl      = useAnimation()
  const busy      = useRef(false)
  const overlayEl = useRef(null)
  const originY   = useMotionValue(0)

  useEffect(() => {
    ctrl.set({ scaleY: 0 })

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

      // Set liquid colour for the destination section
      if (overlayEl.current) {
        overlayEl.current.style.background = LIQUID_COLOR[targetId] || '#1E1A14'
      }

      // Phase 1: pour in from the top (top anchor, grows downward, spring for splash)
      originY.set(0)
      await ctrl.start({
        scaleY: 1,
        transition: { type: 'spring', stiffness: 180, damping: 22 },
      })

      // Instant scroll while screen is covered
      if (hscroll && target) {
        hscroll.style.scrollBehavior = 'auto'
        hscroll.scrollLeft = target.offsetLeft
        hscroll.style.scrollBehavior = ''
      }

      // Phase 2: drain from the bottom (bottom anchor, level drops downward)
      originY.set(1)
      await ctrl.start({
        scaleY: 0,
        transition: { duration: 0.55, ease: [0.4, 0, 0.9, 1] },
      })

      busy.current = false
    }

    window.addEventListener('section-navigate', handler)
    return () => window.removeEventListener('section-navigate', handler)
  }, [ctrl, originY])

  return (
    <>
      {/* Liquid-surface displacement filter */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden="true">
        <defs>
          <filter id="liquid-edge" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.01 0.07"
              numOctaves="3"
              seed="6"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="38"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <motion.div
        ref={overlayEl}
        animate={ctrl}
        initial={{ scaleY: 0 }}
        style={{
          position: 'fixed',
          inset: 0,
          background: '#1E1A14',
          filter: 'url(#liquid-edge)',
          originY,
          zIndex: 9000,
          pointerEvents: 'none',
          willChange: 'transform',
        }}
      />
    </>
  )
}

export default TransitionOverlay
