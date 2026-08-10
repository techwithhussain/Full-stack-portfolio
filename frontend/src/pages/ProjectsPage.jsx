import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Search, SlidersHorizontal, ExternalLink, ArrowRight } from 'lucide-react'
import SEOMeta from '@/components/common/SEOMeta'
import { websiteSchema } from '@/utils/schema'
import axios from 'axios'
import styles from './ProjectsPage.module.css'

import { PROJECTS_DATA } from '@/data/projectsData'

const CATEGORIES = [
  { id: 'all',            label: 'All Projects' },
  { id: 'web-dev',        label: 'Web Development' },
  { id: 'wordpress',      label: 'WordPress' },
  { id: 'seo',            label: 'Full SEO' },
  { id: 'thumbnail-dev',  label: 'Thumbnail Design' },
  { id: 'transformation', label: 'Transformations' },
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

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('all')
  const [sortBy, setSortBy] = useState('default')
  const [projectsList, setProjectsList] = useState(PROJECTS_DATA)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    axios.get('/api/projects/index.php')
      .then(res => {
        if (res.data.success && Array.isArray(res.data.data.items) && res.data.data.items.length > 0) {
          const dbItems = res.data.data.items
          // Merge master PROJECTS_DATA with DB items so all project items render reliably
          const masterSlugs = PROJECTS_DATA.map(p => p.slug)
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
              content: p.description || '',
              gallery: Array.isArray(p.gallery) ? p.gallery : [],
            }
          })

          // Combine db items with any missing master items from PROJECTS_DATA
          const missingMasterItems = PROJECTS_DATA.filter(m => !dbMapped.some(d => d.slug === m.slug))
          setProjectsList([...dbMapped, ...missingMasterItems])
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  // Search & filter logic
  const filteredProjects = useMemo(() => {
    return projectsList.filter((project) => {
      const matchesQuery =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tech.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesCategory = activeTab === 'all' || (() => {
        const tab = activeTab.toLowerCase()
        const cat = project.category.toLowerCase()
        if (tab === 'web-dev' && (cat.includes('web dev') || cat.includes('ai') || cat.includes('saas') || cat.includes('other'))) return true
        if (tab === 'wordpress' && cat.includes('wordpress')) return true
        if (tab === 'seo' && cat.includes('seo')) return true
        if (tab === 'thumbnail-dev' && cat.includes('thumbnail')) return true
        if (tab === 'transformation' && (cat.includes('before & after') || cat.includes('transformation'))) return true
        return cat === tab
      })()

      return matchesQuery && matchesCategory
    })
  }, [projectsList, searchQuery, activeTab])

  // Sorting logic
  const sortedProjects = useMemo(() => {
    return [...filteredProjects].sort((a, b) => {
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title)
      }
      return 0 // default
    })
  }, [filteredProjects, sortBy])

  const renderCard = (project) => {
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
        {/* Thumbnail */}
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

        {/* Details */}
        <div className={styles.info}>
          <span className={styles.catBadge}>
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
  }

  const renderTransformationCard = (project) => {
    return (
      <motion.div
        layout
        key={project.id}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4 }}
        className={`glass-card ${styles.transformationCard}`}
      >
        {/* Header */}
        <div className={styles.transformationHeader}>
          <div>
            <h3 className={styles.transformationTitle}>{project.title}</h3>
            {project.desc && <span className={styles.transformationClient}>{project.desc}</span>}
          </div>
          
          {/* Results Pill */}
          {project.results && project.results.length > 0 && (
            <div className={styles.resultsContainer} style={{ margin: 0 }}>
              {project.results.slice(0, 1).map((res, rIdx) => {
                const colorsMap = {
                  blue: { bg: 'rgba(59, 130, 246, 0.1)', border: 'rgba(59, 130, 246, 0.25)', color: '#60a5fa' },
                  green: { bg: 'rgba(16, 185, 129, 0.1)', border: 'rgba(16, 185, 129, 0.25)', color: '#34d399' },
                  pink: { bg: 'rgba(236, 72, 153, 0.1)', border: 'rgba(236, 72, 153, 0.25)', color: '#f472b6' }
                }
                const theme = res.color ? (colorsMap[res.color.toLowerCase()] || colorsMap.green) : colorsMap.green
                const icon = res.icon || '📈'
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
        </div>

        {/* Video Title Block */}
        {project.content && (
          <div className={styles.videoTitleBox}>
            <span className={styles.videoTitleLabel}>VIDEO TITLE</span>
            <p className={styles.videoTitleText}>{project.content}</p>
          </div>
        )}

        {/* Side-by-Side Images */}
        <div className={styles.comparisonGrid}>
          <div className={styles.comparisonBox}>
            {project.gallery && project.gallery[0] ? (
              <img src={project.gallery[0]} alt="Before Redesign" className={styles.comparisonImg} />
            ) : (
              <div className={styles.noImgPlaceholder}>No Before Image</div>
            )}
            <span className={styles.beforeBadge}>BEFORE</span>
          </div>
          <div className={styles.comparisonBox}>
            {project.gallery && project.gallery[1] ? (
              <img src={project.gallery[1]} alt="After Redesign" className={styles.comparisonImg} />
            ) : (
              <div className={styles.noImgPlaceholder}>No After Image</div>
            )}
            <span className={styles.afterBadge}>AFTER</span>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <>
      <SEOMeta
        title="Projects Portfolio · Hussain Lone"
        description="Explore Hussain Lone's software development portfolio, highlighting AI workflow integrations, WordPress themes, and search engine optimization case studies."
        canonical="/projects"
        schema={[websiteSchema()]}
      />

      <div className={styles.projectsPage}>
        {/* Page Hero */}
        <section className={styles.heroSection}>
          <div className="container">
            <div className="text-center">
              <span className="section-label">Case Studies</span>
              <h1 className={styles.mainTitle}>
                Crafted <span>Digital Projects</span>
              </h1>
              <p className={styles.heroDesc}>
                A deep dive into problems solved, technologies used, and business results achieved. Use search and filters to browse modules.
              </p>
            </div>
          </div>
        </section>

        {/* Filter Controls Bar */}
        <section className={styles.controlsSection}>
          <div className="container">
            <div className={`glass-card ${styles.controlsBar}`}>
              {/* Search */}
              <div className={styles.searchBox}>
                <Search size={18} className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="Search projects by name or technology stack..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles.searchInput}
                />
              </div>

              {/* Sorting */}
              <div className={styles.sortBox}>
                <SlidersHorizontal size={16} />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className={styles.sortSelect}
                >
                  <option value="default">Featured Projects</option>
                  <option value="title">Alphabetical (A - Z)</option>
                </select>
              </div>
            </div>

            {/* Category tabs */}
            <div className={styles.tabsContainer}>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`${styles.tabBtn} ${activeTab === cat.id ? styles.activeTab : ''}`}
                  data-cursor="hover"
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="section">
          <div className="container">
            {sortedProjects.length === 0 ? (
              <div className={styles.noResults}>
                <h3>No projects found</h3>
                <p>Try refining your search keyword or switching the category tab filter.</p>
              </div>
            ) : (
              <div className={styles.gridWrapper}>
                <AnimatePresence mode="popLayout">
                  {activeTab === 'all' ? (
                    <motion.div
                      key="all-sections"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35 }}
                    >
                      {/* Web Development Section */}
                      {(() => {
                        const items = sortedProjects.filter(p => {
                          const cat = (p.category || '').toLowerCase()
                          return !['thumbnail design', 'transformation', 'before & after'].includes(cat)
                        })
                        if (items.length === 0) return null
                        return (
                          <div className={styles.sectionGroup}>
                            <div className={styles.sectionHeaderLine}>
                              <span className={styles.sectionGroupNum}>01</span>
                              <h2 className={styles.sectionGroupTitle}>Web Development & SEO</h2>
                            </div>
                            <div className={styles.projectsGrid}>
                              {items.map(project => renderCard(project))}
                            </div>
                          </div>
                        )
                      })()}

                      {/* Thumbnail Design Section */}
                      {(() => {
                        const items = sortedProjects.filter(p => p.category.toLowerCase() === 'thumbnail design')
                        if (items.length === 0) return null
                        return (
                          <div className={styles.sectionGroup} style={{ marginTop: '60px' }}>
                            <div className={styles.sectionHeaderLine}>
                              <span className={styles.sectionGroupNum}>02</span>
                              <h2 className={styles.sectionGroupTitle}>Thumbnail Client Work</h2>
                            </div>
                            <div className={styles.projectsGrid}>
                              {items.map(project => renderCard(project))}
                            </div>
                          </div>
                        )
                      })()}

                      {/* Transformation: Before & After Section */}
                      {(() => {
                        const items = sortedProjects.filter(p => ['before & after', 'transformation'].includes(p.category.toLowerCase()))
                        if (items.length === 0) return null
                        return (
                          <div className={styles.sectionGroup} style={{ marginTop: '60px' }}>
                            <div className={styles.sectionHeaderLine}>
                              <span className={styles.sectionGroupNum}>03</span>
                              <h2 className={styles.sectionGroupTitle}>Transformation: Before & After</h2>
                            </div>
                            <div className={styles.transformationsList}>
                              {items.map(project => renderTransformationCard(project))}
                            </div>
                          </div>
                        )
                      })()}
                    </motion.div>
                  ) : (
                    /* Specific Category Tab View */
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      className={['before & after', 'transformation'].includes(activeTab) || activeTab === 'transformation' ? styles.transformationsList : styles.projectsGrid}
                    >
                      {sortedProjects.map(project => 
                        ['before & after', 'transformation'].includes(project.category.toLowerCase())
                          ? renderTransformationCard(project)
                          : renderCard(project)
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </section>

        {/* Start Project Banner */}
        <section className="section" style={{ background: 'var(--clr-bg-secondary)' }}>
          <div className="container">
            <div className={styles.collabBox}>
              <h2>Have a custom software requirement?</h2>
              <p>Let's architect a solid application that handles your traffic, database structures, or AI integrations flawlessly.</p>
              <Link to="/contact" className="btn btn-primary btn-lg mt-sm" data-cursor="hover">
                Discuss Your Idea <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}