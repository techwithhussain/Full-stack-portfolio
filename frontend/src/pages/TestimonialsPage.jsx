import { Link } from 'react-router-dom'
import { Star, Quote, Play, CheckCircle2, MessageSquare, ArrowRight } from 'lucide-react'
import SEOMeta from '@/components/common/SEOMeta'
import { webPageSchema, breadcrumbSchema } from '@/utils/schema'
import styles from './TestimonialsPage.module.css'

const REVIEWS = [
  {
    name: 'Sarah Jenkins',
    role: 'Founder',
    company: 'Velo E-Commerce',
    platform: 'Upwork Review',
    rating: 5,
    text: "Hussain built a stunning WooCommerce store and set up an automated AI agent for our support. Our response time dropped to minutes, and sales grew by 25% in the first month. He is a genius!",
    avatar: 'SJ',
  },
  {
    name: 'Amit Sharma',
    role: 'CEO',
    company: 'WalnutWala',
    platform: 'Direct Client Feedback',
    rating: 5,
    text: "Hussain's SEO strategies are top-tier. He optimized our local search parameters and schema. Within 3 months, we ranked on the first page of Google for all target keywords. A true SEO authority.",
    avatar: 'AS',
  },
  {
    name: 'David Miller',
    role: 'Director',
    company: 'Nexus Creative Agency',
    platform: 'Fiverr Order',
    rating: 5,
    text: "Hussain delivered our agency portfolio ahead of schedule. The animations are clean, the page speed is flawless, and his communication was excellent throughout. Will hire again for sure.",
    avatar: 'DM',
  },
  {
    name: 'Elena Rostova',
    role: 'Marketing Lead',
    company: 'SaaSFlow',
    platform: 'LinkedIn Endorsement',
    rating: 5,
    text: "We needed to automate our lead routing and sync it to our HubSpot CRM. Hussain set up custom n8n pipelines that worked flawlessly. He saved our marketing team over 15 hours a week.",
    avatar: 'ER',
  },
  {
    name: 'Marc Lefevre',
    role: 'Co-Founder',
    company: 'PropTech France',
    platform: 'Direct Client Feedback',
    rating: 5,
    text: "The speed optimization work Hussain completed was exceptional. Our mobile speed index dropped from 7.2 seconds to 1.1 seconds. He knows how to debug blocking render scripts.",
    avatar: 'ML',
  },
  {
    name: 'Johnathan Cole',
    role: 'Operations VP',
    company: 'Logix Delivery',
    platform: 'Upwork Review',
    rating: 5,
    text: "Hussain automated our customer intake form. He connected webhooks to Make.com and sent automated contract PDFs. This saved our staff from manual drafting tasks.",
    avatar: 'JC',
  },
]

export default function TestimonialsPage() {
  return (
    <>
      <SEOMeta
        title="Client Testimonials · Tech With Hussain"
        description="Read client reviews and feedback from business owners and founders who worked with Hussain Lone on web development and SEO."
        canonical="/testimonials/"
        schema={[
          webPageSchema({ title: 'Client Testimonials · Tech With Hussain', description: 'Client reviews and feedback.', path: '/testimonials/' }),
          breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Testimonials', path: '/testimonials/' }]),
        ]}
      />

      <div className={styles.testimonialsPage}>
        {/* Page Header */}
        <section className={styles.heroSection}>
          <div className="container">
            <div className="text-center">
              <span className="section-label">Success Stories</span>
              <h1 className={styles.mainTitle}>
                What My <span>Clients Say</span>
              </h1>
              <p className={styles.heroDesc}>
                I pride myself on building robust systems that solve business blockages. Read verified feedback from platforms like Upwork, Fiverr, and LinkedIn.
              </p>
            </div>
          </div>
        </section>

        {/* Video Testimonial Mockup */}
        <section className="section">
          <div className="container">
            <div className={`glass-card ${styles.videoCard}`}>
              <div className={styles.videoGrid}>
                <div className={styles.videoPlayerMock}>
                  <div className={styles.glowOverlay} />
                  <img src="/project_dash.png" alt="Video Review Thumbnail" className={styles.videoThumb} />
                  <button className={styles.playBtn} aria-label="Play video review" data-cursor="hover">
                    <Play size={24} fill="var(--clr-bg)" />
                  </button>
                </div>
                <div className={styles.videoText}>
                  <div className={styles.stars}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} fill="var(--clr-warning)" stroke="var(--clr-warning)" />
                    ))}
                  </div>
                  <h2>"An absolute game-changer for our agency pipelines."</h2>
                  <p>
                    Hussain Lone set up multi-agent chatbot workflows that integrate directly with our CRM system. This eliminated manual lead routing errors and speeded up customer interactions.
                  </p>
                  <div className={styles.videoAuthor}>
                    <h4>David Miller</h4>
                    <p>Director, Nexus Creative Agency</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Grid of reviews */}
        <section className="section" style={{ background: 'var(--clr-bg-secondary)' }}>
          <div className="container">
            <div className={styles.reviewsGrid}>
              {REVIEWS.map((review, idx) => (
                <div key={idx} className={`glass-card ${styles.reviewCard}`} data-cursor="hover">
                  <div className={styles.cardHeader}>
                    <div className={styles.ratingStars}>
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} size={14} fill="var(--clr-warning)" stroke="var(--clr-warning)" />
                      ))}
                    </div>
                    <span className={styles.platformBadge}>{review.platform}</span>
                  </div>

                  <Quote className={styles.quoteIcon} size={32} />
                  <p className={styles.reviewText}>{review.text}</p>

                  <div className={styles.cardFooter}>
                    <div className={styles.avatar}>{review.avatar}</div>
                    <div>
                      <h4 className={styles.clientName}>{review.name}</h4>
                      <p className={styles.clientRole}>
                        {review.role}, <span className="text-primary">{review.company}</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to action */}
        <section className="section">
          <div className="container">
            <div className={styles.ctaBox}>
              <h2>Ready to be my next success story?</h2>
              <p>Let's schedule a call to explore how we can automate your tasks and rank your platform.</p>
              <div className={styles.ctaActions}>
                <Link to="/contact/" className="btn btn-primary btn-lg" data-cursor="hover">
                  Book Discovery Session <ArrowRight size={16} />
                </Link>
                <button
                  onClick={() => {
                    window.dispatchEvent(new CustomEvent('open-consultation', {
                      detail: { service: 'General Consultation', tier: 'discovery' }
                    }))
                  }}
                  className="btn btn-ghost btn-lg"
                  data-cursor="hover"
                >
                  <MessageSquare size={16} /> Consult via WhatsApp
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}