import { SITE, SOCIAL } from '@/data/constants'

/**
 * Generate JSON-LD schema markup for different page types
 */

export const personSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Hussain Lone',
  url: SITE.url,
  email: SITE.email,
  telephone: SITE.phone,
  jobTitle: 'Web Developer, SEO Expert, Digital Marketing Specialist',
  description: 'Hussain Lone is the best web developer in Srinagar, Jammu & Kashmir (J&K). Expert in web development, SEO, Meta Ads, and digital marketing.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Srinagar',
    addressRegion: 'Jammu & Kashmir',
    addressCountry: 'IN',
  },
  areaServed: [
    { '@type': 'City', name: 'Srinagar' },
    { '@type': 'State', name: 'Jammu & Kashmir' },
    { '@type': 'Country', name: 'India' },
  ],
  sameAs: Object.values(SOCIAL),
  knowsAbout: [
    'Web Development', 'SEO', 'Digital Marketing', 'Meta Ads',
    'WordPress', 'React', 'PHP', 'Local SEO', 'Keyword Research',
    'AI Development', 'Content Creation', 'OpenAI', 'Automation',
  ],
})

export const websiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE.name,
  url: SITE.url,
  description: 'Best web developer in J&K, Srinagar Kashmir — web development, SEO, Meta Ads & digital marketing services',
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: `${SITE.url}/projects?q={search_term_string}` },
    'query-input': 'required name=search_term_string',
  },
})

export const localBusinessSchema = () => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['LocalBusiness', 'ProfessionalService'],
      '@id': `${SITE.url}/#business`,
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
      founder: {
        '@type': 'Person',
        '@id': `${SITE.url}/#hussain`,
        name: 'Hussain Lone',
        jobTitle: 'Web Developer & SEO Expert',
        url: SITE.url,
      },
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
      hasMap: 'https://maps.google.com/?q=Srinagar+Jammu+Kashmir+India',
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '09:00',
          closes: '20:00',
        },
      ],
      priceRange: '$$',
      currenciesAccepted: 'INR',
      paymentAccepted: 'Cash, Bank Transfer, UPI',
      areaServed: [
        { '@type': 'City', name: 'Srinagar' },
        { '@type': 'City', name: 'Jammu' },
        { '@type': 'AdministrativeArea', name: 'Jammu & Kashmir' },
        { '@type': 'Country', name: 'India' },
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Digital Services',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Web Development' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'SEO Services' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Meta Ads Management' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'WordPress Development' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI Automation' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Digital Marketing' } },
        ],
      },
      sameAs: Object.values(SOCIAL),
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '5.0',
        reviewCount: '30',
        bestRating: '5',
        worstRating: '1',
      },
    },
  ],
})

export const professionalServiceSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: SITE.name,
  url: SITE.url,
  telephone: SITE.phone,
  email: SITE.email,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Srinagar',
    addressRegion: 'Jammu & Kashmir',
    addressCountry: 'IN',
  },
  areaServed: [
    { '@type': 'City', name: 'Srinagar' },
    { '@type': 'State', name: 'Jammu & Kashmir' },
    { '@type': 'Country', name: 'India' },
  ],
  sameAs: Object.values(SOCIAL),
  serviceType: [
    'Web Development',
    'SEO Services',
    'Digital Marketing',
    'Meta Ads Management',
    'WordPress Development',
    'Website Design Srinagar',
    'Freelance Web Developer Kashmir',
  ],
})

export const breadcrumbSchema = (crumbs) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: crumbs.map((crumb, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: crumb.name,
    item: `${SITE.url}${crumb.path}`,
  })),
})

export const blogPostSchema = (post) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: post.title,
  description: post.excerpt,
  image: post.thumbnail ? `${SITE.url}${post.thumbnail}` : undefined,
  author: {
    '@type': 'Person',
    name: 'Hussain Lone',
    url: SITE.url,
  },
  publisher: {
    '@type': 'Organization',
    name: SITE.name,
    url: SITE.url,
  },
  datePublished: post.published_at,
  dateModified: post.updated_at || post.published_at,
  url: `${SITE.url}/blog/${post.slug}`,
  mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE.url}/blog/${post.slug}` },
})

export const faqSchema = (faqs) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
})

export const servicePageSchema = (service) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: service.title,
  description: service.description,
  provider: { '@type': 'Person', name: 'Hussain Lone', url: SITE.url },
  url: `${SITE.url}/services/${service.slug}`,
  serviceType: service.title,
  areaServed: [
    { '@type': 'City', name: 'Srinagar' },
    { '@type': 'State', name: 'Jammu & Kashmir' },
  ],
})

export const aggregateRatingSchema = (rating = 5.0, count = 30) => ({
  '@context': 'https://schema.org',
  '@type': 'AggregateRating',
  ratingValue: rating,
  reviewCount: count,
  bestRating: 5,
  worstRating: 1,
})
