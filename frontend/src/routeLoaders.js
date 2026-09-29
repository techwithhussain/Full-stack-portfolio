// Shared route -> dynamic-import map for the prerendered public routes.
// App.jsx uses these for its lazy() route components; main.jsx awaits the
// current route's entry before calling hydrateRoot so React's lazy() finds
// an already-resolved module instead of racing hydration's first synchronous
// render pass against an in-flight import.
export const ROUTE_LOADERS = {
  '/': () => import('@/pages/HomePage'),
  '/blog/web-developer-in-kashmir': () => import('@/pages/blog/WebDeveloperInKashmirPost'),
  '/blog/best-web-developer-in-jammu-and-kashmir': () => import('@/pages/blog/BestWebDeveloperJammuKashmirPost'),
  '/blog/web-developer-srinagar-techwithhussain': () => import('@/pages/blog/TechWithHussainPost'),
  '/blog/digital-marketing-services-in-kashmir': () => import('@/pages/blog/DigitalMarketingServicesKashmirPost'),
  '/blog/how-to-choose-the-best-website-development-company-in-kashmir': () => import('@/pages/blog/ChooseBestWebDevCompanyPost'),
  '/blog/seo-expert-in-jammu-and-kashmir': () => import('@/pages/blog/SeoExpertJammuKashmirPost'),
  '/about': () => import('@/pages/AboutPage'),
  '/services': () => import('@/pages/ServicesPage'),
  '/services/web-development': () => import('@/pages/ServiceDetailPage'),
  '/services/seo-services': () => import('@/pages/ServiceDetailPage'),
  '/services/application-development': () => import('@/pages/ServiceDetailPage'),
  '/services/meta-ads': () => import('@/pages/ServiceDetailPage'),
  '/services/google-ads': () => import('@/pages/ServiceDetailPage'),
  '/services/social-media-marketing': () => import('@/pages/ServiceDetailPage'),
  '/projects': () => import('@/pages/ProjectsPage'),
  '/projects/walnutwala': () => import('@/pages/ProjectDetailPage'),
  '/projects/guru-digital-advertising': () => import('@/pages/ProjectDetailPage'),
  '/projects/gurukul-vidya-peeth': () => import('@/pages/ProjectDetailPage'),
  '/blog': () => import('@/pages/BlogPage'),
  '/testimonials': () => import('@/pages/TestimonialsPage'),
  '/experience': () => import('@/pages/ExperiencePage'),
  '/resume': () => import('@/pages/ResumePage'),
  '/contact': () => import('@/pages/ContactPage'),
  '/privacy-policy': () => import('@/pages/PrivacyPolicyPage'),
  '/terms': () => import('@/pages/TermsPage'),
  '/sitemap': () => import('@/pages/SitemapPage'),
}
