import { Download, Mail, Phone, MapPin, Printer, ExternalLink, ArrowRight } from 'lucide-react'
import SEOMeta from '@/components/common/SEOMeta'
import { webPageSchema, breadcrumbSchema } from '@/utils/schema'
import { SITE } from '@/data/constants'
import { getEmail } from '@/utils/obfuscateEmail'
import styles from './ResumePage.module.css'

export default function ResumePage() {
  const handlePrint = () => {
    window.print()
  }

  return (
    <>
      <SEOMeta
        title="Interactive Resume · Hussain Lone"
        description="Curriculum Vitae of Hussain Lone. Web developer, SEO expert, and AI workflow specialist in Srinagar, J&K."
        canonical="/resume"
        schema={[
          webPageSchema({ title: 'Interactive Resume · Hussain Lone', description: 'Curriculum Vitae of Hussain Lone.', path: '/resume' }),
          breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Resume', path: '/resume' }]),
        ]}
      />

      <div className={styles.resumePage}>
        {/* Page Header */}
        <section className={styles.heroSection}>
          <div className="container">
            <div className="text-center">
              <span className="section-label">Curriculum Vitae</span>
              <h1 className={styles.mainTitle}>
                Professional <span>Resume</span>
              </h1>
              <p className={styles.heroDesc}>
                Review my professional expertise and major development highlights. You can print or download the document below.
              </p>

              <div className={styles.actionsRow}>
                <a href="/resume.pdf" download className="btn btn-primary" data-cursor="hover">
                  <Download size={16} /> Download PDF
                </a>
                <button onClick={handlePrint} className="btn btn-outline" data-cursor="hover">
                  <Printer size={16} /> Print Resume
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Paper Sheet Wrapper */}
        <section className={styles.paperSection}>
          <div className="container">
            <div className={styles.paperContainer}>
              <div className={styles.resumePaper}>
                {/* Header */}
                <header className={styles.header}>
                  <div className={styles.headerMain}>
                    <h2>Hussain Lone</h2>
                    <h3>AI Developer & Web Architect</h3>
                    <p className={styles.summaryText}>
                      Result-oriented Full Stack Developer with 3+ years of experience specializing in custom AI integrations, automated n8n/Make pipelines, speed audits (Core Web Vitals), and SEO rankings.
                    </p>
                  </div>
                  <div className={styles.headerContact}>
                    <span className={styles.contactItem}><Mail size={12} /> {getEmail()}</span>
                    <span className={styles.contactItem}><Phone size={12} /> {SITE.phone}</span>
                    <span className={styles.contactItem}><MapPin size={12} /> Srinagar, J&K, India</span>
                    <span className={styles.contactItem}><ExternalLink size={12} /> techwithhussain.online</span>
                  </div>
                </header>

                <div className={styles.bodyGrid}>
                  {/* Left Column */}
                  <div className={styles.leftCol}>
                    {/* Skills */}
                    <section className={styles.resumeSection}>
                      <h3 className={styles.sectionTitle}>Skills Inventory</h3>
                      <div className={styles.skillsList}>
                        <div>
                          <h4>AI & AUTOMATION</h4>
                          <p>OpenAI, Claude API, n8n, Make.com, LangChain, Flowise, Custom GPTs, API Webhooks</p>
                        </div>
                        <div>
                          <h4>WEB DEVELOPMENT</h4>
                          <p>WordPress, Elementor, PHP (REST APIs), React 18, Vite, Javascript, CSS3, MySQL, Git</p>
                        </div>
                        <div>
                          <h4>FULL SEO</h4>
                          <p>PageSpeed Tuning (90+), Schema Markups (JSON-LD), Keyword Audit, Local SEO, Analytics</p>
                        </div>
                        <div>
                          <h4>CONTENT CREATION</h4>
                          <p>Video Editing (CapCut, Premiere), Copywriting, Content Calendar Planning</p>
                        </div>
                      </div>
                    </section>


                  </div>

                  {/* Right Column */}
                  <div className={styles.rightCol}>
                    {/* Experience */}
                    <section className={styles.resumeSection}>
                      <h3 className={styles.sectionTitle}>Professional Experience</h3>
                      
                      <div className={styles.jobItem}>
                        <div className={styles.jobHeader}>
                          <h4>Freelance Full Stack Developer</h4>
                          <span>2023 - Present</span>
                        </div>
                        <h5>Tech With Hussain</h5>
                        <ul>
                          <li>Built custom AI-driven chatbot interfaces connected to WooCommerce inventories, reducing ticket wait times.</li>
                          <li>Developed automated CRM leads pipelines via n8n webhooks, saving agencies 15+ hours/week in manual inputs.</li>
                          <li>Designed premium dark-glassmorphism portfolio templates in WordPress.</li>
                        </ul>
                      </div>

                      <div className={styles.jobItem}>
                        <div className={styles.jobHeader}>
                          <h4>SEO & Web Specialist</h4>
                          <span>2022 - Present</span>
                        </div>
                        <h5>Local Digital Agency</h5>
                        <ul>
                          <li>Conducted keyword audits and local schema markups, boosting client Map Pack positions.</li>
                          <li>Optimized page sizes, image formats, and deferred scripts to pass Core Web Vitals targets.</li>
                          <li>Maintained and modified custom PHP widgets on client sites.</li>
                        </ul>
                      </div>
                    </section>

                    {/* Certifications */}
                    <section className={styles.resumeSection}>
                      <h3 className={styles.sectionTitle}>Key Certifications</h3>
                      <ul className={styles.certsList}>
                        <li><strong>Google SEO & Analytics Certificate</strong> (Google Digital Academy, 2024)</li>
                        <li><strong>AI Workflow Developer Certificate</strong> (DeepLearning.AI, 2023)</li>
                        <li><strong>Advanced WordPress Specialist</strong> (Elementor Academy, 2022)</li>
                      </ul>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}