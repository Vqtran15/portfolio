import React, { useState, useEffect } from 'react'
import * as styles from './Navbar.module.css'

const DARK_SECTIONS = new Set(['about', 'contact'])

const Navbar = () => {
  const [section, setSection] = useState('home')

  useEffect(() => {
    const el = document.getElementById('h-scroll')
    if (!el) return
    const SECTIONS = ['home', 'about', 'projects', 'contact']
    const handleScroll = () => {
      const mid = el.scrollLeft + window.innerWidth / 2
      let closest = 'home', minDist = Infinity
      SECTIONS.forEach(id => {
        const sec = document.getElementById(id)
        if (!sec) return
        const dist = Math.abs(sec.offsetLeft + sec.offsetWidth / 2 - mid)
        if (dist < minDist) { minDist = dist; closest = id }
      })
      setSection(closest)
    }
    el.addEventListener('scroll', handleScroll, { passive: true })
    return () => el.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id) => {
    window.dispatchEvent(new CustomEvent('section-navigate', { detail: { targetId: id } }))
  }

  const isLight = DARK_SECTIONS.has(section)

  return (
    <nav className={`${styles.nav} ${isLight ? styles.lightLinks : ''}`}>
      <a id="nav-logo" href="#home" className={styles.logo} onClick={e => { e.preventDefault(); scrollTo('home') }}>VT</a>
      <ul className={styles.links}>
        <li><a id="nav-about" href="#about" onClick={e => { e.preventDefault(); scrollTo('about') }}>About</a></li>
        <li><a id="nav-projects" href="#projects" onClick={e => { e.preventDefault(); scrollTo('projects') }}>Projects</a></li>
        <li><a id="nav-contact" href="#contact" onClick={e => { e.preventDefault(); scrollTo('contact') }}>Contact</a></li>
      </ul>
    </nav>
  )
}

export default Navbar
