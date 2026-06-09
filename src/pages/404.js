import React from 'react'

export const Head = () => <title>Page Not Found</title>

const NotFoundPage = () => (
  <main style={{
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'var(--cream)',
    gap: '1rem',
  }}>
    <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '8rem', color: 'var(--orange)', fontWeight: 900, lineHeight: 1 }}>
      404
    </h1>
    <p style={{ fontFamily: 'Karla, sans-serif', fontSize: '1.25rem', color: 'var(--dark)' }}>
      Page Not Found
    </p>
    <a href="/" style={{
      fontFamily: 'Raleway, sans-serif',
      fontWeight: 700,
      fontSize: '0.875rem',
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      background: 'var(--orange)',
      color: 'var(--cream)',
      padding: '0.875rem 2rem',
      marginTop: '1rem',
    }}>
      Go Home
    </a>
  </main>
)

export default NotFoundPage
