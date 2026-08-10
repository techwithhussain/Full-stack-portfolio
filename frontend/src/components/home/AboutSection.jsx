import { motion } from 'framer-motion'
import { Download, Cpu, Globe, Search, Video, Award, Heart, Shield } from 'lucide-react'
import styles from './AboutSection.module.css'

const TRAITS = [
  {
    icon: <Cpu className="text-primary" size={24} />,
    title: 'AI & Automation',
    desc: 'Building smart agentic workflows, custom chatbot integrations, and automating processes using APIs, n8n, and Make.com.',
  },
  {
    icon: <Globe className="text-secondary" size={24} />,
    title: 'Full Stack Web Dev',
    desc: 'Creating high-performance WordPress sites and custom React applications with a focus on speed, responsive design, and UX.',
  },
  {
    icon: <Search className="text-purple" size={24} />,
    title: 'On-Page, Off-Page, Technical & Local SEO',
    desc: 'Full-suite optimization including on-page structure, off-page authority, technical performance, and local map-pack domination to rank #1.',
  },
  {
    icon: <Video className="text-primary" size={24} />,
    title: 'Content Creation',
    desc: 'Editing and producing high-converting videos and copy for LinkedIn, YouTube, and Instagram to grow digital presence.',
  },
]

export default function AboutSection() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
    },
  }

  return (
    <section className="section" id="about">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-md">
          <span className="section-label">About Me</span>
          <h2 className="section-title">
            Bridging Code, <span>AI & Marketing</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            I am a multi-disciplinary developer and strategist, helping businesses automate workflows, build beautiful websites, and dominate search engine results.
          </p>
        </div>

        {/* Main Grid */}
        <div className={styles.mainGrid}>
          {/* Left Column: Profile Card */}
          <motion.div
            className={styles.profileCol}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className={styles.imgWrapper}>
              <div className={styles.glowingBorder} />
              <img
                src="/profile.png"
                alt="Hussain Lone — Best Web Developer & SEO Expert in Srinagar, J&K"
                className={styles.profileImg}
                width="400"
                height="400"
                loading="eager"
                fetchPriority="high"
              />
              <div className={styles.experienceBadge}>
                <span className={styles.expNum}>3+</span>
                <span className={styles.expText}>Years of<br />Experience</span>
              </div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoItem}>
                <Award size={18} className="text-primary" />
                <div>
                  <h4>Certified Expert</h4>
                  <p>AI, SEO & WordPress development</p>
                </div>
              </div>
              <div className={styles.infoItem}>
                <Shield size={18} className="text-secondary" />
                <div>
                  <h4>Result Oriented</h4>
                  <p>Focused on conversions & ROI</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Bio & Traits */}
          <div className={styles.contentCol}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={styles.bioBlock}
            >
              <h3 className={styles.bioTitle}>Hussain Lone</h3>
              <p className={styles.bioText}>
                As a tech enthusiast and digital craftsman, I specialize in crafting custom digital experiences. My unique blend of skills allows me to develop robust full-stack applications, automate complex business workflows using AI, and drive targeted organic traffic through advanced SEO.
              </p>
              <p className={styles.bioText}>
                Whether you're looking to integrate AI agents into your business, design a high-converting WordPress agency website, or rank on the first page of Google, I provide end-to-end solutions tailored to your unique growth goals.
              </p>

              <div className={styles.actionRow}>
                <a
                  href="/resume.pdf"
                  download
                  className="btn btn-primary"
                  data-cursor="hover"
                >
                  <Download size={16} /> Download Resume
                </a>
                <a
                  href="#contact"
                  className="btn btn-outline"
                  data-cursor="hover"
                >
                  Get In Touch
                </a>
              </div>
            </motion.div>

            {/* Core Traits Grid */}
            <motion.div
              className={styles.traitsGrid}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
            >
              {TRAITS.map((trait, idx) => (
                <motion.div
                  key={idx}
                  className={`glass-card ${styles.traitCard}`}
                  variants={cardVariants}
                  data-cursor="hover"
                >
                  <div className={styles.traitIconWrap}>{trait.icon}</div>
                  <h4 className={styles.traitTitle}>{trait.title}</h4>
                  <p className={styles.traitDesc}>{trait.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
