import React from 'react'
import Navbar from './Navbar'

const Layout = ({ children }) => (
  <div style={{ minHeight: '100vh' }}>
    <Navbar />
    <main>{children}</main>
  </div>
)

export default Layout
