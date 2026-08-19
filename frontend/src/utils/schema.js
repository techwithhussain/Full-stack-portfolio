import { SITE, SOCIAL } from '@/data/constants'

/**
 * Unified JSON-LD Schema.org Architecture for Tech With Hussain
 * Base Entity IDs (Stable URLs matching canonical structure):
 * - Website:  https://techwithhussain.online/#website
 * - Person:   https://techwithhussain.online/#person
 * - Business: https://techwithhussain.online/#business
 */

export const ENTITY_IDS = {
  website: `${SITE.url}/#website`,
  person: `${SITE.url}/#person`,
  business: `${SITE.url}/#business`,
}

/**
 * Reusable Factual Person Entity
 */
export const getPersonEntity = () => ({
  '@type': 'Person',
  '@id': ENTITY_IDS.person,
  name: 'Hussain Lone',
  url: SITE.url,
  email: SITE.email,
  telephone: SITE.phone,
  jobTitle: 'Web Developer & SEO Expert',
  description: 'Hussain Lone is a Web Developer, SEO Expert, and Digital Marketing Specialist in Srinagar, Jammu & Kashmir (J&K).',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Srinagar',
    addressRegion: 'Jammu & Kashmir',
    postalCode: '190001',
    addressCountry: 'IN',
  },
  sameAs: Object.values(SOCIAL),
  knowsAbout: [
    'Web Development', 'SEO', 'Digital Marketing', 'Meta Ads',
    'WordPress', 'React', 'PHP', 'Local SEO', 'Keyword Research',
    'AI Development', 'Content Creation', 'Automation',
  ],
})

/**
 * Reusable Factual Business Entity (Merged LocalBusiness + ProfessionalService)
 */
export const getBusinessEntity = () => ({
  '@type': ['LocalBusiness', 'ProfessionalService'],
  '@id': ENTITY_IDS.business,
  name: 'Tech With Hussain',
  alternateName: ['Hussain Lone Web Developer J&K', 'Tech With Hussain SEO Kashmir'],
  description: 'Best web developer and SEO expert in Srinagar, J&K. Expert in web development, SEO, Meta Ads, WordPress and AI automation serving Jammu & Kashmir and worldwide.',
  url: SITE.url,
  telephone: SITE.phone,
  email: SITE.email,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE.url}/favicon.png`,
    width: 512,
    height: 512,
  },
  image: `${SITE.url}/og-default.png`,
  founder: { '@id': ENTITY_IDS.person },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Srinagar',
    addressLocality: 'Srinagar',
    addressRegion: 'Jammu & Kashmir',
    postalCode: '190001',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '34.0837',
    longitude: '74.7973',
  },
  priceRange: '$$',
  currenciesAccepted: 'INR',
  paymentAccepted: 'Cash, Bank Transfer, UPI',
  areaServed: [
    { '@type': 'City', name: 'Srinagar' },
    { '@type': 'City', name: 'Jammu' },
    { '@type': 'AdministrativeArea', name: 'Jammu & Kashmir' },
    { '@type': 'Country', name: 'India' },
  ],
  sameAs: Object.values(SOCIAL),
})

/**
 * Reusable WebSite Entity with SearchAction
 */
export const getWebSiteEntity = () => ({
  '@type': 'WebSite',
  '@id': ENTITY_IDS.website,
  name: SITE.name,
  url: SITE.url,
  description: 'Best web developer in J&K, Srinagar Kashmir — web development, SEO, Meta Ads & digital marketing services',
  publisher: { '@id': ENTITY_IDS.business },
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: `${SITE.url}/projects?q={search_term_string}` },
    'query-input': 'required name=search_term_string',
  },
})

/**
 * Breadcrumb Schema Generator
 */
export const breadcrumbSchema = (crumbs = []) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: crumbs.map((crumb, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: crumb.name,
    item: crumb.path.startsWith('http') ? crumb.path : `${SITE.url}${crumb.path.startsWith('/') ? crumb.path : '/' + crumb.path}`,
  })),
})

/**
 * Homepage Schema (@graph containing WebSite, Person, Business)
 */
export const homePageSchema = () => ({
  '@context': 'https://schema.org',
  '@graph': [
    getWebSiteEntity(),
    getPersonEntity(),
    getBusinessEntity(),
  ],
})

/**
 * About Page Schema
 */
export const aboutPageSchema = () => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'AboutPage',
      '@id': `${SITE.url}/about#webpage`,
      url: `${SITE.url}/about`,
      name: 'About Hussain Lone, Web Developer',
      description: 'Meet Hussain Lone, a web developer in Srinagar, J&K. Expert in web development, SEO, Meta Ads & digital marketing.',
      isPartOf: { '@id': ENTITY_IDS.website },
      mainEntity: { '@id': ENTITY_IDS.person },
    },
    getPersonEntity(),
  ],
})

/**
 * Services Collection Page Schema
 */
export const servicesPageSchema = (services = []) => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': `${SITE.url}/services/#webpage`,
      url: `${SITE.url}/services/`,
      name: 'Web Dev & SEO Services in Kashmir, J&K',
      description: 'Web development, SEO, Meta Ads & digital marketing services in Srinagar, J&K from Hussain Lone.',
      isPartOf: { '@id': ENTITY_IDS.website },
    },
    ...(services.length > 0
      ? [
          {
            '@type': 'ItemList',
            itemListElement: services.map((s, idx) => ({
              '@type': 'ListItem',
              position: idx + 1,
              name: s.title || s.name,
              url: s.slug ? `${SITE.url}/services/${s.slug}/` : `${SITE.url}/services/`,
              description: s.description || s.short_desc || '',
            })),
          },
        ]
      : []),
  ],
})

/**
 * Individual Service Page Schema
 */
export const servicePageSchema = (service) => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': `${SITE.url}/services/${service.slug}/#service`,
      name: service.title,
      description: service.description || service.short_desc || '',
      url: `${SITE.url}/services/${service.slug}/`,
      serviceType: service.title,
      provider: { '@id': ENTITY_IDS.business },
      areaServed: [
        { '@type': 'City', name: 'Srinagar' },
        { '@type': 'AdministrativeArea', name: 'Jammu & Kashmir' },
        { '@type': 'Country', name: 'India' },
      ],
    },
  ],
})

/**
 * Projects Collection Page Schema
 */
export const projectsPageSchema = (projects = []) => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': `${SITE.url}/projects/#webpage`,
      url: `${SITE.url}/projects/`,
      name: 'Projects Portfolio · Hussain Lone',
      description: 'Explore web development, WordPress e-commerce, and SEO project case studies.',
      isPartOf: { '@id': ENTITY_IDS.website },
    },
    ...(projects.length > 0
      ? [
          {
            '@type': 'ItemList',
            itemListElement: projects.map((p, idx) => ({
              '@type': 'ListItem',
              position: idx + 1,
              item: {
                '@type': p.category === 'WordPress' ? 'WebSite' : 'CreativeWork',
                name: p.title,
                url: p.liveUrl || `${SITE.url}/projects/`,
                description: p.desc || p.excerpt || '',
              },
            })),
          },
        ]
      : []),
  ],
})

/**
 * Blog Listing Schema
 */
export const blogPageSchema = (posts = []) => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Blog',
      '@id': `${SITE.url}/blog/#blog`,
      url: `${SITE.url}/blog/`,
      name: 'Blog · Tech Insights Coming Soon',
      description: 'Articles on web development, SEO strategies, Meta Ads, and digital growth in Kashmir.',
      isPartOf: { '@id': ENTITY_IDS.website },
      publisher: { '@id': ENTITY_IDS.business },
    },
    ...(posts.length > 0
      ? [
          {
            '@type': 'ItemList',
            itemListElement: posts.map((post, idx) => ({
              '@type': 'ListItem',
              position: idx + 1,
              url: `${SITE.url}/blog/${post.slug}/`,
              name: post.title,
            })),
          },
        ]
      : []),
  ],
})

/**
 * Individual Blog Posting Schema
 */
export const blogPostSchema = (post) => {
  const thumbUrl = post.thumbnail
    ? (post.thumbnail.startsWith('http') ? post.thumbnail : `${SITE.url}${post.thumbnail.startsWith('/') ? post.thumbnail : '/' + post.thumbnail}`)
    : `${SITE.url}/og-default.png`

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${SITE.url}/blog/${post.slug}/#post`,
        headline: post.title,
        description: post.excerpt || post.description || '',
        image: thumbUrl,
        author: { '@id': ENTITY_IDS.person },
        publisher: { '@id': ENTITY_IDS.business },
        datePublished: post.datePublished || post.published_at || '2026-08-04',
        ...(post.dateModified || post.updated_at ? { dateModified: post.dateModified || post.updated_at } : {}),
        url: `${SITE.url}/blog/${post.slug}/`,
        mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE.url}/blog/${post.slug}/` },
      },
    ],
  }
}

/**
 * Contact Page Schema
 */
export const contactPageSchema = () => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ContactPage',
      '@id': `${SITE.url}/contact/#webpage`,
      url: `${SITE.url}/contact/`,
      name: 'Contact Me · Tech With Hussain',
      description: 'Get in touch with Hussain Lone for custom web development, SEO audits, or digital marketing in Srinagar, J&K.',
      isPartOf: { '@id': ENTITY_IDS.website },
      mainEntity: { '@id': ENTITY_IDS.business },
    },
  ],
})

/**
 * General WebPage Schema (Legal & Utility Pages)
 */
export const webPageSchema = ({ title, description, path }) => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${SITE.url}${path}#webpage`,
      url: `${SITE.url}${path}`,
      name: title,
      description: description,
      isPartOf: { '@id': ENTITY_IDS.website },
    },
  ],
})

/**
 * FAQ Schema (Only rendered when FAQ questions are visible on page)
 */
export const faqSchema = (faqs = []) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question || faq.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer || faq.a,
    },
  })),
})

// Backwards-compatible aliases
export const personSchema = () => getPersonEntity()
export const websiteSchema = () => getWebSiteEntity()
export const localBusinessSchema = () => getBusinessEntity()
export const professionalServiceSchema = () => getBusinessEntity()
export const aggregateRatingSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'AggregateRating',
  itemReviewed: { '@id': ENTITY_IDS.business },
  ratingValue: '5.0',
  reviewCount: '30',
  bestRating: '5',
  worstRating: '1',
})

