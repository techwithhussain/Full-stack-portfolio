import { useParams, Link, Navigate } from 'react-router-dom'
import { ArrowLeft, ExternalLink, CheckCircle2, AlertCircle, Quote, Calendar, User, Compass } from 'lucide-react'
import { IconGithub } from '@/components/common/SocialIcons'
import SEOMeta from '@/components/common/SEOMeta'
import { useState, useEffect } from 'react'
import axios from 'axios'
import styles from './ProjectDetailPage.module.css'

// Projects loaded dynamically from DB

import { PROJECTS_DATA } from '@/data/projectsData'

export default function ProjectDetailPage() {
  const { slug } = useParams()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    const fallbackMatch = PROJECTS_DATA.find(p => p.slug === slug || slug.includes('walnut'))
    
    axios.get(`/api/projects/index.php?slug=${slug}`)
      .then(res => {
        if (res.data.success && res.data.data) {
          const p = res.data.data
          setProject({
            title: p.title,
            category: p.category || '',
            desc: p.excerpt || '',
            image: p.thumbnail || '',
            tech: Array.isArray(p.technologies) ? p.technologies : [],
            problem: p.description || '',
            solution: '',
            results: Array.isArray(p.results) ? p.results.map(r => `${r.value} ${r.label}`) : [],
            liveUrl: p.live_url,
            githubUrl: p.github_url,
            client: 'WalnutWala Kashmir',
            timeline: 'Recent Project',
            role: p.category || 'Developer & SEO Expert',
            review: null
          })
        } else if (fallbackMatch) {
          setProject({
            title: fallbackMatch.title,
            category: fallbackMatch.category,
            desc: fallbackMatch.excerpt,
            image: fallbackMatch.thumbnail,
            tech: fallbackMatch.technologies,
            problem: fallbackMatch.description,
            solution: 'Designed and developed custom WooCommerce platform, integrated payment gateway, and optimized Core Web Vitals with technical schema for #1 Google rank.',
            results: fallbackMatch.results.map(r => `${r.value} ${r.label}`),
            liveUrl: fallbackMatch.liveUrl,
            githubUrl: fallbackMatch.githubUrl,
            client: 'WalnutWala Kashmir',
            timeline: 'Recent Project',
            role: 'E-Commerce Developer & SEO Specialist',
            review: {
              quote: 'Hussain developed our website walnutwala.com and optimized our SEO. We saw tremendous growth in online orders and top Google rankings within months!',
              author: 'WalnutWala Team',
              title: 'Owner, WalnutWala.com'
            }
          })
        } else {
          setNotFound(true)
        }
      })
      .catch(() => {
        if (fallbackMatch) {
          setProject({
            title: fallbackMatch.title,
            category: fallbackMatch.category,
            desc: fallbackMatch.excerpt,
            image: fallbackMatch.thumbnail,
            tech: fallbackMatch.technologies,
            problem: fallbackMatch.description,
            solution: 'Designed and developed custom WooCommerce platform, integrated payment gateway, and optimized Core Web Vitals with technical schema for #1 Google rank.',
            results: fallbackMatch.results.map(r => `${r.value} ${r.label}`),
            liveUrl: fallbackMatch.liveUrl,
            githubUrl: fallbackMatch.githubUrl,
            client: 'WalnutWala Kashmir',
            timeline: 'Recent Project',
            role: 'E-Commerce Developer & SEO Specialist',
            review: {
              quote: 'Hussain developed our website walnutwala.com and optimized our SEO. We saw tremendous growth in online orders and top Google rankings within months!',
              author: 'WalnutWala Team',
              title: 'Owner, WalnutWala.com'
            }
          })
        } else {
          setNotFound(true)
        }
      })
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) {
    return <div style={{ padding: '100px 20px', textAlign: 'center', color: '#fff', fontSize: '15px' }}>Loading Case Study...</div>
  }

  if (notFound || !project) {
    return <Navigate to="/404" replace />
  }

  return (
    <>
      <SEOMeta
        title={`${project.title} · Case Study`}
        description={project.desc}
        canonical={`/projects/${slug}`}
      />

      <div className={styles.projectDetail}>
        <div className="container">
          {/* Back button */}
          <Link to="/projects" className={styles.backBtn} data-cursor="hover">
            <ArrowLeft size={16} /> Back to Projects
          </Link>

          {/* Main Grid */}
          <div className={styles.detailHeader}>
            <div className={styles.titleArea}>
              <span className={styles.catBadge}>{project.category.toUpperCase()}</span>
              <h1 className={styles.title}>{project.title}</h1>
              <p className={styles.desc}>{project.desc}</p>

              <div className={styles.actionRow}>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  data-cursor="hover"
                >
                  <ExternalLink size={16} /> Visit Live Project
                </a>
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                    data-cursor="hover"
                  >
                    <IconGithub size={16} /> View Code
                  </a>
                )}
              </div>
            </div>

            {/* Project Specs */}
            <div className={`glass-card ${styles.specsCard}`}>
              <div className={styles.specItem}>
                <User size={16} className="text-primary" />
                <div>
                  <h4>Client</h4>
                  <p>{project.client}</p>
                </div>
              </div>

              <div className={styles.specItem}>
                <Calendar size={16} className="text-secondary" />
                <div>
                  <h4>Timeline</h4>
                  <p>{project.timeline}</p>
                </div>
              </div>

              <div className={styles.specItem}>
                <Compass size={16} className="text-purple" />
                <div>
                  <h4>My Role</h4>
                  <p>{project.role}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Large Thumbnail Image */}
          <div className={styles.heroImgWrapper}>
            <img src={project.image} alt={project.title} className={styles.heroImg} />
          </div>

          {/* Case Study Story */}
          <div className={styles.storyGrid}>
            {/* Story text */}
            <div className={styles.storyText}>
              <section className={styles.sectionBlock}>
                <h2>Challenge & Project Details</h2>
                <p style={{ whiteSpace: 'pre-wrap' }}>{project.problem}</p>
              </section>

              {project.solution && (
                <section className={styles.sectionBlock}>
                  <h2>The Solution</h2>
                  <p>{project.solution}</p>
                </section>
              )}

              {/* Client Review */}
              {project.review && (
                <div className={`glass-card ${styles.reviewCard}`}>
                  <Quote className={styles.quoteIcon} size={32} />
                  <p className={styles.reviewText}>"{project.review.text}"</p>
                  <h4 className={styles.reviewAuthor}>— {project.review.author}</h4>
                </div>
              )}
            </div>

            {/* Results & Tech Stack Sidebar */}
            <div className={styles.sidebar}>
              <div className={`glass-card ${styles.resultsCard}`}>
                <h3 className={styles.resultsTitle}>Key Results</h3>
                <ul className={styles.resultsList}>
                  {project.results.map((res, idx) => (
                    <li key={idx}>
                      <CheckCircle2 size={18} className="text-primary" />
                      <span>{res}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={`glass-card ${styles.techCard}`}>
                <h3>Technologies Used</h3>
                <div className={styles.techStack}>
                  {project.tech.map((t, idx) => (
                    <span key={idx} className={styles.techBadge}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}