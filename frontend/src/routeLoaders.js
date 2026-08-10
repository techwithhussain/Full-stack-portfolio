// Shared route -> dynamic-import map for the prerendered public routes.
// App.jsx uses these for its lazy() route components; main.jsx awaits the
// current route's entry before calling hydrateRoot so React's lazy() finds
// an already-resolved module instead of racing hydration's first synchronous
// render pass against an in-flight import.
export const ROUTE_LOADERS = {
  '/': () => import('@/pages/HomePage'),
  '/blog/best-web-developer-in-jammu-and-kashmir': () => import('@/pages/blog/BestWebDeveloperJammuKashmirPost'),
  '/about': () => import('@/pages/AboutPage'),
  '/services': () => import('@/pages/ServicesPage'),
  '/skills': () => import('@/pages/HomePage'),
  '/projects': () => import('@/pages/ProjectsPage'),
  '/blog': () => import('@/pages/BlogPage'),
  '/testimonials': () => import('@/pages/TestimonialsPage'),
  '/experience': () => import('@/pages/ExperiencePage'),
  '/resume': () => import('@/pages/ResumePage'),
  '/contact': () => import('@/pages/ContactPage'),
  '/privacy-policy': () => import('@/pages/PrivacyPolicyPage'),
  '/terms': () => import('@/pages/TermsPage'),
  '/sitemap': () => import('@/pages/SitemapPage'),
}
