import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
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
    answer: 'We begin with a discovery call or a detailed brief. Once the scope of work and milestones are agreed upon, I require a deposit to initiate development, with the remainder due upon project testing and delivery.',
  },
  {
    question: 'Do you offer monthly website maintenance & SEO retainer packages?',
    answer: 'Yes! I offer monthly retainers for continuous SEO monitoring, technical site updates, speed optimizations, Meta Ads management, Google Ads bidding, and social media content growth.',
  },
  {
    question: 'Can you integrate custom AI tools or automation into my existing website?',
    answer: 'Absolutely. I integrate custom AI chatbots (OpenAI/Claude API), n8n workflow automation pipelines, and third-party CRM webhooks into React, WordPress, Shopify, or custom PHP applications.',
  },
  {
    question: 'What separates your web development services in Kashmir from generic agencies?',
    answer: 'Unlike traditional agencies that use slow, generic themes, every site I build is engineered for 95+ Core Web Vitals speed scores, built-in technical SEO, conversion-focused UI/UX, and complete owner control with no hidden lock-in fees.',
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
        title="Web Development & SEO Services in Srinagar, Kashmir | J&K"
        description="High-performance web development services in Kashmir, SEO services in Srinagar, WordPress & Shopify development, Meta Ads & Google Ads by Hussain Lone. Rank #1 on search engines."
        canonical="/services"
        keywords="web development services in Kashmir, web developer in Srinagar, website developer in Srinagar, web development company in Srinagar, website development company in Kashmir, SEO expert in Srinagar, SEO services in Srinagar, SEO expert in Jammu and Kashmir, WordPress developer in Srinagar, WordPress developer in Kashmir, digital marketing agency in Srinagar, digital marketing services in Kashmir, Shopify developer in Kashmir, ecommerce website development in Kashmir"
        schema={[servicesPageSchema(services), faqSchema(GENERAL_FAQS), breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }])]}
      />

      <div className={styles.servicesPage}>
        {/* Header Hero */}
        <section className={styles.heroSection}>
          <div className="container">
            <div className="text-center">
              <span className="section-label">Web Developer & SEO Expert in Srinagar, J&K</span>
              <h1 className={styles.mainTitle}>
                Best <span>Web Development & SEO Services</span> in Kashmir
              </h1>
              <p className={styles.heroDesc}>
                Hussain Lone (Tech With Hussain) — Premier web developer in Srinagar & SEO expert in Jammu and Kashmir. Delivering high-speed websites, custom WordPress/Shopify portals, technical SEO, Meta Ads, and Google Ads designed to rank on Google and scale revenues.
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
      </div>
    </>
  )
}