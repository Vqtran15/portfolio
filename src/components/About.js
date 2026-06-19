import React from 'react'
import { motion, useMotionValue, useAnimationFrame } from 'framer-motion'
import * as styles from './About.module.css'
import { projects, techCategoryMap } from '../data/projects'

const categoryOrder = ['Frontend', 'Backend', 'Tools']

const allBadges = (() => {
  const seen = new Set()
  const result = []
  categoryOrder.forEach(cat => {
    projects.forEach(p =>
      p.tech.forEach(t => {
        if (!seen.has(t) && (techCategoryMap[t] || 'Tools') === cat) {
          seen.add(t)
          result.push({ name: t, category: cat })
        }
      })
    )
  })
  return result
})()

const RADIUS = 295
const SPEED = 0.16 // radians per second

const OrbitBadge = ({ skill, index, total }) => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const startAngle = (index / total) * Math.PI * 2 - Math.PI / 2

  useAnimationFrame((time) => {
    const angle = startAngle + (time / 1000) * SPEED
    x.set(Math.cos(angle) * RADIUS)
    y.set(Math.sin(angle) * RADIUS)
  })

  return (
    <motion.div className={styles.orbitItem} style={{ x, y }}>
      <div className={styles.orbitBadge}>
        <span className={styles.badgeName}>{skill.name}</span>
        <span className={styles.badgeCat}>{skill.category}</span>
      </div>
    </motion.div>
  )
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease: 'easeOut' },
})

const About = () => (
  <section id="about" className={styles.section}>

    {/* Centered bio */}
    <div className={styles.bio}>
      <motion.span className={styles.label} {...fadeUp(0)}>Who I Am</motion.span>
      <motion.h2 className={styles.title} {...fadeUp(0.1)}>About Me</motion.h2>
      <motion.p className={styles.body} {...fadeUp(0.2)}>
        My name is Vuong and I'm a Principal Implementation Consultant at Contentsquare, leading
        the implementation function across websites and mobile apps. However, my passion for
        building goes beyond my day job. My technical journey started back in 2020 when I taught
        myself HTML, CSS, JavaScript, React, and Python. You'll find some of those old projects
        in my Github. Fast forward to 2026 — I'm leveraging those foundational skills to build
        applications alongside Claude.
      </motion.p>
      <motion.p className={styles.body} {...fadeUp(0.3)}>
        For me, designing and building products with a seamless user experience is where the real
        fun is. Thank you for visiting my portfolio!
      </motion.p>
      <motion.a
        id="about-cta-get-in-touch"
        href="#contact"
        className={styles.cta}
        {...fadeUp(0.4)}
        onClick={e => {
          e.preventDefault()
          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' })
        }}
      >
        Get in Touch
      </motion.a>
    </div>

    {/* Orbiting tech badges — rendered after bio so they sit on top */}
    <div className={styles.orbitContainer}>
      {allBadges.map((skill, i) => (
        <OrbitBadge key={skill.name} skill={skill} index={i} total={allBadges.length} />
      ))}
    </div>

  </section>
)

export default About
