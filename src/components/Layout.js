import React, { useEffect } from 'react'
import Navbar from './Navbar'
import CursorTrailer from './CursorTrailer'
import SectionNav from './SectionNav'
import TransitionOverlay from './TransitionOverlay'
import ParallaxBackground from './ParallaxBackground'
import * as styles from './Layout.module.css'

const Layout = ({ children }) => {
  useEffect(() => {
    const el = document.getElementById('h-scroll')
    if (!el) return

    const SECTIONS = ['home', 'about', 'project-0', 'project-1', 'project-2', 'project-3', 'contact']
    let locked = false
    let rafId = null

    const easeInOut = t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t

    const animateScroll = (from, to) => {
      if (rafId) cancelAnimationFrame(rafId)
      el.style.setProperty('scroll-snap-type', 'none')
      const start = performance.now()
      const duration = 550
      const tick = (now) => {
        const t = Math.min((now - start) / duration, 1)
        el.scrollLeft = from + (to - from) * easeInOut(t)
        if (t < 1) {
          rafId = requestAnimationFrame(tick)
        } else {
          el.scrollLeft = to
          el.style.removeProperty('scroll-snap-type')
          rafId = null
        }
      }
      rafId = requestAnimationFrame(tick)
    }

    const getActiveIndex = () => {
      const mid = el.scrollLeft + el.clientWidth / 2
      let closest = 0, minDist = Infinity
      SECTIONS.forEach((id, i) => {
        const sec = document.getElementById(id)
        if (!sec) return
        const dist = Math.abs(sec.offsetLeft + sec.offsetWidth / 2 - mid)
        if (dist < minDist) { minDist = dist; closest = i }
      })
      return closest
    }

    let lockTimer = null

    const onWheel = (e) => {
      if (window.innerWidth < 768) return
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return
      e.preventDefault()
      if (locked) return
      // ignore tiny deceleration ticks from trackpad momentum
      if (Math.abs(e.deltaY) < 12) return

      const dir = e.deltaY > 0 ? 1 : -1
      const next = Math.max(0, Math.min(SECTIONS.length - 1, getActiveIndex() + dir))
      const target = document.getElementById(SECTIONS[next])
      if (!target) return

      locked = true
      clearTimeout(lockTimer)
      animateScroll(el.scrollLeft, target.offsetLeft)
      // hold the lock well past the animation so deceleration events can't fire
      lockTimer = setTimeout(() => { locked = false }, 900)
    }

    el.addEventListener('wheel', onWheel, { passive: false })
    return () => {
      el.removeEventListener('wheel', onWheel)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div className={styles.wrapper}>
      <ParallaxBackground />
      <CursorTrailer />
      <TransitionOverlay />
      <SectionNav />
      <Navbar />
      <main id="h-scroll">{children}</main>
    </div>
  )
}

export default Layout
