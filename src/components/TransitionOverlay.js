import React, { useEffect, useRef, useState } from 'react'
import { motion, useAnimation, AnimatePresence } from 'framer-motion'

const SECTION_ORDER = ['home', 'about', 'project-0', 'project-1', 'project-2', 'project-3', 'coming-soon', 'contact']

const MESSAGES = {
  home:          'Welcome back',
  about:         'About me',
  'project-0':   'Portfolio Website',
  'project-1':   'Daily Task Categorizer',
  'project-2':   'Community Group App',
  'project-3':   'Coffee Logger',
  'coming-soon': 'More projects cooking',
  contact:       'Contact information',
}

const UNDERLINE_COLOR = {
  home:          '#D4521A',
  about:         '#3D6B35',
  'project-0':   '#D4521A',
  'project-1':   '#3D6B35',
  'project-2':   '#D4521A',
  'project-3':   '#3D6B35',
  'coming-soon': '#C9A040',
  contact:       '#3D6B35',
}

const TransitionOverlay = () => {
  const bgCtrl = useAnimation()
  const busy   = useRef(false)
  const [phrase, setPhrase] = useState(null)

  useEffect(() => {
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

      // Determine navigation direction
      const mid = hscroll.scrollLeft + window.innerWidth / 2
      let currentId = 'home', minDist = Infinity
      SECTION_ORDER.forEach(id => {
        const el = document.getElementById(id)
        if (!el) return
        const dist = Math.abs(el.offsetLeft + el.offsetWidth / 2 - mid)
        if (dist < minDist) { minDist = dist; currentId = id }
      })
      const dir = SECTION_ORDER.indexOf(targetId) >= SECTION_ORDER.indexOf(currentId) ? 1 : -1

      // Show backdrop + phrase
      setPhrase({ text: MESSAGES[targetId] || '', color: UNDERLINE_COLOR[targetId] || '#D4521A', dir })
      bgCtrl.start({ opacity: 1, transition: { duration: 0.22, ease: 'easeIn' } })

      // Wait for all words to reveal + brief hold before scrolling
      // longest phrase: 6 words × 0.08s stagger + 0.4s duration = 0.88s → 950ms gives a beat of hold
      await new Promise(r => setTimeout(r, 950))

      // Scroll while backdrop is opaque
      if (hscroll && target) {
        hscroll.style.scrollBehavior = 'auto'
        hscroll.scrollLeft = target.offsetLeft
        hscroll.style.scrollBehavior = ''
      }

      // Short hold, then exit
      await new Promise(r => setTimeout(r, 150))
      setPhrase(null)
      bgCtrl.start({ opacity: 0, transition: { duration: 0.35, ease: 'easeOut' } })

      // Wait for exit animation to finish
      await new Promise(r => setTimeout(r, 380))

      busy.current = false
    }

    window.addEventListener('section-navigate', handler)
    return () => window.removeEventListener('section-navigate', handler)
  }, [bgCtrl])

  return (
    <>
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

      <AnimatePresence>
        {phrase && (
          <motion.div
            key={phrase.text}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 2rem',
              pointerEvents: 'none',
            }}
          >
            <p style={{
              margin: 0,
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '0 0.32em',
            }}>
              {phrase.text.split(' ').map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 36 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: phrase.dir * 320, transition: { duration: 0.45, ease: 'easeIn' } }}
                  transition={{ delay: i * 0.08, duration: 0.4, ease: [0.25, 0, 0.5, 1] }}
                  style={{
                    display: 'inline-block',
                    position: 'relative',
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                    fontWeight: 700,
                    color: '#F5EFE0',
                    lineHeight: 1.2,
                    textShadow: '0 2px 20px rgba(0,0,0,0.5)',
                  }}
                >
                  {word}
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: i * 0.08 + 0.28, duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
                    style={{
                      position: 'absolute',
                      bottom: -6,
                      left: 0,
                      right: 0,
                      height: 3,
                      borderRadius: 2,
                      background: phrase.color,
                      transformOrigin: 'left center',
                    }}
                  />
                </motion.span>
              ))}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default TransitionOverlay
