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
    const onWheel = (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return
      e.preventDefault()
      el.scrollLeft += e.deltaY
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
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
