import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, MessageSquare } from 'lucide-react'
import { api } from '@/context/AuthContext'
import ServiceIcon from '@/components/common/ServiceIcon'
import { DEFAULT_SERVICES } from '@/data/servicesData'
import styles from './ServicesSection.module.css'

export default function ServicesSection() {
  const [services, setServices] = useState(DEFAULT_SERVICES)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    api.get('/services/index.php?featured=1')
      .then(res => {
        if (res.data.success && Array.isArray(res.data.data.items) && res.data.data.items.length > 0) {
          setServices(res.data.data.items)
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  }

  return (
    <section className="section" id="services" style={{ background: 'rgba(255, 255, 255, 0.01)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-md">
          <span className="section-label">Services</span>
          <h2 className="section-title">
            Result-Driven <span>Solutions</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            From high-performance websites and mobile application development to search engine optimization & targeted ad campaigns. Get direct WhatsApp assistance.
          </p>
        </div>

        {/* Services Grid */}
        {loading ? (
          <div className={styles.servicesGrid}>
            {[1, 2, 3].map((n) => (
              <div key={n} className={`glass-card ${styles.serviceCard}`} style={{ minHeight: '380px', opacity: 0.6 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                  <div style={{ width: '48px', height: '48px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }} className="skeleton" />
                </div>
                <div style={{ width: '70%', height: '24px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', marginBottom: '16px' }} className="skeleton" />
                <div style={{ width: '100%', height: '14px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', marginBottom: '8px' }} className="skeleton" />
                <div style={{ width: '90%', height: '14px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', marginBottom: '24px' }} className="skeleton" />
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            className={styles.servicesGrid}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {services.map((srv, idx) => {
              const featuresList = srv.features || (srv.packages?.basic?.features) || [];
              const waUrl = `https://wa.me/916005401734?text=${encodeURIComponent(`Hi Hussain, I want to inquire about your ${srv.title} service.`)}`;

              return (
                <motion.div
                  key={srv.id || idx}
                  className={`glass-card ${styles.serviceCard}`}
                  variants={cardVariants}
                  data-cursor="hover"
                >
                  <div className={styles.cardHeader}>
                    <div className={styles.iconBox} style={{ color: srv.color || 'var(--clr-primary)' }}>
                      <ServiceIcon name={srv.icon} size={28} />
                    </div>
                  </div>

                  <h3 className={styles.srvTitle}>{srv.title}</h3>
                  <p className={styles.srvDesc}>{srv.short_desc}</p>

                  <div className={styles.featuresDivider} />

                  <ul className={styles.featuresList}>
                    {featuresList.slice(0, 4).map((feat, i) => (
                      <li key={i}>
                        <span className={styles.bullet} style={{ background: srv.color || 'var(--clr-primary)' }} /> {feat}
                      </li>
                    ))}
                  </ul>

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
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* Bottom CTA */}
        <div className="text-center mt-lg">
          <Link to="/services" className="btn btn-primary btn-lg" data-cursor="hover">
            Explore All Services & Capabilities <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
