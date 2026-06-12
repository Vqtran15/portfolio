import React, { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import * as styles from './About.module.css'
import { projects, techCategoryMap } from '../data/projects'

const categoryOrder = ['Frontend', 'Backend', 'Tools']

const skills = (() => {
  const seen = new Set()
  const groups = {}
  projects.forEach(p =>
    p.tech.forEach(t => {
      if (!seen.has(t)) {
        seen.add(t)
        const cat = techCategoryMap[t] || 'Tools'
        if (!groups[cat]) groups[cat] = []
        groups[cat].push(t)
      }
    })
  )
  return categoryOrder.filter(c => groups[c]).map(c => ({ category: c, items: groups[c] }))
})()

const timeline = [
  { year: '2020', label: 'Self-taught HTML, CSS, JS, React & Python' },
  { year: '2022', label: 'Joined Contentsquare as Implementation Consultant' },
  { year: '2026', label: 'Building full-stack apps alongside Claude' },
]

const MagneticBadge = ({ skill, index }) => {
  const ref = useRef(null)
  const [hovered, setHovered] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 250, damping: 18 })
  const springY = useSpring(y, { stiffness: 250, damping: 18 })

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.35)
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.35)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setHovered(false)
  }

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={(e) => { handleMouseMove(e); setHovered(true) }}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, scale: 0.6 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.1 * index, ease: 'backOut' }}
    >
      <span className={`${styles.skillBadge} ${styles['orbit' + (index % 6)]} ${hovered ? styles.orbitPaused : ''}`}>
        <span className={styles.badgeName}>{skill.name}</span>
        <span className={styles.badgeCat}>{skill.category}</span>
      </span>
    </motion.div>
  )
}

const fadeInUp = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const About = () => (
  <section id="about" className={styles.section}>
    <div className={styles.inner}>
      <div>
        <motion.span
          className={styles.label}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Who I Am
        </motion.span>
        <motion.h2
          className={styles.title}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          About Me
        </motion.h2>
        <motion.p
          className={styles.bio}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          My name is Vuong and I'm a Principal Implementation Consultant at Contentsquare, leading
          the implementation function across websites and mobile apps. However, my passion for
          building goes beyond my day job. My technical journey started back in 2020 when I taught
          myself HTML, CSS, JavaScript, React, and Python. You'll find some of those old projects
          in my Github. Fast forward to 2026 — I'm leveraging those foundational skills to build
          applications alongside Claude.
        </motion.p>
        <motion.p
          className={styles.bio}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          For me, designing and building products with a seamless user experience is where the real
          fun is. Thank you for visiting my portfolio!
        </motion.p>

        <motion.a
          id="about-cta-get-in-touch"
          href="#contact"
          className={styles.cta}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          Get in Touch
        </motion.a>
      </div>

      <div className={styles.right}>
        {/* Tech badges */}
        <div className={styles.badgeCloud}>
          {skills.flatMap(group =>
            group.items.map(name => ({ name, category: group.category }))
          ).map((skill, i) => (
            <MagneticBadge key={i} skill={skill} index={i} />
          ))}
        </div>

        {/* Timeline */}
        <div className={styles.timeline}>
          {timeline.map((item, i) => (
            <motion.div
              key={i}
              className={styles.timelineItem}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * i }}
            >
              <span className={styles.timelineYear}>{item.year}</span>
              <div className={styles.timelineDot} />
              <span className={styles.timelineLabel}>{item.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>

    <div className={styles.decorRing} aria-hidden="true" />
  </section>
)

export default About
