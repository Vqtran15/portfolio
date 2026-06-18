import React, { useState } from 'react'
import { motion } from 'framer-motion'
import * as styles from './Projects.module.css'
import { projects } from '../data/projects'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const GithubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
)

const ExternalIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
  </svg>
)

const FlipCard = ({ project, colorClass, index }) => {
  const [flipped, setFlipped] = useState(false)
  const slug = project.title.toLowerCase().replace(/\s+/g, '-')

  return (
    <motion.div
      className={styles.flipWrapper}
      variants={cardVariants}
      onClick={() => setFlipped(f => !f)}
    >
      <div className={`${styles.card} ${colorClass} ${flipped ? styles.cardFlipped : ''}`}>

        {/* Front — screenshot */}
        <div className={styles.cardFront}>
          {project.screenshot ? (
            <>
              <img
                src={project.screenshot}
                alt={`${project.title} screenshot`}
                className={styles.screenshotImg}
              />
              <div className={styles.frontOverlay}>
                <span className={styles.frontTitle}>{project.title}</span>
                <span className={styles.frontHint}>Click to learn more</span>
              </div>
            </>
          ) : (
            <div className={styles.frontNoImage}>
              <span className={styles.frontTitle}>{project.title}</span>
            </div>
          )}
        </div>

        {/* Back — details */}
        <div className={styles.cardBack}>
          <h3 className={styles.backTitle}>{project.title}</h3>
          <p className={styles.backDesc}>{project.description}</p>
          <div className={styles.backTech}>
            {project.tech.map((t, j) => (
              <span key={j} className={styles.backPill}>{t}</span>
            ))}
          </div>
          <div className={styles.backLinks}>
            <a
              id={`project-${slug}-github`}
              href={project.github}
              className={styles.linkBtn}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
            >
              <GithubIcon /> GitHub
            </a>
            {project.live && (
              <a
                id={`project-${slug}-live-site`}
                href={project.live}
                className={`${styles.linkBtn} ${styles.linkBtnPrimary}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
              >
                <ExternalIcon /> Live Site
              </a>
            )}
          </div>
        </div>

      </div>
    </motion.div>
  )
}

const Projects = () => (
  <section id="projects" className={styles.section}>
    <div className={styles.header}>
      <motion.span
        className={styles.label}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        What I've Built
      </motion.span>
      <motion.h2
        className={styles.title}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        Projects
      </motion.h2>
    </div>

    <motion.div
      className={styles.grid}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {projects.map((project, i) => {
        const colorClass = i % 2 === 0 ? styles.cardOrange : styles.cardGreen
        return <FlipCard key={i} project={project} colorClass={colorClass} index={i} />
      })}
    </motion.div>

    <div className={styles.cookingFooter}>
      <svg className={styles.pot} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <ellipse className={styles.steam1} cx="22" cy="18" rx="3" ry="5" fill="#C9A040" opacity="0.6" />
        <ellipse className={styles.steam2} cx="32" cy="15" rx="3" ry="5" fill="#C9A040" opacity="0.6" />
        <ellipse className={styles.steam3} cx="42" cy="18" rx="3" ry="5" fill="#C9A040" opacity="0.6" />
        <rect x="16" y="27" width="32" height="5" rx="2.5" fill="#4A3728" />
        <rect x="28" y="23" width="8" height="5" rx="2" fill="#4A3728" />
        <path d="M14 32 Q12 50 32 52 Q52 50 50 32 Z" fill="#3D6B35" />
        <rect x="8" y="32" width="7" height="5" rx="2.5" fill="#4A3728" />
        <rect x="49" y="32" width="7" height="5" rx="2.5" fill="#4A3728" />
      </svg>
      <span className={styles.cookingText}>More projects cooking</span>
    </div>
  </section>
)

export default Projects
