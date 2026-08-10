import { motion } from 'framer-motion'
import { Download, Award, Shield, Heart, Zap, Sparkles, GraduationCap, Calendar, Mail, MessageSquare } from 'lucide-react'
import SEOMeta from '@/components/common/SEOMeta'
import { aboutPageSchema, breadcrumbSchema } from '@/utils/schema'
import styles from './AboutPage.module.css'

const VALUES = [
  {
    icon: <Zap size={24} className="text-primary" />,
    title: 'Automation First',
    desc: 'If a task can be automated, it should be. I build workflows that save hours of human labor, allowing teams to focus on strategy.',
  },
  {
    icon: <Shield size={24} className="text-secondary" />,
    title: 'Security & Integrity',
    desc: 'From JWT security protocols to file upload filtering, I design systems with security as a core pillar, never an afterthought.',
  },
  {
    icon: <Award size={24} className="text-purple" />,
    title: 'Result-Driven ROI',
    desc: 'Beautiful websites are useless if they don\'t convert. Every button, meta tag, and feature is optimized to drive business leads.',
  },
  {
    icon: <Heart size={24} className="text-primary" />,
    title: 'Transparency & Trust',
    desc: 'No jargon, no hidden fees. I provide clear scopes of work, direct WhatsApp communication, and regular performance reports.',
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
        title="About Hussain Lone, Web Developer"
        description="Meet Hussain Lone, a web developer in Srinagar, J&K. Expert in web development, SEO, Meta Ads & digital marketing, serving clients worldwide."
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
                  <Sparkles size={14} className="text-primary" /> Meet Hussain Lone
                </div>
                <h1 className={styles.mainTitle}>
                  Best Web Developer in <span>J&K, Kashmir</span> — Building Digital Solutions That Scale
                </h1>
                <p className={styles.heroDesc}>
                  I bridge the technical gap between complex programming pipelines, organic search marketing, and beautiful user experience designs.
                </p>
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

        {/* Detailed Story Section */}
        <section className="section" style={{ background: 'var(--clr-bg-secondary)' }}>
          <div className="container">
            <div className={styles.storyGrid}>
              <div className={styles.storyLeft}>
                <span className="section-label">My Story</span>
                <h2 className={styles.storyTitle}>From Code To Business <span>Automation</span></h2>
              </div>
              <div className={styles.storyRight}>
                <p className={styles.storyParagraph}>
                  I started my tech journey in Srinagar, Jammu & Kashmir, focused on designing websites. Over the years, I realized that businesses in J&K and beyond need more than just a static online presence — they need systems that run automatically, generate leads organically, and convert traffic seamlessly.
                </p>
                <p className={styles.storyParagraph}>
                  As the best web developer in Kashmir, I expanded into SEO strategies, Meta Ads, and digital marketing. Today, I create cohesive digital hubs: high-performance websites connected to robust APIs, optimized to rank #1 on Google for searches like "web developer in Kashmir" and "best web developer in J&K".
                </p>
                <p className={styles.storyParagraph}>
                  Based in Srinagar, Jammu & Kashmir, I collaborate with clients worldwide — including brands in the United States, Europe, and across India — helping businesses in J&K and globally streamline operations and build search engine authority.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values / Philosophy */}
        <section className="section">
          <div className="container">
            <div className="text-center mb-md">
              <span className="section-label">Philosophy</span>
              <h2 className="section-title">My Core <span>Values</span></h2>
              <p className="section-subtitle" style={{ margin: '0 auto' }}>
                Every line of code I write and strategy I deploy is guided by four principles.
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



        {/* Call to Action */}
        <section className="section">
          <div className="container">
            <div className={`glass-card ${styles.ctaBanner}`} data-cursor="hover">
              <div className={styles.ctaContent}>
                <h2>Ready to automate and grow your brand?</h2>
                <p>Let's map out a customized digital solution that targets your exact business bottlenecks.</p>
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