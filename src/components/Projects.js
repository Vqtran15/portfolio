import React, { useState, useEffect, useRef } from 'react'
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

const BeanIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <g transform="rotate(-20, 14, 14)">
      <ellipse cx="14" cy="14" rx="7.5" ry="12" fill="#8B5A2B" />
      <ellipse cx="14" cy="14" rx="5.5" ry="10" fill="#6B3A1A" />
      <path d="M14 4.5 Q10 14 14 23.5" stroke="#3A1A08" strokeWidth="1.8" strokeLinecap="round" fill="none" />
    </g>
  </svg>
)

const CatchTheBeanGame = () => {
  const [phase, setPhase] = useState('idle')   // idle | playing | done
  const [score, setScore] = useState(0)
  const [best, setBest] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [beans, setBeans] = useState([])
  const scoreRef = useRef(0)

  useEffect(() => { scoreRef.current = score }, [score])

  // Countdown
  useEffect(() => {
    if (phase !== 'playing') return
    if (timeLeft <= 0) {
      setPhase('done')
      setBest(b => Math.max(b, scoreRef.current))
      setBeans([])
      return
    }
    const t = setTimeout(() => setTimeLeft(s => s - 1), 1000)
    return () => clearTimeout(t)
  }, [phase, timeLeft])

  // Spawn beans
  useEffect(() => {
    if (phase !== 'playing') return
    const spawn = () => {
      const lifetime = Math.max(650, 1500 - scoreRef.current * 35)
      const id = Date.now() + Math.random()
      setBeans(b => [...b, { id, x: 5 + Math.random() * 82, y: 5 + Math.random() * 72, caught: false }])
      setTimeout(() => setBeans(b => b.filter(bean => bean.id !== id)), lifetime)
    }
    spawn()
    const interval = setInterval(spawn, 850)
    return () => clearInterval(interval)
  }, [phase])

  const catchBean = (id) => {
    // flip to mug icon briefly, then remove
    setBeans(b => b.map(bean => bean.id === id ? { ...bean, caught: true } : bean))
    setScore(s => s + 1)
    setTimeout(() => setBeans(b => b.filter(bean => bean.id !== id)), 320)
  }

  const start = () => {
    setScore(0)
    scoreRef.current = 0
    setTimeLeft(30)
    setBeans([])
    setPhase('playing')
  }

  return (
    <div className={styles.game}>
      <div className={styles.gameArea}>
        {phase === 'idle' && (
          <div className={styles.gameScreen}>
            <p className={styles.gameMsg}>Grab the beans before they disappear!</p>
            <button className={styles.gameBtn} onClick={start}>Start</button>
          </div>
        )}

        {phase === 'done' && (
          <div className={styles.gameScreen}>
            <p className={styles.gameResult}>
              You caught <strong>{score}</strong> bean{score !== 1 ? 's' : ''}
            </p>
            {best > 0 && <p className={styles.gameBest}>Best: {best}</p>}
            <button className={styles.gameBtn} onClick={start}>Play Again</button>
          </div>
        )}

        {phase === 'playing' && (
          <>
            <div className={styles.gameHUD}>
              <span>☕ {score}</span>
              <span className={styles.gameTimer}>{timeLeft}s</span>
            </div>
            {beans.map(bean => (
              <button
                key={bean.id}
                className={`${styles.beanBtn} ${bean.caught ? styles.beanCaught : ''}`}
                style={{ left: `${bean.x}%`, top: `${bean.y}%` }}
                onClick={() => !bean.caught && catchBean(bean.id)}
              >
                {bean.caught ? '☕' : <BeanIcon />}
              </button>
            ))}
          </>
        )}
      </div>
    </div>
  )
}

const ComingSoonSection = () => (
  <section id="coming-soon" className={styles.comingSoonSection}>
    <div className={styles.comingSoonInner}>
      <motion.div
        className={styles.comingSoonPot}
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <svg viewBox="0 0 80 90" fill="none" overflow="visible" aria-hidden="true">
          {/* Steam */}
          <ellipse className={styles.steam1} cx="26" cy="18" rx="3" ry="6" fill="#C9A040" opacity="0.85" />
          <ellipse className={styles.steam2} cx="40" cy="14" rx="3" ry="6" fill="#C9A040" opacity="0.85" />
          <ellipse className={styles.steam3} cx="54" cy="18" rx="3" ry="6" fill="#C9A040" opacity="0.85" />
          {/* Cup rim */}
          <rect x="9" y="27" width="54" height="5" rx="2.5" fill="#E8D5B5" />
          {/* Coffee surface */}
          <ellipse cx="36" cy="29" rx="25" ry="5" fill="#2C1A0A" />
          {/* Coffee sheen */}
          <ellipse cx="30" cy="27" rx="8" ry="2.5" fill="#4A2E1A" opacity="0.6" />
          {/* Cup body */}
          <path d="M11 32 L13 70 Q13 75 18 75 L54 75 Q59 75 59 70 L61 32 Z" fill="#D4B896" />
          {/* Cup body shadow */}
          <path d="M52 32 L54 70 Q54 75 54 75 L54 75 Q59 75 59 70 L61 32 Z" fill="#C0A07A" />
          {/* Handle */}
          <path d="M61 41 Q75 41 75 53 Q75 65 61 63" stroke="#D4B896" strokeWidth="9" strokeLinecap="round" fill="none" />
          <path d="M61 41 Q72 41 72 53 Q72 63 61 61" stroke="#C0A07A" strokeWidth="4" strokeLinecap="round" fill="none" />
          {/* Saucer */}
          <ellipse cx="36" cy="79" rx="36" ry="5.5" fill="#B89060" />
          <ellipse cx="36" cy="77" rx="36" ry="5.5" fill="#D4B896" />
        </svg>
      </motion.div>

      <motion.h2 className={styles.comingSoonTitle} {...fadeUp(0.1)}>
        More projects brewing
      </motion.h2>

      <motion.p className={styles.comingSoonGamePrompt} {...fadeUp(0.2)}>
        In the meantime, grab beans below to make some coffee!
      </motion.p>

      <motion.div style={{ width: '100%' }} {...fadeUp(0.3)}>
        <CatchTheBeanGame />
      </motion.div>
    </div>
  </section>
)

const Projects = () => (
  <>
    {projects.map((project, i) => (
      <ProjectSection key={i} project={project} index={i} />
    ))}
    <ComingSoonSection />
  </>
)

export default Projects
