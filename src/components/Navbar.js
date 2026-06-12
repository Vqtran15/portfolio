import React, { useState, useEffect } from 'react'
import * as styles from './Navbar.module.css'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <a id="nav-logo" href="#home" className={styles.logo}>VT</a>
      <ul className={styles.links}>
        <li><a id="nav-about" href="#about" onClick={(e) => {
          e.preventDefault()
          const el = document.getElementById('about')
          if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' })
        }}>About</a></li>
        <li><a id="nav-projects" href="#projects">Projects</a></li>
        <li><a id="nav-contact" href="#contact">Contact</a></li>
      </ul>
    </nav>
  )
}

export default Navbar
