import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Check, HelpCircle, MessageSquare, Loader2 } from 'lucide-react'
import SEOMeta from '@/components/common/SEOMeta'
import { servicesPageSchema, faqSchema, breadcrumbSchema } from '@/utils/schema'
import { api } from '@/context/AuthContext'
import ServiceIcon from '@/components/common/ServiceIcon'
import { DEFAULT_SERVICES } from '@/data/servicesData'
import styles from './ServicesPage.module.css'

const GENERAL_FAQS = [
  {
    question: 'How do we get started on a project?',
    answer: 'We begin with a discovery call or a detailed brief. Once the scope of work and price tier are agreed upon, I require a 50% deposit to initiate milestones, with the remainder due upon project delivery.',
  },
  {
    question: 'Do you offer monthly maintenance packages?',
    answer: 'Yes! I offer retainer contracts for continuous SEO monitoring, social media management, ad campaigns, and site speed updates.',
  },
  {
    question: 'Can you integrate custom AI models or webhooks into my site?',
    answer: 'Absolutely. I connect custom chatbots, n8n automation pipelines, and AI API endpoints (OpenAI/Claude API) to React, WordPress, or custom PHP apps.',
  },
  {
    question: 'What is your refund policy?',
    answer: 'Due to the customized nature of development and marketing campaigns, refunds are not offered after development milestones are signed off. However, I offer revisions as specified in the service package to ensure satisfaction.',
  },
]

export default function ServicesPage() {
  const [services, setServices] = useState(DEFAULT_SERVICES)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    api.get('/services/index.php')
      .then(res => {
        if (res.data.success && Array.isArray(res.data.data.items) && res.data.data.items.length > 0) {
          setServices(res.data.data.items)
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <SEOMeta
        title="Web Dev & SEO Services in Kashmir, J&K"
        description="Web development, SEO, Meta Ads & digital marketing services in Srinagar, J&K from Hussain Lone. Transparent pricing, guaranteed results."
        canonical="/services"
        schema={[servicesPageSchema(services), faqSchema(GENERAL_FAQS), breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }])]}
      />

      <div className={styles.servicesPage}>
        {/* Header Hero */}
        <section className={styles.heroSection}>
          <div className="container">
            <div className="text-center">
              <span className="section-label">Web Developer in Kashmir | J&K</span>
              <h1 className={styles.mainTitle}>
                Best <span>Web Development & SEO Services</span> in J&K
              </h1>
              <p className={styles.heroDesc}>
                Hussain Lone — Best freelance web developer & SEO expert in Srinagar, Kashmir. Transparent pricing, structured deliverables, and guaranteed results. Serving businesses in J&K and worldwide.
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="section">
          <div className="container">
            {loading ? (
              <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--clr-text-muted)' }}>
                <Loader2 className="spin" size={32} style={{ margin: '0 auto 16px' }} />
                <p>Loading services...</p>
              </div>
            ) : (
              <div className={styles.servicesGrid}>
                {services.map((srv, idx) => {
                  const featuresList = srv.features || (srv.packages?.basic?.features) || []
                  const waUrl = `https://wa.me/916005401734?text=${encodeURIComponent(`Hi Hussain, I am interested in your ${srv.title} service. Let's discuss details.`)}`

                  return (
                    <div key={srv.id || idx} className={`glass-card ${styles.srvCard}`} data-cursor="hover">
                      <div className={styles.cardHeader}>
                        <div className={styles.iconBox} style={{ color: srv.color || 'var(--clr-primary)' }}>
                          <ServiceIcon name={srv.icon} size={32} />
                        </div>
                        <span className={styles.badgeLabel} style={{ background: `${srv.color || 'var(--clr-primary)'}18`, color: srv.color || 'var(--clr-primary)' }}>
                          Verified Expertise
                        </span>
                      </div>

                      <h3 className={styles.srvTitle}>{srv.title}</h3>
                      <p className={styles.srvDesc}>{srv.short_desc}</p>

                      {featuresList.length > 0 && (
                        <ul className={styles.featuresList}>
                          {featuresList.slice(0, 5).map((feat, fIdx) => (
                            <li key={fIdx}>
                              <Check size={16} className={styles.checkIcon} style={{ color: srv.color || 'var(--clr-primary)' }} />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      <div className={styles.cardFooter}>
                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.waBtn}
                          data-cursor="hover"
                        >
                          <MessageSquare size={16} /> Chat on WhatsApp
                        </a>
                        <Link to={`/services/${srv.slug}`} className={styles.detailBtn} data-cursor="hover">
                          Learn Details <ArrowRight size={14} />
                        </Link>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </section>

        {/* FAQs */}
        <section className="section">
          <div className="container">
            <div className="text-center mb-md">
              <span className="section-label">Help</span>
              <h2 className="section-title">Frequently Asked <span>Questions</span></h2>
            </div>

            <div className={styles.faqGrid}>
              {GENERAL_FAQS.map((faq, idx) => (
                <div key={idx} className={`glass-card ${styles.faqCard}`}>
                  <div className={styles.faqHeader}>
                    <HelpCircle size={20} className="text-primary" />
                    <h3>{faq.question}</h3>
                  </div>
                  <p className={styles.faqAnswer}>{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Custom Project Request CTA */}
        <section className="section" style={{ background: 'var(--clr-bg-secondary)' }}>
          <div className="container">
            <div className={styles.customQuoteBox}>
              <h2>Need a Custom Solution?</h2>
              <p>
                If you have a complex enterprise project, need custom API development, or require multiple retainers combined, contact me for a custom discovery session and scope breakdown.
              </p>
              <div className={styles.quoteActions}>
                <Link to="/contact" className="btn btn-primary btn-lg" data-cursor="hover">
                  Request Custom Quote
                </Link>
                <a
                  href="https://wa.me/916005401734"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost btn-lg"
                  data-cursor="hover"
                >
                  <MessageSquare size={16} /> Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}