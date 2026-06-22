import React from 'react'
import { motion } from 'framer-motion'
import * as styles from './Projects.module.css'
import { projects } from '../data/projects'

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

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.5, delay, ease: 'easeOut' },
})

const ProjectSection = ({ project, index }) => {
  const isOrange = index % 2 === 0
  const accentClass = isOrange ? styles.accentOrange : styles.accentGreen
  const num = String(index + 1).padStart(2, '0')
  const total = String(projects.length).padStart(2, '0')
  const slug = project.title.toLowerCase().replace(/\s+/g, '-')
  const isLast = index === projects.length - 1

  return (
    <section id={`project-${index}`} className={`${styles.section} ${accentClass}`}>
    <div className={styles.card}>

      {/* Left — text */}
      <div className={styles.left}>
        <motion.div className={styles.counter} {...fadeUp(0)}>
          <span className={styles.counterNum}>{num}</span>
          <span className={styles.counterTotal}> / {total}</span>
        </motion.div>

        <motion.h2 className={styles.title} {...fadeUp(0.08)}>
          {project.title}
        </motion.h2>

        <motion.p className={styles.desc} {...fadeUp(0.16)}>
          {project.description}
        </motion.p>

        <motion.div className={styles.tech} {...fadeUp(0.22)}>
          {project.tech.map(t => (
            <span key={t} className={styles.pill}>{t}</span>
          ))}
        </motion.div>

        <motion.div className={styles.links} {...fadeUp(0.28)}>
          <a
            id={`project-${slug}-github`}
            href={project.github}
            className={styles.linkBtn}
            target="_blank"
            rel="noopener noreferrer"
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
            >
              <ExternalIcon /> Live Site
            </a>
          )}
        </motion.div>

        {isLast && (
          <motion.div className={styles.cooking} {...fadeUp(0.36)}>
            <svg viewBox="0 0 64 64" fill="none" className={styles.pot} aria-hidden="true">
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
          </motion.div>
        )}
      </div>

      {/* Right — monitor mockup */}
      <div className={styles.right}>
        <motion.div
          className={styles.monitorWrap}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className={styles.monitorBezel}>
            <div className={styles.monitorCam} />
            <div className={styles.monitorScreen}>
              {project.video ? (
                <video
                  className={styles.monitorMedia}
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src={project.video} type="video/mp4" />
                </video>
              ) : project.screenshot ? (
                <img
                  src={project.screenshot}
                  alt={`${project.title} screenshot`}
                  className={styles.monitorMedia}
                />
              ) : null}
            </div>
          </div>
          <div className={styles.monitorNeck} />
          <div className={styles.monitorBase} />
        </motion.div>
      </div>

    </div>
    </section>
  )
}

const Projects = () => (
  <>
    {projects.map((project, i) => (
      <ProjectSection key={i} project={project} index={i} />
    ))}
  </>
)

export default Projects
