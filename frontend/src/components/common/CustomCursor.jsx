import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import styles from './CustomCursor.module.css'

export default function CustomCursor() {
  const location = useLocation()
  const [enabled, setEnabled] = useState(() => {
    if (typeof window === 'undefined') return true
    const stored = localStorage.getItem('custom_cursor_public')
    if (stored !== null) return stored === '1'
    return true
  })

  const cursorRef = useRef(null)
  const ringRef   = useRef(null)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  const springX = useSpring(mouseX, { stiffness: 800, damping: 40 })
  const springY = useSpring(mouseY, { stiffness: 800, damping: 40 })

  const ringX = useSpring(mouseX, { stiffness: 200, damping: 30 })
  const ringY = useSpring(mouseY, { stiffness: 200, damping: 30 })

  // Listen to route change and browser events to sync cursor toggle state
  useEffect(() => {
    const handleSettingsChange = () => {
      const stored = localStorage.getItem('custom_cursor_public')
      if (stored !== null) {
        setEnabled(stored === '1')
      } else {
        setEnabled(true)
      }
    }

    handleSettingsChange()

    window.addEventListener('cursor-settings-changed', handleSettingsChange)
    return () => window.removeEventListener('cursor-settings-changed', handleSettingsChange)
  }, [location.pathname])

  // Fetch settings from the backend once on mount to ensure cache is correct
  useEffect(() => {
    axios.get('/api/settings.php')
      .then(res => {
        if (res.data.success) {
          const pubVal = res.data.data.custom_cursor_public ?? '1'
          localStorage.setItem('custom_cursor_public', pubVal)
          setEnabled(pubVal === '1')
        }
      })
      .catch(() => {})
  }, []) // run once on mount

  // Apply HTML attribute so CSS overrides are active
  useEffect(() => {
    document.documentElement.setAttribute('data-custom-cursor', enabled ? 'true' : 'false')
  }, [enabled])

  useEffect(() => {
    if (!enabled) return

    const move = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const addHover = () => {
      cursorRef.current?.classList.add(styles.hovered)
      ringRef.current?.classList.add(styles.hovered)
    }
    const removeHover = () => {
      cursorRef.current?.classList.remove(styles.hovered)
      ringRef.current?.classList.remove(styles.hovered)
    }

    window.addEventListener('mousemove', move)

    const interactives = document.querySelectorAll('a, button, [data-cursor="hover"], input, textarea, select')
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', addHover)
      el.addEventListener('mouseleave', removeHover)
    })

    return () => {
      window.removeEventListener('mousemove', move)
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', addHover)
        el.removeEventListener('mouseleave', removeHover)
      })
    }
  }, [mouseX, mouseY, enabled])

  // Hide on touch devices or when disabled
  if (!enabled) return null
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null

  return (
    <>
      {/* Dot */}
      <motion.div
        ref={cursorRef}
        className={styles.dot}
        style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
      />
      {/* Ring */}
      <motion.div
        ref={ringRef}
        className={styles.ring}
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
      />
    </>
  )
}
