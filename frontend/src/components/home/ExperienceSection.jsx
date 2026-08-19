import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Briefcase, GraduationCap, Calendar, ArrowRight } from 'lucide-react'
import styles from './ExperienceSection.module.css'

const TIMELINE = [
  {
    type: 'work',
    role: 'Freelance Developer & AI Specialist',
    company: 'Tech With Hussain',
    period: '2023 - Present',
    desc: 'Building bespoke AI-agent automations, custom API integrations (OpenAI/Claude), full-stack WordPress agency setups, and ranking client platforms on search engines.',
  },
  {
    type: 'work',
    role: 'SEO & Web Developer',
    company: 'Local Digital Agency',
    period: '2022 - Present',
    desc: 'Implemented schema integrations, executed advanced site audits (Core Web Vitals optimizations), and grew local business site rankings on search results by 200%.',
  },
  {
    type: 'work',
    role: 'Tech Content Creator',
    company: 'Self-Employed / Social Media',
    period: '2021 - Present',
    desc: 'Producing educational coding and automation guides on YouTube, Instagram, and LinkedIn. Creating digital courses and video editing assets.',
  },
]

export default function ExperienceSection() {
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  }

  return (
    <section className="section" id="experience" style={{ background: 'rgba(255, 255, 255, 0.01)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-md">
          <span className="section-label">Timeline</span>
          <h2 className="section-title">
            My Professional <span>Journey</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            A chronological timeline of my professional experience, freelance achievements, and key milestones.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className={styles.timelineWrapper}>
          <div className={styles.centerLine} />

          <motion.div
            className={styles.timelineItems}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {TIMELINE.map((item, idx) => {
              const isEven = idx % 2 === 0
              const itemTypeClass = item.type === 'work' ? styles.itemWork : styles.itemEdu

              return (
                <motion.div
                  key={idx}
                  className={`${styles.timelineItem} ${isEven ? styles.left : styles.right} ${itemTypeClass}`}
                  variants={{
                    hidden: { opacity: 0, x: isEven ? -50 : 50 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
                  }}
                >
                  {/* Timeline Badge/Dot */}
                  <div className={styles.timelineDot}>
                    {item.type === 'work' ? <Briefcase size={16} /> : <GraduationCap size={16} />}
                  </div>

                  {/* Card Content */}
                  <div className={`glass-card ${styles.timelineCard}`}>
                    <div className={styles.cardHeader}>
                      <span className={styles.period}>
                        <Calendar size={12} /> {item.period}
                      </span>
                      <span className={styles.typeBadge}>
                        {item.type === 'work' ? 'Experience' : 'Education'}
                      </span>
                    </div>

                    <h3 className={styles.roleTitle}>{item.role}</h3>
                    <h4 className={styles.companyName}>{item.company}</h4>
                    <p className={styles.descText}>{item.desc}</p>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-lg">
          <Link to="/experience/" className="btn btn-outline btn-lg" data-cursor="hover">
            View Detailed Timeline <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
