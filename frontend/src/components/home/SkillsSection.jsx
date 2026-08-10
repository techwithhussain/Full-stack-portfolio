import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SKILLS } from '@/data/constants'
import styles from './SkillsSection.module.css'

const CATEGORIES = [
  { id: 'ai',      label: 'AI & Automation' },
  { id: 'web',     label: 'Web Development' },
  { id: 'seo',     label: 'SEO Services' },
  { id: 'content', label: 'Content Strategy' },
]

export default function SkillsSection() {
  const [activeTab, setActiveTab] = useState('ai')

  const getProficiencyText = (level) => {
    if (level >= 92) return 'Expert'
    if (level >= 85) return 'Advanced'
    return 'Intermediate'
  }

  const getCategoryThemeClass = (cat) => {
    switch (cat) {
      case 'ai': return styles.themePrimary
      case 'web': return styles.themeSecondary
      case 'seo': return styles.themePurple
      case 'content': return styles.themePrimary
      default: return styles.themePrimary
    }
  }

  return (
    <section className="section" id="skills">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-md">
          <span className="section-label">Skills & Stack</span>
          <h2 className="section-title">
            My Professional <span>Expertise</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            A curated list of frameworks, tools, and platforms that I leverage daily to create high-performing digital platforms and automated workflows.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className={styles.tabContainer}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`${styles.tabBtn} ${activeTab === cat.id ? styles.activeTab : ''}`}
              data-cursor="hover"
            >
              {cat.label}
              {activeTab === cat.id && (
                <motion.div
                  layoutId="activeTabUnderline"
                  className={styles.tabUnderline}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className={styles.gridWrapper}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className={styles.skillsGrid}
            >
              {SKILLS[activeTab].map((skill, idx) => {
                const proficiency = getProficiencyText(skill.level)
                const themeClass = getCategoryThemeClass(activeTab)

                return (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className={`glass-card ${styles.skillCard} ${themeClass}`}
                    data-cursor="hover"
                  >
                    <div className={styles.skillHeader}>
                      <div className={styles.logoAndName}>
                        <span className={styles.skillEmoji}>{skill.logo}</span>
                        <h4 className={styles.skillName}>{skill.name}</h4>
                      </div>
                      <span className={styles.proficiencyLabel}>
                        {proficiency}
                      </span>
                    </div>

                    {/* Progress Track */}
                    <div className={styles.progressContainer}>
                      <div className={styles.progressInfo}>
                        <span>Proficiency</span>
                        <span className={styles.percentageText}>{skill.level}%</span>
                      </div>
                      <div className={styles.track}>
                        <motion.div
                          className={styles.fill}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.1 }}
                        />
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
