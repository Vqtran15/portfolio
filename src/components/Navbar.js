import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import * as styles from './Navbar.module.css'

const SECTIONS = ['home', 'about', 'project-0', 'project-1', 'project-2', 'project-3', 'coming-soon', 'contact']
const DARK_SECTIONS = new Set(['about', 'contact'])

const isMobile = () => window.innerWidth < 768

const Navbar = () => {
  const [section, setSection] = useState('home')

  useEffect(() => {
    const updateSection = () => {
      if (isMobile()) {
        const mid = window.scrollY + window.innerHeight / 2
        let closest = 'home', minDist = Infinity
        SECTIONS.forEach(id => {
          const el = document.getElementById(id)
          if (!el) return
          const dist = Math.abs(el.offsetTop + el.offsetHeight / 2 - mid)
          if (dist < minDist) { minDist = dist; closest = id }
        })
        setSection(closest)
      } else {
        const hscroll = document.getElementById('h-scroll')
        if (!hscroll) return
        const mid = hscroll.scrollLeft + window.innerWidth / 2
        let closest = 'home', minDist = Infinity
        SECTIONS.forEach(id => {
          const el = document.getElementById(id)
          if (!el) return
          const dist = Math.abs(el.offsetLeft + el.offsetWidth / 2 - mid)
          if (dist < minDist) { minDist = dist; closest = id }
        })
        setSection(closest)
      }
    }

    const hscroll = document.getElementById('h-scroll')
    window.addEventListener('scroll', updateSection, { passive: true })
    hscroll?.addEventListener('scroll', updateSection, { passive: true })
    updateSection()
    return () => {
      window.removeEventListener('scroll', updateSection)
      hscroll?.removeEventListener('scroll', updateSection)
    }
  }, [])

  const scrollTo = (id) => {
    if (isMobile()) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.dispatchEvent(new CustomEvent('section-navigate', { detail: { targetId: id } }))
    }
  }

  const isLight = DARK_SECTIONS.has(section)

  return (
    <nav className={`${styles.nav} ${isLight ? styles.lightLinks : ''}`}>
      <a id="nav-logo" href="#home" className={styles.logo} onClick={e => { e.preventDefault(); scrollTo('home') }}>VT</a>
    </nav>
  )
}

export default Navbar
