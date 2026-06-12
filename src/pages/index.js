import React from 'react'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Projects from '../components/Projects'
import About from '../components/About'
import Contact from '../components/Contact'

export const Head = () => (
  <>
    <title>Vuong Tran — Portfolio</title>
    <meta name="description" content="Principal Implementation Consultant" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  </>
)

const IndexPage = () => {
  return (
    <Layout>
      <Hero />
      <About />
      <Projects />
      <Contact />
    </Layout>
  )
}

export default IndexPage
