import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, Phone, Heart } from 'lucide-react'
import Logo from './Logo'
import axios from 'axios'

// Inline SVG brand icons (lucide removed these in v0.300+)
const IconFacebook  = () => <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
const IconInstagram = () => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
const IconYoutube   = () => <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 0 0 1.95-1.97A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon fill="#fff" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>
const IconLinkedin  = () => <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
const IconGithub    = () => <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
import { SITE, SOCIAL, NAV_LINKS } from '@/data/constants'
import { getEmail } from '@/utils/obfuscateEmail'
import styles from './Footer.module.css'

const SERVICES_LINKS = [
  { label: 'AI Development',       href: '/services/ai-development' },
  { label: 'WordPress Development', href: '/services/wordpress-development' },
  { label: 'SEO Services',          href: '/services/seo-services' },
  { label: 'Content Creation',      href: '/services/content-creation' },
  { label: 'Website Optimization',  href: '/services/website-optimization' },
]

const QUICK_LINKS = [
  { label: 'Home',           href: '/' },
  { label: 'About',          href: '/about' },
  { label: 'Projects',       href: '/projects' },
  { label: 'Blog',           href: '/blog' },
  { label: 'Experience',     href: '/experience' },
  { label: 'Contact',        href: '/contact' },
]

const SOCIAL_ICONS = {
  facebook:  <IconFacebook />,
  instagram: <IconInstagram />,
  youtube:   <IconYoutube />,
  linkedin:  <IconLinkedin />,
  github:    <IconGithub />,
}

export default function Footer() {
  const year = new Date().getFullYear()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState(null) // 'loading' | 'success' | 'error'
  const [msg, setMsg] = useState('')

  const handleSubscribe = async (e) => {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    setMsg('')
    try {
      const res = await axios.post('/api/newsletter/index.php', { email, source: 'footer' })
      if (res.data.success) {
        setStatus('success')
        setMsg(res.data.message || 'Subscribed successfully!')
        setEmail('')
      } else {
        setStatus('error')
        setMsg(res.data.message || 'Subscription failed.')
      }
    } catch (err) {
      setStatus('error')
      setMsg(err.response?.data?.message || 'Something went wrong. Please try again.')
    }
  }

  return (
    <footer className={styles.footer} role="contentinfo">
      {/* Top gradient border */}
      <div className={styles.topBorder} />

      <div className="container">
        {/* ── Main Grid ── */}
        <div className={styles.grid}>

          {/* Brand Column */}
          <div className={styles.brand}>
            <Link to="/" style={{ display: 'inline-block', marginBottom: 12 }} data-cursor="hover">
              <Logo mode="stacked" />
            </Link>
            <p className={styles.tagline}>{SITE.tagline}</p>

            {/* Social Icons */}
            <div className={styles.socials}>
              {Object.entries(SOCIAL).map(([key, url]) => (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label={key}
                  data-cursor="hover"
                >
                  {SOCIAL_ICONS[key]}
                </a>
              ))}
            </div>

            {/* Contact info */}
            <div className={styles.contactInfo}>
              <a href={`mailto:${getEmail()}`} className={styles.contactItem}>
                <Mail size={14} /> {getEmail()}
              </a>
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className={styles.contactItem}>
                <Phone size={14} /> {SITE.phone}
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.col}>
            <h3 className={styles.colTitle}>Quick Links</h3>
            <ul className={styles.linkList}>
              {QUICK_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link to={href} className={styles.link}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className={styles.col}>
            <h3 className={styles.colTitle}>Services</h3>
            <ul className={styles.linkList}>
              {SERVICES_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link to={href} className={styles.link}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className={styles.col}>
            <h3 className={styles.colTitle}>Stay Updated</h3>
            <p className={styles.newsletterText}>
              Get free tips on AI, WordPress & SEO straight to your inbox.
            </p>
            <form className={styles.newsletterForm} onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`form-input ${styles.emailInput}`}
                aria-label="Email address for newsletter"
                required
                disabled={status === 'loading'}
              />
              <button type="submit" className={`btn btn-primary btn-sm ${styles.subBtn}`} disabled={status === 'loading'}>
                {status === 'loading' ? 'Subbing...' : 'Subscribe'}
              </button>
            </form>
            {msg && (
              <p className={status === 'success' ? styles.successMsg : styles.errorMsg} style={{
                marginTop: 8,
                fontSize: 13,
                color: status === 'success' ? '#34d399' : '#f87171'
              }}>
                {msg}
              </p>
            )}
            <p className={styles.spamNote}>No spam. Unsubscribe anytime.</p>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {year} {SITE.name}. All rights reserved.
          </p>
          <p className={styles.madeWith}>
            Made with <Heart size={12} className={styles.heart} /> by Hussain Lone
          </p>
          <div className={styles.legalLinks}>
            <Link to="/privacy-policy" className={styles.legalLink}>Privacy Policy</Link>
            <span className={styles.dot}>·</span>
            <Link to="/terms" className={styles.legalLink}>Terms & Conditions</Link>
            <span className={styles.dot}>·</span>
            <Link to="/sitemap" className={styles.legalLink}>Sitemap</Link>
          </div>
        </div>
      </div>

      {/* Background orb */}
      <div className={styles.orb} aria-hidden="true" />
    </footer>
  )
}
