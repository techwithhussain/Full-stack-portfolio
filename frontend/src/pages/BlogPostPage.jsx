import { Link } from 'react-router-dom'
import { ArrowLeft, Clock, Sparkles } from 'lucide-react'
import SEOMeta from '@/components/common/SEOMeta'

export default function BlogPostPage() {
  return (
    <>
      <SEOMeta
        title="Article Coming Soon · Tech With Hussain"
        description="This article is currently being drafted and will be available soon."
        canonical="/blog"
      />

      <div style={{ paddingTop: '140px', paddingBottom: '80px' }}>
        <div className="container">
          <Link to="/blog" className="btn btn-outline btn-sm" style={{ marginBottom: 32, gap: 8 }} data-cursor="hover">
            <ArrowLeft size={16} /> Back to Blog
          </Link>

          <div
            className="glass-card"
            style={{
              maxWidth: 700,
              margin: '0 auto',
              padding: 'clamp(32px, 5vw, 56px)',
              textAlign: 'center',
              borderRadius: '24px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                margin: '0 auto 20px',
                borderRadius: '16px',
                background: 'var(--gradient-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'var(--shadow-glow)'
              }}
            >
              <Sparkles size={32} color="#fff" />
            </div>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '6px 14px',
                borderRadius: '50px',
                background: 'rgba(52, 211, 153, 0.1)',
                border: '1px solid rgba(52, 211, 153, 0.3)',
                color: '#34d399',
                fontSize: '0.8rem',
                fontWeight: 600,
                marginBottom: 20
              }}
            >
              <Clock size={14} />
              <span>Article Coming Soon</span>
            </div>

            <h1 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 800, marginBottom: 16 }}>
              This Article is Currently <span className="text-primary">In Preparation</span>
            </h1>

            <p style={{ color: 'var(--clr-text-muted)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: 32 }}>
              I am putting the finishing touches on this in-depth guide. Subscribe on the main blog page to be notified as soon as it goes live!
            </p>

            <Link to="/blog" className="btn btn-primary" data-cursor="hover">
              Go to Blog Hub
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}