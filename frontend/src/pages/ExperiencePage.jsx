import { Link } from 'react-router-dom'
import { Briefcase, GraduationCap, Calendar, Compass, ArrowRight, CheckCircle2 } from 'lucide-react'
import SEOMeta from '@/components/common/SEOMeta'
import { webPageSchema, breadcrumbSchema } from '@/utils/schema'
import styles from './ExperiencePage.module.css'

const WORK_ITEMS = [
  {
    role: 'Freelance Full Stack Developer & AI Specialist',
    company: 'Tech With Hussain',
    period: '2023 - Present',
    desc: 'Engineering bespoke web systems and AI automations. Hooking up custom chatbot modules using OpenAI APIs and vector databases. Developing responsive e-commerce and agency themes in WordPress. Setting up automated workflows on n8n and Make.com pipelines that save clients dozens of hours weekly.',
    highlights: [
      'Automated customer lead capture pipelines for 10+ international clients.',
      'Designed and coded a lightweight SaaS SERP tracker in React.',
      'Wrote secure PHP REST APIs checking JWT credentials via httpOnly cookies.',
    ],
  },
  {
    role: 'SEO & Web Development Specialist',
    company: 'Local Digital Agency',
    period: '2022 - Present',
    desc: 'Conducted core optimizations and keyword research mapping. Conducted deep technical crawlers audits to eliminate duplicate markup parameters. Implemented Local Business schema JSON-LD scripts to grow Map Pack visibility.',
    highlights: [
      'Successfully passed Google Core Web Vitals targets for 15+ client portals.',
      'Drove average local search position rankings from page 3 to page 1.',
      'Reduced average site loading times by over 60% through file compression.',
    ],
  },
  {
    role: 'Tech Content Creator',
    company: 'Self-Employed / Social Channels',
    period: '2021 - Present',
    desc: 'Creating visual software and workflow automation tutorials. Editing high-retaining shortform videos and formatting copywriting assets for developers and marketers on YouTube and Instagram.',
    highlights: [
      'Produced 50+ tutorial videos on coding, automation, and tech practices.',
      'Gained deep familiarity withCapCut Pro and Adobe Premiere editing platforms.',
      'Designed custom graphic layouts and sitemaps for digital courses.',
    ],
  },
]

export default function ExperiencePage() {
  return (
    <>
      <SEOMeta
        title="Experience & Education · Hussain Lone"
        description="Browse the detailed professional timeline of Hussain Lone. Read about freelance achievements, agency web works, and BCA curriculum details."
        canonical="/experience/"
        schema={[
          webPageSchema({ title: 'Experience & Education · Hussain Lone', description: 'Professional timeline of Hussain Lone.', path: '/experience/' }),
          breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Experience', path: '/experience/' }]),
        ]}
      />

      <div className={styles.experiencePage}>
        {/* Page Header */}
        <section className={styles.heroSection}>
          <div className="container">
            <div className="text-center">
              <span className="section-label">Timeline</span>
              <h1 className={styles.mainTitle}>
                Experience & <span>Journey</span>
              </h1>
              <p className={styles.heroDesc}>
                A chronological breakdown of my professional history, freelance achievements, and key milestones.
              </p>
            </div>
          </div>
        </section>

        {/* Detailed Work Experience */}
        <section className="section">
          <div className="container">
            <h2 className={styles.subTitle}><Briefcase className="text-primary" /> Work Experience</h2>
            
            <div className={styles.workList}>
              {WORK_ITEMS.map((item, idx) => (
                <div key={idx} className={`glass-card ${styles.workCard}`} data-cursor="hover">
                  <div className={styles.cardHeader}>
                    <div>
                      <h3 className={styles.roleTitle}>{item.role}</h3>
                      <h4 className={styles.companyName}>{item.company}</h4>
                    </div>
                    <span className={styles.periodBadge}>
                      <Calendar size={12} /> {item.period}
                    </span>
                  </div>

                  <p className={styles.workDesc}>{item.desc}</p>

                  <div className={styles.divider} />

                  <h5 className={styles.highlightTitle}>Key Highlights:</h5>
                  <ul className={styles.highlightsList}>
                    {item.highlights.map((high, i) => (
                      <li key={i}>
                        <CheckCircle2 size={16} className="text-primary" />
                        <span>{high}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Action Call */}
        <section className="section">
          <div className="container">
            <div className={styles.ctaBox}>
              <h2>Ready to scale your digital presence?</h2>
              <p>Let's talk about how my skills in development, automation, and SEO can grow your business.</p>
              <Link to="/contact/" className="btn btn-primary btn-lg mt-sm" data-cursor="hover">
                Connect with Hussain <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}