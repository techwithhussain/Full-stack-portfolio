import { Link } from 'react-router-dom'
import SEOMeta from '@/components/common/SEOMeta'

const SITEMAP_SECTIONS = [
  {
    title: 'Main Pages',
    color: 'var(--clr-primary)',
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
    links: [
      { label: 'All Articles', href: '/blog/' },
      { label: 'Digital Marketing Services in Kashmir', href: '/blog/digital-marketing-services-in-kashmir/' },
      { label: 'SEO Expert in Jammu and Kashmir', href: '/blog/seo-expert-in-jammu-and-kashmir/' },
      { label: 'How to Choose the Best Website Development Company in Kashmir', href: '/blog/how-to-choose-the-best-website-development-company-in-kashmir/' },
      { label: 'Best Web Developer in Jammu and Kashmir', href: '/blog/best-web-developer-in-jammu-and-kashmir/' },
      { label: 'Best Web Developer in Srinagar — TechWithHussain', href: '/blog/web-developer-srinagar-techwithhussain/' },
    ],
  },
  {
    title: 'Professional',
    color: 'var(--clr-secondary)',
    links: [
      { label: 'Experience', href: '/experience/' },
      { label: 'Testimonials', href: '/testimonials/' },
    ],
  },
  {
    title: 'Legal',
    color: 'var(--clr-purple)',
    links: [
      { label: 'Privacy Policy', href: '/privacy-policy/' },
      { label: 'Terms of Service', href: '/terms/' },
      { label: 'Sitemap', href: '/sitemap/' },
    ],
  },
]

export default function SitemapPage() {
  return (
    <>
      <SEOMeta
        title="Sitemap · Tech With Hussain"
        description="Complete sitemap listing all pages of Tech With Hussain portfolio platform."
        canonical="/sitemap/"
        noindex={false}
      />

      <div style={{ paddingTop: '160px', paddingBottom: '80px' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: '48px' }}>
            <span className="section-label">Navigation Map</span>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, marginBottom: '16px' }}>
              Complete <span className="text-primary">Sitemap</span>
            </h1>
            <p style={{ color: 'var(--clr-text-muted)', fontSize: 'var(--text-lg)' }}>
              All pages of Tech With Hussain, organized by section.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {SITEMAP_SECTIONS.map((section, idx) => (
              <div
                key={idx}
                className="glass-card"
                style={{ padding: '28px', borderTop: `2px solid ${section.color}` }}
              >
                <h2 style={{ color: section.color, fontSize: 'var(--text-sm)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>
                  {section.title}
                </h2>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {section.links.map((link, li) => (
                    <li key={li}>
                      <Link
                        to={link.href}
                        style={{ color: 'var(--clr-text-muted)', fontSize: 'var(--text-sm)', transition: 'color 0.3s' }}
                        onMouseEnter={e => e.target.style.color = section.color}
                        onMouseLeave={e => e.target.style.color = 'var(--clr-text-muted)'}
                      >
                        → {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}