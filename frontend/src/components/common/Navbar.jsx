import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ExternalLink, Sun, Moon } from 'lucide-react'
import { NAV_LINKS, SITE, SOCIAL } from '@/data/constants'
import ScrollProgress from './ScrollProgress'
import Logo from './Logo'
import styles from './Navbar.module.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  const [mode, setMode] = useState(() => {
    if (typeof window === 'undefined') return 'dark'
    return localStorage.getItem('site_mode') || 'dark'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-mode', mode)
  }, [mode])

  const toggleMode = () => {
    const newMode = mode === 'dark' ? 'light' : 'dark'
    setMode(newMode)
    localStorage.setItem('site_mode', newMode)
    window.dispatchEvent(new Event('color-scheme-changed'))
  }

  useEffect(() => {
    const handleSync = () => {
      const syncedMode = localStorage.getItem('site_mode') || 'dark'
      setMode(syncedMode)
    }
    window.addEventListener('color-scheme-changed', handleSync)
    return () => window.removeEventListener('color-scheme-changed', handleSync)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false) }, [location])

  // Custom function to evaluate active route highlighting, preventing hash links from matching parent paths on load
  const checkIsActive = (href, isActive) => {
    const hasHash = href.includes('#')
    if (hasHash) {
      return location.hash === href.substring(href.indexOf('#'))
    } else if (href === '/') {
      return isActive && !location.hash
    }
    return isActive
  }

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const menuVariants = {
    closed: { opacity: 0, x: '100%' },
    open: { opacity: 1, x: '0%', transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } },
    exit: { opacity: 0, x: '100%', transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] } },
  }

  const linkVariants = {
    closed: { opacity: 0, x: 40 },
    open: (i) => ({ opacity: 1, x: 0, transition: { delay: i * 0.06, duration: 0.35 } }),
  }

  return (
    <>
      <ScrollProgress />

      <header
        className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}
        role="banner"
      >
        <div className={`container ${styles.inner}`}>
          {/* ── Logo ── */}
          <Link to="/" aria-label="Tech With Hussain — Home" data-cursor="hover">
            <Logo mode="horizontal" />
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className={styles.desktopNav} aria-label="Main navigation">
            {NAV_LINKS.map(({ label, href }) => (
              <NavLink
                key={label}
                to={href}
                end
                className={({ isActive }) =>
                  `${styles.navLink} ${checkIsActive(href, isActive) ? styles.active : ''}`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* ── Desktop CTA ── */}
          <div className={styles.desktopCta}>
            <button
              onClick={toggleMode}
              className={styles.themeToggle}
              aria-label="Toggle dark and light mode (Desktop)"
              data-cursor="hover"
            >
              {mode === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <Link to="/contact/" className="btn btn-primary btn-sm">
              Hire Me
            </Link>
          </div>

          {/* ── Mobile CTA & Toggle (visible on mobile only) ── */}
          <div className={styles.mobileActions}>
            <button
              onClick={toggleMode}
              className={styles.themeToggle}
              aria-label="Toggle dark and light mode (Mobile)"
            >
              {mode === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* ── Hamburger ── */}
            <button
              className={`${styles.hamburger} ${mobileOpen ? styles.menuOpen : ''}`}
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              <AnimatePresence mode="wait">
                {mobileOpen
                  ? <motion.span key="x" style={{ display: 'flex' }} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}><X size={22} /></motion.span>
                  : <motion.span key="menu" style={{ display: 'flex' }} initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}><Menu size={22} /></motion.span>
                }
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* ── Mobile Full-Screen Menu ── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              className={styles.mobileMenu}
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="exit"
              aria-label="Mobile navigation"
            >
              <nav className={styles.mobileNav}>
                {NAV_LINKS.map(({ label, href }, i) => (
                  <motion.div key={label} custom={i} variants={linkVariants} initial="closed" animate="open">
                    <NavLink
                      to={href}
                      end
                      className={({ isActive }) =>
                        `${styles.mobileLink} ${checkIsActive(href, isActive) ? styles.mobileActive : ''}`
                      }
                    >
                      {label}
                    </NavLink>
                  </motion.div>
                ))}

                {/* Mobile CTA */}
                <motion.div custom={NAV_LINKS.length} variants={linkVariants} initial="closed" animate="open" className={styles.mobileCta}>
                  <Link to="/contact/" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                    Hire Me
                  </Link>
                  <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ width: '100%', justifyContent: 'center', gap: 8 }}>
                    WhatsApp <ExternalLink size={14} />
                  </a>
                </motion.div>

                {/* Social links in mobile menu */}
                <motion.div custom={NAV_LINKS.length + 1} variants={linkVariants} initial="closed" animate="open" className={styles.mobileSocial}>
                  {Object.entries(SOCIAL).map(([key, url]) => (
                    <a key={key} href={url} target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label={key}>
                      {getSocialIcon(key)}
                    </a>
                  ))}
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}

function getSocialIcon(key) {
  const icons = {
    facebook: 'f',
    instagram: '📷',
    youtube: '▶',
    linkedin: 'in',
    github: '⌥',
  }
  return icons[key] || key[0].toUpperCase()
}
