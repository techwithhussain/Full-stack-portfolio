import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sparkles, Mail, Send, CheckCircle2, Clock, Calendar, ArrowRight } from 'lucide-react'
import SEOMeta from '@/components/common/SEOMeta'
import { blogPageSchema, breadcrumbSchema } from '@/utils/schema'
import axios from 'axios'
import styles from './BlogPage.module.css'

export default function BlogPage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState(null) // 'loading' | 'success' | 'error'
  const [msg, setMsg] = useState('')

  const handleSubscribe = async (e) => {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    setMsg('')
    try {
      const res = await axios.post('/api/newsletter/index.php', { email, source: 'blog_coming_soon' })
      if (res.data.success) {
        setStatus('success')
        setMsg(res.data.message || 'Subscribed successfully! You will be notified when articles go live.')
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
    <>
      <SEOMeta
        title="Blog · Tech Insights Coming Soon"
        description="In-depth articles, case studies, and guides on AI workflows, SEO strategies, and modern web development are coming soon."
        canonical="/blog"
        schema={[blogPageSchema(), breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog' }])]}
      />

      <div className={styles.blogPage}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className="container">
            <div className="text-center">
              <span className="section-label">Knowledge Hub</span>
              <h1 className={styles.mainTitle}>
                Tech Insights & <span>Guides</span>
              </h1>
              <p className={styles.heroDesc}>
                In-depth articles about workflow automation, technical search marketing, and modern web development.
              </p>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid (Side-by-side Row) */}
        <div className="container">
          <div style={{ maxWidth: 1100, margin: '0 auto 48px' }}>
            <div className={styles.postsGrid}>
              {/* Blog (Newest - TechWithHussain profile) */}
              <Link
                to="/blog/web-developer-srinagar-techwithhussain"
                className={`glass-card ${styles.postCard}`}
                data-cursor="hover"
              >
                <div className={styles.imgWrapper}>
                  <img
                    src="/TechWithHussain.webp"
                    alt="TechWithHussain — best web developer in Jammu and Kashmir"
                    className={styles.thumb}
                    loading="lazy"
                  />
                  <span className={styles.catBadge}>Web Development</span>
                </div>
                <div className={styles.info}>
                  <div className={styles.postMeta}>
                    <span><Calendar size={12} /> Aug 17, 2026</span>
                  </div>
                  <h3>Best Web Developer in Jammu and Kashmir — TechWithHussain</h3>
                  <p>TechWithHussain is a Srinagar-based web developer with 3+ years of experience and 50+ websites delivered, specialising in e-commerce, SEO, Meta Ads and Google Ads for J&K businesses.</p>
                  <span className={styles.readMore}>Read Article <ArrowRight size={14} /></span>
                </div>
              </Link>

              {/* Blog (Digital Marketing) */}
              <Link
                to="/blog/digital-marketing-services-in-kashmir"
                className={`glass-card ${styles.postCard}`}
                data-cursor="hover"
              >
                <div className={styles.imgWrapper}>
                  <img
                    src="/digital-marketing-services-in-kashmir.webp"
                    alt="Digital marketing services in Kashmir for business growth"
                    className={styles.thumb}
                    loading="lazy"
                  />
                  <span className={styles.catBadge}>Digital Marketing</span>
                </div>
                <div className={styles.info}>
                  <div className={styles.postMeta}>
                    <span><Calendar size={12} /> Aug 15, 2026</span>
                  </div>
                  <h3>Digital Marketing Services in Kashmir</h3>
                  <p>Get professional digital marketing services in Kashmir including SEO, social media, PPC, content marketing and website optimization to grow your business online.</p>
                  <span className={styles.readMore}>Read Article <ArrowRight size={14} /></span>
                </div>
              </Link>

              {/* Blog 1 */}
              <Link
                to="/blog/seo-expert-in-jammu-and-kashmir"
                className={`glass-card ${styles.postCard}`}
                data-cursor="hover"
              >
                <div className={styles.imgWrapper}>
                  <img
                    src="/SEO Expert in Jammu and Kashmir.webp"
                    alt="SEO expert in Jammu and Kashmir analyzing website performance and search rankings"
                    className={styles.thumb}
                    loading="lazy"
                  />
                  <span className={styles.catBadge}>SEO</span>
                </div>
                <div className={styles.info}>
                  <div className={styles.postMeta}>
                    <span><Calendar size={12} /> Aug 13, 2026</span>
                  </div>
                  <h3>SEO Expert in Jammu and Kashmir</h3>
                  <p>Looking for an SEO expert in Jammu and Kashmir? Learn what SEO professionals do, which services matter, how local SEO works, and what to check before hiring an SEO expert.</p>
                  <span className={styles.readMore}>Read Article <ArrowRight size={14} /></span>
                </div>
              </Link>

              {/* Blog 2 */}
              <Link
                to="/blog/how-to-choose-the-best-website-development-company-in-kashmir"
                className={`glass-card ${styles.postCard}`}
                data-cursor="hover"
              >
                <div className={styles.imgWrapper}>
                  <img
                    src="/best-website-development.webp"
                    alt="Best website development company in Kashmir - professional web development team"
                    className={styles.thumb}
                    loading="lazy"
                  />
                  <span className={styles.catBadge}>Web Development</span>
                </div>
                <div className={styles.info}>
                  <div className={styles.postMeta}>
                    <span><Calendar size={12} /> Aug 11, 2026</span>
                  </div>
                  <h3>How to Choose the Best Website Development Company in Kashmir</h3>
                  <p>Looking for the best website development company in Kashmir? Learn how to compare web developers based on experience, mobile design, SEO, speed, security, pricing and post-launch support.</p>
                  <span className={styles.readMore}>Read Article <ArrowRight size={14} /></span>
                </div>
              </Link>

              {/* Blog 2 */}
              <Link
                to="/blog/best-web-developer-in-jammu-and-kashmir"
                className={`glass-card ${styles.postCard}`}
                data-cursor="hover"
              >
                <div className={styles.imgWrapper}>
                  <img
                    src="/best-web-developer-jammu-kashmir.webp"
                    alt="Web developer in Jammu and Kashmir working on a business website design"
                    className={styles.thumb}
                    loading="lazy"
                  />
                  <span className={styles.catBadge}>Web Development</span>
                </div>
                <div className={styles.info}>
                  <div className={styles.postMeta}>
                    <span><Calendar size={12} /> Aug 4, 2026</span>
                  </div>
                  <h3>Best Web Developer in Jammu And Kashmir</h3>
                  <p>Looking for the best web developer in Jammu and Kashmir? Here's what qualities to look for, which services matter, and what to check before you hire one.</p>
                  <span className={styles.readMore}>Read Article <ArrowRight size={14} /></span>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Coming Soon Section */}
        <div className="container">
          <div style={{ maxWidth: 860, margin: '0 auto', paddingBottom: '80px' }}>
            <motion.div
              className="glass-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                padding: 'clamp(32px, 5vw, 56px)',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '24px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)'
              }}
            >
              {/* Decorative Glow */}
              <div
                style={{
                  position: 'absolute',
                  top: '-50px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '300px',
                  height: '300px',
                  background: 'radial-gradient(circle, var(--clr-primary-glow) 0%, transparent 70%)',
                  filter: 'blur(40px)',
                  opacity: 0.5,
                  pointerEvents: 'none'
                }}
              />

              {/* Badge */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '8px 18px',
                  borderRadius: '50px',
                  background: 'rgba(52, 211, 153, 0.1)',
                  border: '1px solid rgba(52, 211, 153, 0.3)',
                  color: '#34d399',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  marginBottom: 24
                }}
              >
                <Clock size={16} />
                <span>Articles & Guides Coming Soon</span>
              </div>

              {/* Icon */}
              <div
                style={{
                  width: 72,
                  height: 72,
                  margin: '0 auto 24px',
                  borderRadius: '20px',
                  background: 'var(--gradient-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'var(--shadow-glow)'
                }}
              >
                <Sparkles size={36} color="#fff" />
              </div>

              <h2
                style={{
                  fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
                  fontWeight: 800,
                  marginBottom: 16,
                  fontFamily: 'var(--font-heading)'
                }}
              >
                Something Great is <span className="text-primary">In The Works!</span>
              </h2>

              <p
                style={{
                  color: 'var(--clr-text-muted)',
                  fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
                  maxWidth: 620,
                  margin: '0 auto 36px',
                  lineHeight: 1.7
                }}
              >
                I am currently curating detailed case studies, n8n automation workflows, WordPress speed optimization guides, and full-stack React/PHP tutorials. Be the first to read when they launch!
              </p>

              {/* Topics Preview Pills */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  gap: 10,
                  marginBottom: 40
                }}
              >
                {['🤖 AI & Workflows', '⚡ WordPress Speed', '🎯 Local SEO', '🔐 Security & JWT', '⚛️ React Pipelines'].map((topic, i) => (
                  <span
                    key={i}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '12px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      fontSize: '0.85rem',
                      color: 'var(--clr-text-secondary)',
                    }}
                  >
                    {topic}
                  </span>
                ))}
              </div>

              {/* Newsletter Form */}
              <div style={{ maxWidth: 480, margin: '0 auto' }}>
                <form onSubmit={handleSubscribe} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ position: 'relative' }}>
                    <Mail
                      size={18}
                      style={{
                        position: 'absolute',
                        left: 16,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'var(--clr-text-muted)'
                      }}
                    />
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-input"
                      style={{ paddingLeft: 46 }}
                      required
                      disabled={status === 'loading'}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: '100%', justifyContent: 'center', gap: 8 }}
                    disabled={status === 'loading'}
                    data-cursor="hover"
                  >
                    {status === 'loading' ? (
                      'Subscribing...'
                    ) : (
                      <>
                        Notify Me On Launch <Send size={16} />
                      </>
                    )}
                  </button>
                </form>

                {msg && (
                  <p
                    style={{
                      marginTop: 12,
                      fontSize: '0.9rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 6,
                      color: status === 'success' ? '#34d399' : '#f87171'
                    }}
                  >
                    {status === 'success' && <CheckCircle2 size={16} />}
                    {msg}
                  </p>
                )}
                <p style={{ marginTop: 12, fontSize: '0.8rem', color: 'var(--clr-text-muted)' }}>
                  No spam ever. Unsubscribe with 1-click anytime.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  )
}