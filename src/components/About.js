import React from 'react'
import { motion, useMotionValue, useAnimationFrame, animate } from 'framer-motion'
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

const RADIUS_X = 430
const RADIUS_Y_TOP = 295
const RADIUS_Y_BOTTOM = 305
const SPEED = 0.16 // radians per second

const OrbitBadge = ({ skill, index, total }) => {
  const orbitX = useMotionValue(0)
  const orbitY = useMotionValue(0)
  const launchX = useMotionValue(0)
  const launchY = useMotionValue(0)

  const startAngle = (index / total) * Math.PI * 2 - Math.PI / 2

  useAnimationFrame((time) => {
    const angle = startAngle + (time / 1000) * SPEED
    const c = Math.cos(angle)
    const s = Math.sin(angle)
    const wobble = 1 + 0.07 * Math.sin(3 * angle)
    const radiusY = s > 0 ? RADIUS_Y_BOTTOM : RADIUS_Y_TOP
    orbitX.set(Math.sign(c) * Math.pow(Math.abs(c), 0.5) * RADIUS_X * wobble)
    orbitY.set(Math.sign(s) * Math.pow(Math.abs(s), 0.5) * radiusY * wobble)
  })

  const handleClick = () => {
    const cx = orbitX.get()
    const cy = orbitY.get()
    const dist = Math.sqrt(cx * cx + cy * cy)
    if (dist === 0) return

    const rx = cx / dist
    const ry = cy / dist
    // blend 20% radial + 80% tangential so badges at top/bottom shoot sideways
    // rather than into the section's overflow:hidden boundary
    const mx = 0.2 * rx + 0.8 * (-ry)
    const my = 0.2 * ry + 0.8 * rx
    const mag = Math.sqrt(mx * mx + my * my)
    const LAUNCH = 160

    animate(launchX, (mx / mag) * LAUNCH, { duration: 0.2, ease: 'easeOut' })
    animate(launchY, (my / mag) * LAUNCH, { duration: 0.2, ease: 'easeOut' })

    setTimeout(() => {
      animate(launchX, 0, { duration: 0.45, ease: [0.34, 1.56, 0.64, 1] })
      animate(launchY, 0, { duration: 0.45, ease: [0.34, 1.56, 0.64, 1] })
    }, 200)
  }

  return (
    // outer div drives orbit position; inner drives launch offset independently
    <motion.div className={styles.orbitItem} style={{ x: orbitX, y: orbitY }}>
      <motion.div style={{ x: launchX, y: launchY }} onClick={handleClick}>
        <div className={styles.orbitBadge}>
          <span className={styles.badgeName}>{skill.name}</span>
          <span className={styles.badgeCat}>{skill.category}</span>
        </div>
      </motion.div>
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
        My name is Vuong, and I'm a Principal Implementation Consultant at Contentsquare, where
        I lead implementation strategies across web and mobile platforms.
      </motion.p>
      <motion.p className={styles.body} {...fadeUp(0.3)}>
        However, my passion for building goes beyond my day job. In 2020, I taught myself HTML,
        CSS, JavaScript, React, and Python to understand the web from the ground up. Fast forward
        to today — I'm leveraging that foundational engineering mindset to build full-stack
        applications alongside AI-agentic tools like Claude.
      </motion.p>
      <motion.p className={styles.body} {...fadeUp(0.35)}>
        I have the most fun building apps that solve real world problems with a seamless user
        experience. Thanks for stopping by!
      </motion.p>
      <motion.a
        id="about-cta-get-in-touch"
        href="#contact"
        className={styles.cta}
        {...fadeUp(0.45)}
        onClick={e => {
          e.preventDefault()
          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' })
        }}
      >
        Get in Touch
      </motion.a>
    </div>

    {/* Orbiting tech badges — desktop only */}
    <div className={styles.orbitContainer}>
      {allBadges.map((skill, i) => (
        <OrbitBadge key={skill.name} skill={skill} index={i} total={allBadges.length} />
      ))}
    </div>

    {/* Tech list — mobile only */}
    <div className={styles.techList}>
      {categoryOrder.map(cat => (
        <div key={cat} className={styles.techGroup}>
          <span className={styles.techGroupLabel}>{cat}</span>
          <div className={styles.techPills}>
            {allBadges.filter(b => b.category === cat).map(skill => (
              <span key={skill.name} className={styles.techPill}>{skill.name}</span>
            ))}
          </div>
        </div>
      ))}
    </div>

  </section>
)

export default About
