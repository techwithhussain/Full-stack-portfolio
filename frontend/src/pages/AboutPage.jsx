import { motion } from 'framer-motion'
import {
  Download,
  Award,
  Shield,
  Heart,
  Zap,
  Sparkles,
  Code,
  Globe,
  Video,
  TrendingUp,
  Search,
  Mail,
  MessageSquare,
  GraduationCap,
  Calendar,
} from 'lucide-react'
import SEOMeta from '@/components/common/SEOMeta'
import { aboutPageSchema, breadcrumbSchema } from '@/utils/schema'
import styles from './AboutPage.module.css'

const JOURNEY_STEPS = [
  {
    step: '01',
    title: 'The 18-Year-Old Spark',
    tag: 'Age 18 · The Beginning',
    desc: 'My tech journey started at 18 years old. Driven by intense curiosity, I began learning how code works. The unforgettable feeling of taking my first project from localhost to a live URL on the internet ignited my lifelong passion for web development.',
    icon: <Code size={20} className="text-primary" />,
  },
  {
    step: '02',
    title: 'Localhost to Live Web Apps',
    tag: 'Engineering & Code',
    desc: 'I moved rapidly from basic HTML/CSS to custom PHP, WordPress setups, React frameworks, and e-commerce platforms. I learned to build full-stack web applications that are responsive, secure, lightning-fast, and built to handle real traffic.',
    icon: <Globe size={20} className="text-secondary" />,
  },
  {
    step: '03',
    title: 'Tech With Hussain & Content Creation',
    tag: 'Creator & Educator',
    desc: 'To empower beginners, students, and local business owners, I launched Tech With Hussain on YouTube and Instagram. Creating practical tech guides, website series, and AI tool tutorials built a thriving, trusted tech community in J&K and across India.',
    icon: <Video size={20} className="text-purple" />,
  },
  {
    step: '04',
    title: 'SEO & Full-Funnel Digital Marketing',
    tag: 'Organic Reach & Paid Ads',
    desc: 'Realizing that beautiful websites need targeted traffic, I mastered Technical & Local SEO, Meta Ads (Facebook & Instagram), and Google Ads. I turned websites into automated lead-generation hubs that rank #1 on search engines.',
    icon: <TrendingUp size={20} className="text-primary" />,
  },
  {
    step: '05',
    title: 'Recognized Digital Brand',
    tag: 'Google Search & Global Reach',
    desc: 'Today, "Tech With Hussain" is recognized directly on Google Search & AI Overviews as a top digital platform for web development and SEO in Jammu & Kashmir—helping local brands and international clients achieve digital growth.',
    icon: <Search size={20} className="text-secondary" />,
  },
]

const VALUES = [
  {
    icon: <Zap size={24} className="text-primary" />,
    title: 'Automation First',
    desc: 'If a task can be automated, it should be. I build web systems and workflows that save hours of human labor, allowing teams to focus on revenue growth.',
  },
  {
    icon: <Shield size={24} className="text-secondary" />,
    title: 'Security & Clean Code',
    desc: 'From SSL encryption and data protection to clean code architecture, I build every website with security and maintainability as core pillars.',
  },
  {
    icon: <Award size={24} className="text-purple" />,
    title: 'Result-Driven ROI',
    desc: 'A website is a business asset. Every design decision, meta tag, and call-to-action is optimized to turn casual visitors into loyal paying clients.',
  },
  {
    icon: <Heart size={24} className="text-primary" />,
    title: 'Transparency & Trust',
    desc: 'Direct communication, no hidden jargon. I provide clear timelines, direct WhatsApp updates, and complete digital account ownership.',
  },
]

export default function AboutPage() {
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  }

  return (
    <>
      <SEOMeta
        title="About Hussain Lone | Web Developer & SEO Specialist in Jammu and Kashmir"
        titleAsIs
        description="Learn the story of Hussain Lone (Tech With Hussain) — starting code at age 18, taking localhost to live web apps, content creation, and full-stack SEO & digital marketing in J&K."
        canonical="/about"
        schema={[aboutPageSchema(), breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'About', path: '/about' }])]}
      />

      <div className={styles.aboutPage}>
        {/* Page Hero */}
        <section className={styles.heroSection}>
          <div className="container">
            <div className={styles.heroGrid}>
              <motion.div
                className={styles.heroTextCol}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className={styles.greetingBadge}>
                  <Sparkles size={14} className="text-primary" /> Meet Hussain Lone (Tech With Hussain)
                </div>
                <h1 className={styles.mainTitle}>
                  From 18-Year-Old Coder to <span>Tech Creator & Digital Strategist</span>
                </h1>
                <p className={styles.heroDesc}>
                  I started coding at age 18, taking projects from local host to live web platforms. Today, I build high-converting websites, create tech content, and engineer search-engine-dominant SEO campaigns in Jammu & Kashmir.
                </p>

                {/* Social Badges */}
                <div className={styles.socialLinksRow}>
                  <a
                    href="https://youtube.com/@Tech.WithHussain"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialBadge}
                    data-cursor="hover"
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" style={{ color: '#FF0000' }}>
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    YouTube @Tech.WithHussain
                  </a>
                  <a
                    href="https://instagram.com/tech.withhussain"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialBadge}
                    data-cursor="hover"
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" style={{ color: '#E1306C' }}>
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    Instagram @tech.withhussain
                  </a>
                  <a
                    href="https://linkedin.com/in/techwithhussain"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialBadge}
                    data-cursor="hover"
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" style={{ color: '#0A66C2' }}>
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                    </svg>
                    LinkedIn Profile
                  </a>
                </div>

                <div className={styles.heroActions}>
                  <a href="/resume.pdf" download className="btn btn-primary btn-lg" data-cursor="hover">
                    <Download size={18} /> Download CV
                  </a>
                  <a href="/contact" className="btn btn-outline btn-lg" data-cursor="hover">
                    Get In Touch
                  </a>
                </div>
              </motion.div>

              <motion.div
                className={styles.heroImgCol}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className={styles.imgWrapper}>
                  <div className={styles.glowBg} />
                  <img
                    src="/profile.png"
                    alt="Hussain Lone — Best Web Developer & SEO Expert in Srinagar J&K Kashmir"
                    className={styles.profileImg}
                    width="500"
                    height="500"
                    loading="eager"
                    fetchPriority="high"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Detailed Story & Timeline Section */}
        <section className="section" style={{ background: 'var(--clr-bg-secondary)' }}>
          <div className="container">
            <div className="text-center mb-md">
              <span className="section-label">My Story & Journey</span>
              <h2 className="section-title">How I Built <span>Tech With Hussain</span></h2>
              <p className="section-subtitle" style={{ margin: '0 auto', maxWidth: 700 }}>
                From writing my first line of code at 18 to becoming a recognized web developer, SEO specialist, and tech creator in Jammu & Kashmir.
              </p>
            </div>

            {/* Journey Steps Grid */}
            <motion.div
              className={styles.timelineGrid}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
            >
              {JOURNEY_STEPS.map((item, idx) => (
                <motion.div
                  key={idx}
                  className={`glass-card ${styles.timelineCard}`}
                  variants={cardVariants}
                  data-cursor="hover"
                >
                  <span className={styles.stepBadge}>{item.tag}</span>
                  <h3 className={styles.stepTitle}>{item.title}</h3>
                  <p className={styles.stepDesc}>{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Google Recognition Callout */}
            <div className={styles.googleHighlight}>
              <div className={styles.googleHighlightHeader}>
                <Search size={18} /> Recognized on Google Search & AI Overview
              </div>
              <p>
                "Tech With Hussain" is recognized on Google Search & AI Overviews as a digital resource hub and service provider run by web developers and SEO specialists based in Jammu & Kashmir—offering web development, WordPress setups, technical search engine optimization, and tech education.
              </p>
            </div>
          </div>
        </section>

        {/* Education Highlight */}
        <section className="section">
          <div className="container">
            <div className="text-center mb-md">
              <span className="section-label">Background & Learning</span>
              <h2 className="section-title">Education & <span>Qualifications</span></h2>
            </div>
            <div className={styles.eduCardWrapper}>
              <div className={`glass-card ${styles.eduCard}`}>
                <div className={styles.eduIcon}>
                  <GraduationCap size={28} className="text-primary" />
                </div>
                <div className={styles.eduContent}>
                  <div className={styles.eduMeta}>
                    <span className={styles.dateBadge}>
                      <Calendar size={12} /> IGNOU
                    </span>
                    <span className={styles.instBadge}>Indira Gandhi National Open University</span>
                  </div>
                  <h3 className={styles.degreeTitle}>Tech-Savvy Problem Solver & Web Specialist</h3>
                  <p className={styles.degreeDesc}>
                    Continuous hands-on specialization in full-stack web development, WordPress architecture, technical search engine optimization (SEO), and digital marketing workflows.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values / Philosophy */}
        <section className="section" style={{ background: 'var(--clr-bg-secondary)' }}>
          <div className="container">
            <div className="text-center mb-md">
              <span className="section-label">Philosophy</span>
              <h2 className="section-title">My Core <span>Values</span></h2>
              <p className="section-subtitle" style={{ margin: '0 auto' }}>
                Every line of code I write and campaign I deploy is guided by four core principles.
              </p>
            </div>

            <motion.div
              className={styles.valuesGrid}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
            >
              {VALUES.map((val, idx) => (
                <motion.div
                  key={idx}
                  className={`glass-card ${styles.valueCard}`}
                  variants={cardVariants}
                  data-cursor="hover"
                >
                  <div className={styles.valueIcon}>{val.icon}</div>
                  <h3 className={styles.valueTitle}>{val.title}</h3>
                  <p className={styles.valueDesc}>{val.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Call to Action Banner */}
        <section className="section">
          <div className="container">
            <div className={`glass-card ${styles.ctaBanner}`} data-cursor="hover">
              <div className={styles.ctaContent}>
                <h2>Ready to grow your business online?</h2>
                <p>Let's map out a customized web development and SEO strategy for your brand.</p>
              </div>
              <div className={styles.ctaButtons}>
                <a href="/contact" className="btn btn-primary btn-lg" data-cursor="hover">
                  <Mail size={16} /> Book a Discovery Call
                </a>
                <a
                  href="https://wa.me/916005401734"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-lg"
                  data-cursor="hover"
                >
                  <MessageSquare size={16} /> WhatsApp Me
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}