import { useState, useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Check, MessageSquare, Loader2, Sparkles } from 'lucide-react'
import SEOMeta from '@/components/common/SEOMeta'
import { servicePageSchema, breadcrumbSchema, faqSchema } from '@/utils/schema'
import { api } from '@/context/AuthContext'
import ServiceIcon from '@/components/common/ServiceIcon'
import { DEFAULT_SERVICES } from '@/data/servicesData'
import styles from './ServiceDetailPage.module.css'

export default function ServiceDetailPage() {
  const { slug } = useParams()
  const defaultFound = DEFAULT_SERVICES.find(s => s.slug === slug || s.slug.includes(slug) || slug.includes(s.slug))
  const [service, setService] = useState(defaultFound || null)
  const [loading, setLoading] = useState(!defaultFound)

  useEffect(() => {
    const found = DEFAULT_SERVICES.find(s => s.slug === slug || s.slug.includes(slug) || slug.includes(s.slug))
    api.get(`/services/index.php?slug=${slug}`)
      .then(res => {
        if (res.data.success && res.data.data) {
          setService(res.data.data)
        } else if (found) {
          setService(found)
        }
      })
      .catch(() => {
        if (found) setService(found)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [slug])

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '120px 0', color: 'var(--clr-text-muted)' }}>
        <Loader2 className="spin" size={40} style={{ margin: '0 auto 20px' }} />
        <p>Loading service details...</p>
      </div>
    )
  }

  if (!service) {
    return <Navigate to="/404" replace />
  }

  const keywordsMap = {
    'web-development': 'web development services in Kashmir, web developer in Srinagar, website developer in Srinagar, web development company in Srinagar, website development company in Kashmir, WordPress developer in Srinagar, WordPress developer in Kashmir, Shopify developer in Kashmir, ecommerce website development in Kashmir',
    'seo-services': 'SEO expert in Srinagar, SEO services in Srinagar, SEO expert in Jammu and Kashmir, local SEO Jammu and Kashmir, technical SEO services, SEO audit Jammu and Kashmir, SEO consultant Srinagar',
    'application-development': 'custom web application Kashmir, SaaS developer Srinagar, full stack developer Jammu and Kashmir, web development services in Kashmir, web developer in Srinagar',
    'meta-ads': 'digital marketing agency in Srinagar, digital marketing services in Kashmir, Meta Ads expert in Srinagar, Facebook Ads agency Kashmir, Instagram Ads management Srinagar',
    'google-ads': 'digital marketing agency in Srinagar, digital marketing services in Kashmir, Google Ads specialist in Srinagar, PPC agency Kashmir, Google Ads consultant Srinagar',
    'social-media-marketing': 'digital marketing agency in Srinagar, digital marketing services in Kashmir, social media marketing in Srinagar, content creator Srinagar, social media manager Kashmir'
  }

  const metaKeywords = keywordsMap[slug] || 'web development services in Kashmir, web developer in Srinagar, SEO expert in Srinagar'

  return (
    <>
      <SEOMeta
        title={`${service.title} | Tech With Hussain Srinagar J&K`}
        description={service.description || service.short_desc}
        canonical={`/services/${slug}`}
        keywords={metaKeywords}
        schema={[
          servicePageSchema({ title: service.title, slug, description: service.description || service.short_desc }),
          faqSchema(service.faqs ? service.faqs.map(f => ({ question: f.q, answer: f.a })) : []),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
            { name: service.title, path: `/services/${slug}` },
          ]),
        ]}
      />

      <div className={styles.serviceDetail}>
        <div className="container">
          {/* Back Button */}
          <Link to="/services" className={styles.backBtn} data-cursor="hover">
            <ArrowLeft size={16} /> Back to All Services
          </Link>

          {/* Main Title Banner */}
          <div className={styles.headerGrid}>
            <div className={styles.titleInfo}>
              <div className={styles.iconBox} style={{ color: service.color || 'var(--clr-primary)', borderColor: service.color || 'var(--clr-primary)' }}>
                <ServiceIcon name={service.icon} size={36} />
              </div>
              <h1 className={styles.serviceTitle}>{service.title}</h1>
              <p className={styles.serviceDesc}>{service.description || service.short_desc}</p>

              {/* Service Key Pillars / Overview */}
              {Array.isArray(service.overview) && service.overview.length > 0 && (
                <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <h3 style={{ fontSize: '1.1rem', color: 'var(--clr-text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Sparkles size={16} className="text-primary" /> Key Service Highlights:
                  </h3>
                  {service.overview.map((item, idx) => (
                    <div key={idx} style={{ color: 'var(--clr-text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                      • {item}
                    </div>
                  ))}
                </div>
              )}

              {Array.isArray(service.tools) && service.tools.length > 0 && (
                <div className={styles.toolsList} style={{ marginTop: '24px' }}>
                  <span className={styles.toolsLabel}>Technologies & Tools:</span>
                  {service.tools.map((t, idx) => (
                    <span key={idx} className={styles.toolBadge}>{t}</span>
                  ))}
                </div>
              )}
            </div>

            {/* Service Scope & WhatsApp Action Card */}
            <div className={styles.pricingCardArea}>
              <div className={`glass-card ${styles.pricingCard}`}>
                <div className={styles.tierHeader}>
                  <h3>What's Included & Deliverables</h3>
                  <span className={styles.badgeLabel} style={{ background: `${service.color || 'var(--clr-primary)'}22`, color: service.color || 'var(--clr-primary)' }}>
                    Verified Quality
                  </span>
                </div>

                <p className={styles.tierDesc}>
                  Tailored solutions engineered to rank on search engines, boost conversions, and elevate your brand presence.
                </p>

                <div className={styles.divider} />

                <ul className={styles.featuresList}>
                  {(service.features || []).map((feat, idx) => (
                    <li key={idx}>
                      <Check size={16} className={styles.checkIcon} style={{ color: service.color || 'var(--clr-primary)' }} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* Booking & WhatsApp CTAs */}
                <div className={styles.tierActions}>
                  <a
                    href={`https://wa.me/916005401734?text=${encodeURIComponent(`Hi Hussain, I want to inquire about your ${service.title} service.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.waBtn}
                    data-cursor="hover"
                  >
                    <MessageSquare size={16} /> Contact on WhatsApp
                  </a>
                  <Link
                    to={`/contact?service=${encodeURIComponent(service.title)}`}
                    className={styles.detailBtn}
                    data-cursor="hover"
                  >
                    Get Custom Quote
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Workflow Process */}
          {Array.isArray(service.process) && service.process.length > 0 && (
            <section className={styles.workflowSection}>
              <div className="text-center mb-md">
                <span className="section-label">Process</span>
                <h2>How I <span>Deliver Results</span></h2>
              </div>

              <div className={styles.workflowGrid}>
                {service.process.map((step, idx) => (
                  <div key={idx} className={`glass-card ${styles.stepCard}`}>
                    <span className={styles.stepNum} style={{ color: service.color || 'var(--clr-primary)' }}>{step.step}</span>
                    <h3>{step.title}</h3>
                    <p>{step.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* FAQs Specific to Service */}
          {Array.isArray(service.faqs) && service.faqs.length > 0 && (
            <section className={styles.faqSection}>
              <div className="text-center mb-md">
                <span className="section-label">Questions</span>
                <h2>Frequently Asked <span>Questions</span></h2>
              </div>

              <div className={styles.faqGrid}>
                {service.faqs.map((faq, idx) => (
                  <div key={idx} className={`glass-card ${styles.faqCard}`}>
                    <h3>{faq.q}</h3>
                    <p>{faq.a}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  )
}