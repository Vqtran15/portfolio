import React from 'react'
import { motion } from 'framer-motion'
import * as styles from './Projects.module.css'

const projects = [
  {
    title: 'Recipe Finder App',
    description: 'A full-stack app to search, save, and share recipes with user authentication and a dynamic ingredient filter.',
    tech: ['React', 'Node.js', 'MongoDB'],
    color: 'orange',
    github: '#',
    live: '#',
  },
  {
    title: 'Weather Dashboard',
    description: 'Real-time weather visualization with 7-day forecasts, interactive maps, and location-based alerts.',
    tech: ['TypeScript', 'React', 'OpenWeather API'],
    color: 'green',
    github: '#',
    live: '#',
  },
  {
    title: 'Task Manager',
    description: 'Collaborative project management with drag-and-drop boards, team workspaces, and real-time updates.',
    tech: ['Next.js', 'Prisma', 'PostgreSQL'],
    color: 'orange',
    github: '#',
    live: '#',
  },
  {
    title: 'Portfolio Generator',
    description: 'A JAMstack tool that generates static portfolio sites from a single config file. Deploy with one click.',
    tech: ['Gatsby', 'GraphQL', 'Netlify'],
    color: 'green',
    github: '#',
    live: '#',
  },
  {
    title: 'Chat Application',
    description: 'Real-time messaging with rooms, file sharing, read receipts, and end-to-end encryption.',
    tech: ['Socket.io', 'Express', 'React'],
    color: 'orange',
    github: '#',
    live: '#',
  },
  {
    title: 'E-commerce Store',
    description: 'A production-ready storefront with cart, checkout, Stripe payments, and an admin dashboard.',
    tech: ['React', 'Stripe', 'Firebase'],
    color: 'green',
    github: '#',
    live: '#',
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11 } },
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
      {projects.map((project, i) => (
        <motion.div
          key={i}
          className={`${styles.card} ${project.color === 'green' ? styles.cardGreen : styles.cardOrange}`}
          variants={cardVariants}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          whileHover={{ y: -6, transition: { duration: 0.2 } }}
        >
          <div className={styles.cardAccent} />
          <div className={styles.cardBody}>
            <h3 className={styles.cardTitle}>{project.title}</h3>
            <p className={styles.cardDesc}>{project.description}</p>
            <div className={styles.tech}>
              {project.tech.map((t, j) => (
                <span key={j} className={styles.pill}>{t}</span>
              ))}
            </div>
          </div>
          <div className={styles.cardLinks}>
            <a href={project.github} className={styles.linkBtn} aria-label="GitHub repository">
              <GithubIcon /> GitHub
            </a>
            <a href={project.live} className={`${styles.linkBtn} ${styles.linkBtnPrimary}`} aria-label="Live site">
              <ExternalIcon /> Live Site
            </a>
          </div>
        </motion.div>
      ))}
    </motion.div>
  </section>
)

export default Projects
