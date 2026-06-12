import { useState, useEffect } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@!'
const rand = () => CHARS[Math.floor(Math.random() * CHARS.length)]

const useScramble = (finalText, duration = 1600, startDelay = 700) => {
  const [display, setDisplay] = useState(finalText)

  useEffect(() => {
    setDisplay(finalText.split('').map(c => (c === ' ' ? ' ' : rand())).join(''))
    let interval
    const timeout = setTimeout(() => {
      const start = Date.now()
      interval = setInterval(() => {
        const progress = Math.min((Date.now() - start) / duration, 1)
        const resolved = Math.floor(progress * finalText.length)
        setDisplay(
          finalText.split('').map((char, i) =>
            i < resolved || char === ' ' ? char : rand()
          ).join('')
        )
        if (progress >= 1) {
          clearInterval(interval)
          setDisplay(finalText)
        }
      }, 45)
    }, startDelay)
    return () => { clearTimeout(timeout); clearInterval(interval) }
  }, [finalText])

  return display
}

export default useScramble
