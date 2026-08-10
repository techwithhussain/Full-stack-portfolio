import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Sparkles, ArrowRight, Clock } from 'lucide-react'
import styles from './BlogPreview.module.css'

export default function BlogPreview() {
  return (
    <section className="section" id="blog-preview" style={{ background: 'rgba(255, 255, 255, 0.01)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-md">
          <span className="section-label">Articles & Insights</span>
          <h2 className="section-title">
            Latest from the <span>Blog</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            In-depth guides, case studies, and tutorials covering AI workflows, SEO practices, and modern web engineering.
          </p>
        </div>

        {/* Coming Soon Glass Card */}
        <motion.div
          className="glass-card"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          style={{
            maxWidth: 800,
            margin: '0 auto',
            padding: 'clamp(28px, 4vw, 44px)',
            textAlign: 'center',
            borderRadius: '24px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)'
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 16px',
              borderRadius: '50px',
              background: 'rgba(52, 211, 153, 0.1)',
              border: '1px solid rgba(52, 211, 153, 0.3)',
              color: '#34d399',
              fontSize: '0.85rem',
              fontWeight: 600,
              marginBottom: 20
            }}
          >
            <Clock size={15} />
            <span>Articles Launching Soon</span>
          </div>

          <h3 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)', fontWeight: 700, marginBottom: 12 }}>
            Technical Articles & Case Studies <span className="text-primary">In Progress</span>
          </h3>

          <p style={{ color: 'var(--clr-text-muted)', fontSize: '1rem', maxWidth: 580, margin: '0 auto 28px', lineHeight: 1.6 }}>
            I am working on publishing comprehensive guides on n8n automation, Core Web Vitals optimization, and AI chatbot integration.
          </p>

          <Link to="/blog" className="btn btn-primary btn-md" data-cursor="hover">
            Visit Knowledge Hub <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

