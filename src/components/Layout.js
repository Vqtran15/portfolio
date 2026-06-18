import React from 'react'
import Navbar from './Navbar'
import BackToTop from './BackToTop'
import CursorTrailer from './CursorTrailer'
import SectionCursor from './SectionCursor'

const Layout = ({ children }) => (
  <div style={{ minHeight: '100vh' }}>
    <CursorTrailer />
    <SectionCursor />
    <Navbar />
    <main>{children}</main>
    <BackToTop />
  </div>
)

export default Layout
