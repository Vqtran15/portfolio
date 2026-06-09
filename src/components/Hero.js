import React from 'react'
import { motion } from 'framer-motion'
import * as styles from './Hero.module.css'

const floatTransition = (delay = 0) => ({
  y: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay },
  opacity: { duration: 0.8, delay: 0.3 },
  scale: { duration: 0.8, delay: 0.3, ease: 'easeOut' },
})

const Hero = () => (
  <section id="home" className={styles.hero}>
    <div className={styles.content}>
      <motion.p
        className={styles.greeting}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Hello, I'm
      </motion.p>

      <motion.h1
        className={styles.name}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        Vuong Tran
      </motion.h1>

      <motion.p
        className={styles.tagline}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        Principal Implementation Consultant
      </motion.p>

      <motion.div
        className={styles.ctas}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <a href="#projects" className={styles.btnPrimary}>View My Work</a>
        <a href="#about" className={styles.btnSecondary}>About Me</a>
      </motion.div>
    </div>

    <div className={styles.visual}>
      {/* Floating decorative shapes */}
      <motion.div
        className={styles.circleOrange}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.14, y: [0, -18, 0] }}
        transition={floatTransition(1)}
      />
      <motion.div
        className={styles.circleGreen}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.18, y: [0, 14, 0] }}
        transition={floatTransition(1.4)}
      />
      <motion.div
        className={styles.squareMustard}
        initial={{ opacity: 0, rotate: 0 }}
        animate={{ opacity: 0.28, rotate: [15, 22, 15], y: [0, -10, 0] }}
        transition={{
          opacity: { duration: 0.7, delay: 0.7 },
          rotate: { duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 },
          y: { duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 },
        }}
      />

      {/* Avatar */}
      <motion.div
        className={styles.avatarRing}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6, ease: 'backOut' }}
      >
        <div className={styles.avatar}>
          <span>VT</span>
        </div>
      </motion.div>
    </div>

    <motion.a
      href="#projects"
      className={styles.scrollIndicator}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.3 }}
    >
      <div className={styles.scrollLine} />
      <span>Scroll</span>
    </motion.a>
  </section>
)

export default Hero
