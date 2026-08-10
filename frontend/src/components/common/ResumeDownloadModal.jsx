import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Download, Code, Search, Palette, Megaphone } from 'lucide-react'
import axios from 'axios'
import styles from './ResumeDownloadModal.module.css'

export default function ResumeDownloadModal({ isOpen, onClose }) {
  const [links, setLinks] = useState({
    resume_main: '',
    resume_fullstack: '',
    resume_wordpress: '',
    resume_seo: '',
    resume_smm: ''
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isOpen) {
      setLoading(true)
      axios.get('/api/settings.php')
        .then(res => {
          if (res.data.success) {
            setLinks({
              resume_main: res.data.data.resume_main || '',
              resume_fullstack: res.data.data.resume_fullstack || '',
              resume_wordpress: res.data.data.resume_wordpress || '',
              resume_seo: res.data.data.resume_seo || '',
              resume_smm: res.data.data.resume_smm || ''
            })
          }
        })
        .catch(err => console.error('Failed to load resume settings', err))
        .finally(() => setLoading(false))
    }
  }, [isOpen])

  // Handle escape key to close
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [onClose])

  const options = [
    {
      key: 'resume_fullstack',
      title: 'Full Stack Web Developer',
      desc: 'React, Node.js, PHP, MySQL, custom API architectures, and database design.',
      icon: <Code size={20} />,
      url: links.resume_fullstack || links.resume_main || '/resume.pdf'
    },
    {
      key: 'resume_wordpress',
      title: 'WordPress & Graphic Design',
      desc: 'Custom Gutenberg blocks, advanced ACF, element builder sites, and premium thumbnail designs.',
      icon: <Palette size={20} />,
      url: links.resume_wordpress || links.resume_main || '/resume.pdf'
    },
    {
      key: 'resume_seo',
      title: 'Full SEO Specialist',
      desc: 'On-page structure, off-page authority, technical speed optimization, and local Map Pack dominance.',
      icon: <Search size={20} />,
      url: links.resume_seo || links.resume_main || '/resume.pdf'
    },
    {
      key: 'resume_smm',
      title: 'Social Media Marketing',
      desc: 'Paid advertising campaigns, tracking pixels setup, audience research, and brand growth.',
      icon: <Megaphone size={20} />,
      url: links.resume_smm || links.resume_main || '/resume.pdf'
    }
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <div className={styles.overlay} onClick={onClose}>
          <motion.div 
            className={styles.modal}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className={styles.header}>
              <div>
                <h3 className={styles.title}>Download Resume</h3>
                <p className={styles.subtitle}>Select the version that matches your project requirements</p>
              </div>
              <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">
                <X size={20} />
              </button>
            </div>

            {/* Resume Selection Grid */}
            <div className={styles.optionsGrid}>
              {options.map((opt) => (
                <a 
                  key={opt.key}
                  href={opt.url}
                  download
                  data-no-intercept
                  className={`glass-card ${styles.optionCard}`}
                  onClick={() => {
                    // Small delay to let download start before closing
                    setTimeout(onClose, 800)
                  }}
                  data-cursor="hover"
                >
                  <div className={styles.iconWrap}>
                    {opt.icon}
                  </div>
                  <div className={styles.optionContent}>
                    <h4 className={styles.optionTitle}>{opt.title}</h4>
                    <p className={styles.optionDesc}>{opt.desc}</p>
                  </div>
                  <div className={styles.downloadIcon}>
                    <Download size={16} />
                  </div>
                </a>
              ))}
            </div>

            {/* Modal Footer */}
            <div className={styles.footer}>
              <span className={styles.footerText}>
                Need a general print version?{' '}
                <a href={links.resume_main || '/resume.pdf'} download data-no-intercept className={styles.generalLink}>
                  Download Comprehensive CV
                </a>
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
