import React from 'react'
import { motion } from 'framer-motion'
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
          the implementation function across websites and mobile apps. But my passion for building
          goes beyond the day job. My technical journey started back in 2020 when I taught myself
          HTML, CSS, JavaScript, React, and Python. Fast forward to 2026 — I'm leveraging those
          foundational skills to build applications alongside Claude.
        </motion.p>
        <motion.p
          className={styles.bio}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          This portfolio was built using React and Gatsby, and my full stack coffee log application
          is featured below. I'll be enhancing that app while building new projects designed to
          solve practical, everyday problems. For me, designing and building products with a
          seamless user experience is where the real fun is. Thank you for visiting my portfolio!
        </motion.p>

        <motion.a
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
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 * i, ease: 'backOut' }}
            >
              <span className={`${styles.skillBadge} ${styles['orbit' + (i % 6)]}`}>
                <span className={styles.badgeName}>{skill.name}</span>
                <span className={styles.badgeCat}>{skill.category}</span>
              </span>
            </motion.div>
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
