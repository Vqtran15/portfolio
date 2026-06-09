import React from 'react'
import { motion } from 'framer-motion'
import * as styles from './About.module.css'

const skills = [
  { category: 'Frontend', items: ['React', 'TypeScript', 'Next.js', 'Gatsby', 'CSS / Sass'] },
  { category: 'Backend', items: ['Node.js', 'Express', 'Python', 'PostgreSQL', 'MongoDB'] },
  { category: 'Tools', items: ['Git', 'Docker', 'AWS', 'Figma', 'Jest'] },
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
          I'm a full-stack developer passionate about building thoughtful digital experiences
          that balance form and function. I love the intersection of clean code and great design —
          where technology meets creativity.
        </motion.p>
        <motion.p
          className={styles.bio}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          When I'm not coding, you'll find me exploring mid-century design, experimenting with
          generative art, or hunting for the perfect cup of coffee.
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
        {skills.map((group, i) => (
          <motion.div
            key={i}
            className={styles.skillGroup}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 * i }}
          >
            <h4 className={styles.skillCategory}>{group.category}</h4>
            <div className={styles.skillItems}>
              {group.items.map((skill, j) => (
                <span key={j} className={styles.skillBadge}>{skill}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>

    <div className={styles.decorRing} aria-hidden="true" />
  </section>
)

export default About
