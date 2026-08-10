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
          const mappedProjects = PROJECTS_DATA.map((masterProj) => {
            const dbMatch = dbItems.find(d => {
              const lower = (d.title || '').toLowerCase()
              return d.slug === masterProj.slug ||
                (masterProj.slug === 'walnutwala' && lower.includes('walnut')) ||
                (masterProj.slug === 'guru-digital-advertising' && lower.includes('guru') && !lower.includes('gurukul')) ||
                (masterProj.slug === 'gurukul-vidya-peeth' && lower.includes('gurukul'))
            })

            const thumbnailPath = masterProj.thumbnail || masterProj.image

            return {
              ...masterProj,
              id: dbMatch ? dbMatch.id : masterProj.id,
              image: thumbnailPath,
              thumbnail: thumbnailPath,
              desc: (dbMatch && dbMatch.excerpt) ? dbMatch.excerpt : masterProj.desc,
              liveUrl: (dbMatch && dbMatch.live_url) ? dbMatch.live_url : masterProj.liveUrl,
              githubUrl: (dbMatch && dbMatch.github_url) ? dbMatch.github_url : masterProj.githubUrl,
              results: (dbMatch && Array.isArray(dbMatch.results) && dbMatch.results.length > 0) ? dbMatch.results : masterProj.results,
            }
          })
          setProjectsList(mappedProjects)
        }
      })
      .catch(() => {
        setProjectsList(PROJECTS_DATA)
      })
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
