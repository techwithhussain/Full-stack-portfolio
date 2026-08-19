import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Eye, ChevronDown, TrendingUp, Cpu, Globe, Brain, Smartphone, Check, Code, MapPin, Target } from 'lucide-react'
import { IconGithub, IconLinkedin, IconInstagram, IconYoutube, IconFacebook } from '@/components/common/SocialIcons'
import { SITE, SOCIAL } from '@/data/constants'
import styles from './HeroSection.module.css'

const IconWP = ({ size = 20, className }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
    <path d="M12.158 12.786l-2.698 7.84c.813.23 1.672.374 2.56.374.96 0 1.882-.17 2.74-.475-.027-.043-.057-.096-.082-.146l-2.52-7.593zm-3.238.16l2.193 6.368C8.5 18.267 6.67 16.485 5.923 14.15c.036-.008.066-.017.098-.024.966-.184 1.65-.302 1.65-.302.485-.084.426-.78-.06-.713 0 0-.496.067-1.042.1l2.35-6.386 2.062 6.12zM12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0zm0 1.2c5.965 0 10.8 4.835 10.8 10.8 0 2.278-.71 4.39-1.92 6.136L15.35 4.364c.563-.03 1.093-.1 1.093-.1.487-.07.432-.782-.054-.716 0 0-.486.066-1.344.1l1.83-5.267C15.525.86 13.824.6 12 .6c-2.072 0-4.017.345-5.83.972l2.673 7.747 3.315-9.319z" />
  </svg>
)

const ROLES = [
  'Web Developer in Kashmir',
  'SEO Expert in J&K',
  'WordPress Developer',
  'Digital Marketing Expert',
]

const SOCIAL_ICONS = {
  github:    { icon: <IconGithub    size={18} />, label: 'GitHub' },
  linkedin:  { icon: <IconLinkedin  size={18} />, label: 'LinkedIn' },
  instagram: { icon: <IconInstagram size={18} />, label: 'Instagram' },
  youtube:   { icon: <IconYoutube   size={18} />, label: 'YouTube' },
  facebook:  { icon: <IconFacebook  size={18} />, label: 'Facebook' },
}

// ── Typewriter hook ──────────────────────────────────────────
function useTypewriter(words, speed = 90, pause = 1600) {
  const [display,  setDisplay]  = useState('')
  const [wordIdx,  setWordIdx]  = useState(0)
  const [charIdx,  setCharIdx]  = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[wordIdx] || words[0] || ''
    let timeout

    if (!deleting && charIdx <= current.length) {
      timeout = setTimeout(() => {
        setDisplay(current.slice(0, charIdx))
        setCharIdx((c) => c + 1)
      }, charIdx === current.length ? pause : speed)
    } else if (deleting && charIdx >= 0) {
      timeout = setTimeout(() => {
        setDisplay(current.slice(0, charIdx))
        setCharIdx((c) => c - 1)
      }, speed / 2)
    }

    if (!deleting && charIdx > current.length) {
      setTimeout(() => setDeleting(true), pause)
    }
    if (deleting && charIdx < 0) {
      setDeleting(false)
      setWordIdx((w) => (w + 1) % words.length)
      setCharIdx(0)
    }

    return () => clearTimeout(timeout)
  }, [charIdx, deleting, wordIdx, words, speed, pause])

  return display
}

// ── Floating geometric shape ─────────────────────────────────
function FloatShape({ className, style, delay = 0 }) {
  return (
    <motion.div
      className={`${styles.shape} ${className}`}
      style={style}
      animate={{ y: [0, -24, 0], rotate: [0, 10, 0] }}
      transition={{ duration: 6 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
    />
  )
}

// ── Main Hero ────────────────────────────────────────────────
export default function HeroSection() {
  const role        = useTypewriter(ROLES)
  const sectionRef  = useRef(null)
  const { scrollY } = useScroll()
  const yParallax   = useTransform(scrollY, [0, 500], [0, 60])

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
  }
  const itemVariants = {
    hidden:  { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
  }

  return (
    <section className={styles.hero} ref={sectionRef} id="home" aria-label="Hero section">
      {/* ── Background effects ── */}
      <motion.div className={styles.bgLayer} style={{ y: yParallax }}>
        <div className={styles.orb1} />
        <div className={styles.orb2} />
        <div className={styles.orb3} />
        <div className={styles.grid} aria-hidden="true" />
      </motion.div>

      {/* ── Floating shapes ── */}
      <FloatShape className={styles.geo1} delay={0} />
      <FloatShape className={styles.geo2} delay={1.5} />
      <FloatShape className={styles.geo3} delay={3} />
      <FloatShape className={styles.geo4} delay={0.8} />
      <FloatShape className={styles.geo5} delay={2.2} />

      {/* ── Content ── */}
      <div className="container">
        <div className={styles.heroGrid}>
          <motion.div
            className={styles.content}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Greeting badge */}
            <motion.div variants={itemVariants} className={styles.greeting}>
              <span className={styles.greetDot} />
              <span>Available for Freelance Work</span>
            </motion.div>

            {/* Main heading */}
            <motion.div variants={itemVariants} className={styles.headingWrap}>
              <div className={styles.helloRow}>
                <p className={styles.hello}>Hello, I'm</p>
                <svg className={styles.handArrow} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M30 10C24 12 18 16 12 24M12 24C15 24 18 23 20 22M12 24C12 20 13 17 14 15" stroke="#00FF9D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h1 className={styles.name}>
                Hussain<br />
                <span className={styles.lastNameGradient}>
                  Lone
                  <svg className={styles.swash} viewBox="0 0 200 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12C60 2 140 2 195 12" stroke="#00FF9D" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                </span>
              </h1>
            </motion.div>

            {/* Typewriter role switcher */}
            <motion.div variants={itemVariants} className={styles.roleWrap}>
              <span className={styles.rolePrefix}>I'm a </span>
              <span className={styles.roleText}>
                {role}
                <span className={styles.cursor}>|</span>
              </span>
            </motion.div>

            {/* Bio & Subtext */}
            <motion.div variants={itemVariants} className={styles.bioContainer}>
              <p className={styles.bio}>
                Hussain Lone — Best web developer in Srinagar, J&K. I craft high-performance websites, SEO strategies & Meta Ads campaigns that help businesses in Kashmir and worldwide dominate their digital presence.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className={styles.ctaGroup}>
              <Link to="/contact/" className={`btn btn-primary btn-lg ${styles.btnHire}`} data-cursor="hover">
                Hire Me <ArrowRight size={18} />
              </Link>
              <Link to="/projects/" className={`btn btn-outline btn-lg ${styles.btnProjects}`} data-cursor="hover">
                <Eye size={18} /> View Projects
              </Link>
            </motion.div>

            {/* Horizontal Social Proof Cards */}
            <motion.div variants={itemVariants} className={styles.socialProofGridRow}>
              <div className={styles.proofItemCard}>
                <MapPin size={16} className={styles.proofIcon} /> Srinagar, J&K
              </div>
              <div className={styles.proofItemCard}>
                <Globe size={16} className={styles.proofIcon} /> Available Worldwide
              </div>
              <div className={styles.proofItemCard}>
                <TrendingUp size={16} className={styles.proofIcon} /> SEO Optimized
              </div>
              <div className={styles.proofItemCard}>
                <Smartphone size={16} className={styles.proofIcon} /> 100% Responsive
              </div>
            </motion.div>

            {/* Social strip */}
            <motion.div variants={itemVariants} className={styles.socialStrip}>
              <span className={styles.socialLabel}>Follow me</span>
              <div className={styles.socialDivider} />
              <div className={styles.socialGroup}>
                {Object.entries(SOCIAL).map(([key, url]) => (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialBtn}
                    aria-label={SOCIAL_ICONS[key]?.label}
                    data-cursor="hover"
                  >
                    {SOCIAL_ICONS[key]?.icon}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Image Column - YouTube Shorts Feature Video */}
          <div className={`${styles.imageCol} ${styles.imgFadeIn}`}>
            <div className={styles.shortContainer}>
              {/* Volumetric Glow Backdrop */}
              <div className={styles.shortBackdrop} />

              {/* Top Live Badge */}
              <div className={styles.shortHeaderBadge}>
                <span className={styles.shortRedDot} />
                <span>FEATURED YOUTUBE SHORT</span>
              </div>

              {/* Glass Phone Frame with YouTube Short Embed */}
              <div className={styles.phoneFrame}>
                <iframe
                  src="https://www.youtube.com/embed/HpShgdL6xOU?rel=0&modestbranding=1&controls=1"
                  title="Hussain Lone YouTube Short"
                  className={styles.shortIframe}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              {/* YouTube Channel Subscribe CTA */}
              <a
                href="https://www.youtube.com/@Tech.WithHussain?sub_confirmation=1"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ytSubscribeCard}
                data-cursor="hover"
              >
                <div className={styles.ytCardLeft}>
                  <div className={styles.ytIconBadge}>
                    <IconYoutube size={20} />
                  </div>
                  <div className={styles.ytCardText}>
                    <span className={styles.ytCardTitle}>Subscribe on YouTube</span>
                    <span className={styles.ytCardSub}>@Tech.WithHussain</span>
                  </div>
                </div>
                <div className={styles.ytSubBtn}>
                  <span>Subscribe</span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* ── Stats strip ── */}
        <motion.div
          className={styles.statsStrip}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          {[
            { value: '50+', label: 'Projects Done' },
            { value: '30+', label: 'Happy Clients' },
            { value: '3+',  label: 'Years Exp.' },
            { value: '10+', label: 'Countries' },
          ].map((s) => (
            <div key={s.label} className={styles.stat}>
              <span className={styles.statValue}>{s.value}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.a
        href="#about"
        className={styles.scrollDown}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ delay: 2, duration: 1.5, repeat: Infinity }}
        aria-label="Scroll down"
      >
        <ChevronDown size={22} />
      </motion.a>
    </section>
  )
}
