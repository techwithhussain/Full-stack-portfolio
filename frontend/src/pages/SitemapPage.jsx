import { Link } from 'react-router-dom'
import {
  Compass,
  Globe,
  Layers,
  FolderGit2,
  BookOpen,
  UserCheck,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react'
import SEOMeta from '@/components/common/SEOMeta'
import { webPageSchema, breadcrumbSchema } from '@/utils/schema'
import styles from './SitemapPage.module.css'

const SITEMAP_SECTIONS = [
  {
    title: 'Main Pages',
    color: 'var(--clr-primary)',
    bgGlow: 'rgba(0, 255, 157, 0.08)',
    icon: Globe,
    links: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about/' },
      { label: 'Contact', href: '/contact/' },
      { label: 'Resume', href: '/resume/' },
    ],
  },
  {
    title: 'Services',
    color: 'var(--clr-secondary)',
    bgGlow: 'rgba(74, 144, 226, 0.08)',
    icon: Layers,
    links: [
      { label: 'All Services', href: '/services/' },
      { label: 'Web Development', href: '/services/web-development/' },
      { label: 'SEO Services', href: '/services/seo-services/' },
      { label: 'Application Development', href: '/services/application-development/' },
      { label: 'Meta Ads', href: '/services/meta-ads/' },
      { label: 'Google Ads', href: '/services/google-ads/' },
      { label: 'Social Media Marketing', href: '/services/social-media-marketing/' },
    ],
  },
  {
    title: 'Portfolio',
    color: 'var(--clr-purple)',
    bgGlow: 'rgba(123, 97, 255, 0.08)',
    icon: FolderGit2,
    links: [
      { label: 'All Projects', href: '/projects/' },
      { label: 'WalnutWala — E-Commerce Store', href: '/projects/walnutwala/' },
      { label: 'Guru Digital Advertising', href: '/projects/guru-digital-advertising/' },
      { label: 'Gurukul Vidya Peeth Portal', href: '/projects/gurukul-vidya-peeth/' },
    ],
  },
  {
    title: 'Blog & Resources',
    color: 'var(--clr-primary)',
    bgGlow: 'rgba(0, 255, 157, 0.08)',
    icon: BookOpen,
    links: [
      { label: 'All Articles', href: '/blog/' },
      { label: 'Digital Marketing Services in Kashmir', href: '/blog/digital-marketing-services-in-kashmir/' },
      { label: 'SEO Expert in Jammu and Kashmir', href: '/blog/seo-expert-in-jammu-and-kashmir/' },
      { label: 'How to Choose Best Web Dev Company in Kashmir', href: '/blog/how-to-choose-the-best-website-development-company-in-kashmir/' },
      { label: 'Best Web Developer in Jammu and Kashmir', href: '/blog/best-web-developer-in-jammu-and-kashmir/' },
      { label: 'Best Web Developer in Srinagar — TechWithHussain', href: '/blog/web-developer-srinagar-techwithhussain/' },
    ],
  },
  {
    title: 'Professional',
    color: 'var(--clr-secondary)',
    bgGlow: 'rgba(74, 144, 226, 0.08)',
    icon: UserCheck,
    links: [
      { label: 'Experience & Career Timeline', href: '/experience/' },
      { label: 'Client Testimonials & Reviews', href: '/testimonials/' },
    ],
  },
  {
    title: 'Legal & Site Info',
    color: 'var(--clr-purple)',
    bgGlow: 'rgba(123, 97, 255, 0.08)',
    icon: ShieldCheck,
    links: [
      { label: 'Privacy Policy', href: '/privacy-policy/' },
      { label: 'Terms & Conditions', href: '/terms/' },
      { label: 'HTML Sitemap', href: '/sitemap/' },
    ],
  },
]

export default function SitemapPage() {
  const totalSections = SITEMAP_SECTIONS.length
  const totalPages = SITEMAP_SECTIONS.reduce((acc, curr) => acc + curr.links.length, 0)

  return (
    <>
      <SEOMeta
        title="Sitemap · Tech With Hussain"
        description="Complete visual sitemap listing all public pages, services, case studies, and guides of Tech With Hussain."
        canonical="/sitemap/"
        schema={[
          webPageSchema({
            title: 'Sitemap · Tech With Hussain',
            description: 'Complete visual sitemap listing all public pages of Tech With Hussain.',
            path: '/sitemap/',
          }),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Sitemap', path: '/sitemap/' },
          ]),
        ]}
      />

      <div className={styles.sitemapPage}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className="container">
            <span className="section-label">Navigation Map</span>
            <h1 className={styles.mainTitle}>
              Complete <span>Sitemap</span>
            </h1>
            <p className={styles.heroDesc}>
              Explore all pages, services, portfolio case studies, and engineering resources organized by section.
            </p>

            <div className={styles.statsRow}>
              <div className={styles.statItem}>
                <span className={styles.statDot} />
                <span>Sections: <strong className={styles.statValue}>{totalSections}</strong></span>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.statItem}>
                <Compass size={13} style={{ color: 'var(--clr-primary)' }} />
                <span>Indexed Pages: <strong className={styles.statValue}>{totalPages}</strong></span>
              </div>
            </div>
          </div>
        </section>

        {/* Sitemap Grid */}
        <section className={styles.contentSection}>
          <div className="container">
            <div className={styles.sitemapGrid}>
              {SITEMAP_SECTIONS.map((section, idx) => {
                const IconComponent = section.icon
                return (
                  <div
                    key={idx}
                    className={`glass-card ${styles.sitemapCard}`}
                  >
                    {/* Top glowing accent line */}
                    <div
                      className={styles.topAccent}
                      style={{
                        background: section.color,
                        boxShadow: `0 0 14px ${section.color}`,
                      }}
                    />

                    {/* Card Header */}
                    <div className={styles.cardHeader}>
                      <div className={styles.headerLeft}>
                        <div
                          className={styles.iconWrapper}
                          style={{
                            background: section.bgGlow,
                            color: section.color,
                            border: `1px solid ${section.color}33`,
                          }}
                        >
                          <IconComponent size={18} />
                        </div>
                        <h2 className={styles.cardTitle} style={{ color: section.color }}>
                          {section.title}
                        </h2>
                      </div>
                      <span className={styles.countBadge}>
                        {section.links.length} {section.links.length === 1 ? 'page' : 'pages'}
                      </span>
                    </div>

                    {/* Links List */}
                    <ul className={styles.linkList}>
                      {section.links.map((link, li) => (
                        <li key={li} className={styles.linkItem}>
                          <Link
                            to={link.href}
                            className={styles.linkAnchor}
                            data-cursor="hover"
                          >
                            <ArrowRight
                              size={14}
                              className={styles.linkArrow}
                              style={{ color: section.color }}
                            />
                            <span>{link.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}