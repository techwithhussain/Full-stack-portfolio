import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ExternalLink, ArrowRight } from 'lucide-react'
import axios from 'axios'
import styles from './ProjectsSection.module.css'

import { PROJECTS_DATA } from '@/data/projectsData'

const CATEGORIES = [
  { id: 'all',       label: 'All Projects' },
  { id: 'ai',        label: 'AI & Automation' },
  { id: 'wordpress', label: 'WordPress' },
  { id: 'seo',       label: 'Full SEO' },
  { id: 'tools',     label: 'Web Tools' },
]

const getResultIcon = (label) => {
  const l = label.toLowerCase()
  if (l.includes('pagespeed') || l.includes('speed')) return '🚀'
  if (l.includes('conversion') || l.includes('optimize') || l.includes('rate')) return '⏱'
  if (l.includes('seo') || l.includes('search')) return '🔍'
  if (l.includes('loading') || l.includes('fast')) return '⚡'
  if (l.includes('ui') || l.includes('design') || l.includes('clean')) return '🎯'
  if (l.includes('course') || l.includes('platform') || l.includes('book')) return '📚'
  return '⭐'
}

export default function ProjectsSection() {
  const [filter, setFilter] = useState('all')
  const [projectsList, setProjectsList] = useState(PROJECTS_DATA)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    axios.get('/api/projects/index.php?featured=1')
      .then(res => {
        if (res.data.success && Array.isArray(res.data.data.items) && res.data.data.items.length > 0) {
          const dbItems = res.data.data.items
          const dbMapped = dbItems.map(p => {
            const lowerTitle = (p.title || '').toLowerCase()
            const fallbackMatch = PROJECTS_DATA.find(pd => pd.slug === p.slug || (lowerTitle.includes('walnut') && pd.slug === 'walnutwala') || (lowerTitle.includes('guru') && pd.slug === 'guru-digital-advertising') || (lowerTitle.includes('gurukul') && pd.slug === 'gurukul-vidya-peeth'))
            
            let thumbnailPath = p.thumbnail
            if (!thumbnailPath || thumbnailPath.trim() === '') {
              if (lowerTitle.includes('walnut')) {
                thumbnailPath = '/walnuta.webp'
              } else if (lowerTitle.includes('guru') && !lowerTitle.includes('gurukul')) {
                thumbnailPath = '/guru.webp'
              } else if (lowerTitle.includes('gurukul')) {
                thumbnailPath = '/school.webp'
              } else if (lowerTitle.includes('ai') || lowerTitle.includes('lead') || lowerTitle.includes('chat')) {
                thumbnailPath = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80'
              } else {
                thumbnailPath = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'
              }
            }

            let resultsList = Array.isArray(p.results) ? p.results : []
            if (resultsList.length === 0 && fallbackMatch) {
              resultsList = fallbackMatch.results
            }

            return {
              id: p.id,
              title: lowerTitle.includes('walnut') ? 'WalnutWala — Kashmiri Walnuts & Organic Dry Fruits Store' : (lowerTitle.includes('gurukul') ? 'Gurukul Vidya Peeth — Educational Institution & School Management Portal' : (lowerTitle.includes('guru') ? 'Guru Digital Advertising — Top Digital Marketing & Web Agency' : p.title)),
              slug: lowerTitle.includes('walnut') ? 'walnutwala' : (lowerTitle.includes('gurukul') ? 'gurukul-vidya-peeth' : (lowerTitle.includes('guru') ? 'guru-digital-advertising' : p.slug)),
              desc: p.excerpt || (fallbackMatch ? fallbackMatch.desc : ''),
              category: p.category || (lowerTitle.includes('guru') && !lowerTitle.includes('gurukul') ? 'Web Development' : 'WordPress'),
              image: thumbnailPath,
              thumbnail: thumbnailPath,
              tech: Array.isArray(p.technologies) && p.technologies.length > 0 ? p.technologies : (fallbackMatch ? fallbackMatch.technologies : ['WordPress', 'SEO Optimization', 'Responsive UI']),
              liveUrl: p.live_url || (lowerTitle.includes('walnut') ? 'https://walnutwala.com/' : (lowerTitle.includes('gurukul') ? 'https://www.gurukulvidyahpeeth.in/' : (lowerTitle.includes('guru') ? 'https://www.gurudigitaladvertising.com/' : 'https://techwithhussain.online'))),
              githubUrl: p.github_url,
              results: resultsList,
            }
          })
          const missingMasterItems = PROJECTS_DATA.filter(m => !dbMapped.some(d => d.slug === m.slug))
          setProjectsList([...dbMapped, ...missingMasterItems])
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  const filteredProjects = projectsList.filter((project) => {
    return filter === 'all' || (() => {
      const tab = filter.toLowerCase()
      const cat = project.category.toLowerCase()
      if (tab === 'ai' && (cat.includes('ai') || cat.includes('automation'))) return true
      if (tab === 'seo' && cat.includes('seo')) return true
      if (tab === 'wordpress' && cat.includes('wordpress')) return true
      if (tab === 'tools' && (cat.includes('tools') || cat.includes('saas') || cat.includes('dev'))) return true
      return cat === tab
    })()
  })

  return (
    <section className="section" id="projects">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-md">
          <span className="section-label">Portfolio</span>
          <h2 className="section-title">
            Featured <span>Case Studies</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            A showcase of my recent client work and open-source applications built to solve real-world problems.
          </p>
        </div>

        {/* Filters */}
        <div className={styles.filterContainer}>
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`${styles.filterBtn} ${filter === cat.id ? styles.activeFilter : ''}`}
              data-cursor="hover"
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className={styles.gridWrapper}>
          <motion.div layout className={styles.projectsGrid}>
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => {
                return (
                  <motion.div
                    layout
                    key={project.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className={`glass-card ${styles.projectCard}`}
                    data-cursor="hover"
                    onClick={() => {
                      if (project.liveUrl) {
                        window.open(project.liveUrl, '_blank', 'noopener,noreferrer')
                      }
                    }}
                    style={{ cursor: project.liveUrl ? 'pointer' : 'default' }}
                  >
                    {/* Card Thumbnail */}
                    <div className={styles.thumbWrapper}>
                      {(project.image || project.thumbnail) ? (
                        <img
                          src={project.image || project.thumbnail}
                          alt={project.title}
                          className={styles.thumb}
                          loading="lazy"
                        />
                      ) : (
                        <div style={{
                          width: '100%',
                          height: '100%',
                          background: 'rgba(255,255,255,0.02)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--clr-text-muted)',
                          fontSize: '14px'
                        }}>No Project Image</div>
                      )}
                    </div>

                    {/* Card Info */}
                    <div className={styles.info}>
                      <span className={styles.categoryBadge}>
                        {project.category.toUpperCase()}
                      </span>
                      <h3 className={styles.projectTitle}>{project.title}</h3>
                      <p className={styles.projectDesc}>{project.desc}</p>

                      {/* Results Pills */}
                      {project.results && project.results.length > 0 && (
                        <div className={styles.resultsContainer}>
                          {project.results.slice(0, 3).map((res, rIdx) => {
                            const colorsMap = {
                              blue: { bg: 'rgba(59, 130, 246, 0.1)', border: 'rgba(59, 130, 246, 0.25)', color: '#60a5fa' },
                              green: { bg: 'rgba(16, 185, 129, 0.1)', border: 'rgba(16, 185, 129, 0.25)', color: '#34d399' },
                              pink: { bg: 'rgba(236, 72, 153, 0.1)', border: 'rgba(236, 72, 153, 0.25)', color: '#f472b6' }
                            }
                            const defaultColors = [colorsMap.blue, colorsMap.green, colorsMap.pink]
                            const theme = res.color ? (colorsMap[res.color.toLowerCase()] || defaultColors[rIdx % 3]) : defaultColors[rIdx % 3]
                            const icon = res.icon || getResultIcon(res.label || '')
                            return (
                              <span 
                                key={rIdx} 
                                className={styles.resultPill}
                                style={{
                                  backgroundColor: theme.bg,
                                  borderColor: theme.border,
                                  color: theme.color
                                }}
                              >
                                <span style={{ marginRight: '4px' }}>{icon}</span>
                                {res.value ? `${res.value} ` : ''}{res.label}
                              </span>
                            )
                          })}
                        </div>
                      )}

                      {/* View Project Link Footer */}
                      <div className={styles.viewLink}>
                        View Project <ExternalLink size={14} style={{ marginLeft: '4px' }} />
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-lg">
          <Link to="/projects" className="btn btn-outline btn-lg" data-cursor="hover">
            View All Projects <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
