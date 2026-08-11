import { useState, useEffect, Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { AnimatePresence, motion } from 'framer-motion'
import axios from 'axios'

import Navbar from '@/components/common/Navbar'
import Footer from '@/components/common/Footer'
import LoadingScreen from '@/components/common/LoadingScreen'
import FloatingWhatsApp from '@/components/common/FloatingWhatsApp'
import BackToTop from '@/components/common/BackToTop'
import ResumeDownloadModal from '@/components/common/ResumeDownloadModal'
import ScrollToTop from '@/components/common/ScrollToTop'
import styles from './App.module.css'
import { ROUTE_LOADERS } from './routeLoaders.js'

const isPrerenderedLoad = typeof document !== 'undefined'
  && (!!document.getElementById('root')?.hasChildNodes() || window.__FORCE_STATIC_RENDER__ === true)

// ── Lazy-loaded public pages ──────────────────────────────────
const HomePage = lazy(ROUTE_LOADERS['/'])
const AboutPage = lazy(ROUTE_LOADERS['/about'])
const ServicesPage = lazy(ROUTE_LOADERS['/services'])
const ServiceDetailPage = lazy(() => import('@/pages/ServiceDetailPage'))
const ProjectsPage = lazy(ROUTE_LOADERS['/projects'])
const ProjectDetailPage = lazy(() => import('@/pages/ProjectDetailPage'))
const BlogPage = lazy(ROUTE_LOADERS['/blog'])
const BlogPostPage = lazy(() => import('@/pages/BlogPostPage'))
const BestWebDeveloperJammuKashmirPost = lazy(ROUTE_LOADERS['/blog/best-web-developer-in-jammu-and-kashmir'])
const ChooseBestWebDevCompanyPost = lazy(ROUTE_LOADERS['/blog/how-to-choose-the-best-website-development-company-in-kashmir'])
const TestimonialsPage = lazy(ROUTE_LOADERS['/testimonials'])
const ExperiencePage = lazy(ROUTE_LOADERS['/experience'])
const ResumePage = lazy(ROUTE_LOADERS['/resume'])
const ContactPage = lazy(ROUTE_LOADERS['/contact'])
const PrivacyPage = lazy(ROUTE_LOADERS['/privacy-policy'])
const TermsPage = lazy(ROUTE_LOADERS['/terms'])
const SitemapPage = lazy(ROUTE_LOADERS['/sitemap'])
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))

// ── Page transition wrapper ───────────────────────────────────
const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] } },
}

function PageWrapper({ children }) {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait" initial={!isPrerenderedLoad}>
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <Navbar />
        <main id="main-content" tabIndex="-1">
          <Suspense fallback={<PageFallback />}>
            {children}
          </Suspense>
        </main>
        <Footer />
        <FloatingWhatsApp />
        <BackToTop />
      </motion.div>
    </AnimatePresence>
  )
}

function PageFallback() {
  return (
    <div className={styles.pageFallback}>
      <div className={styles.pageFallbackSpinner} />
    </div>
  )
}

// ── Root App ──────────────────────────────────────────────────
export default function App() {
  const [loading, setLoading] = useState(!isPrerenderedLoad)
  const [isResumeOpen, setIsResumeOpen] = useState(false)

  // Global click interceptor for resume downloads
  useEffect(() => {
    const handleGlobalClick = (e) => {
      const anchor = e.target.closest('a')
      if (
        anchor &&
        anchor.getAttribute('href')?.includes('resume') &&
        anchor.hasAttribute('download') &&
        !anchor.hasAttribute('data-no-intercept')
      ) {
        e.preventDefault()
        setIsResumeOpen(true)
      }
    }
    document.addEventListener('click', handleGlobalClick)
    return () => document.removeEventListener('click', handleGlobalClick)
  }, [])

  // Sync theme and color scheme site-wide dynamically
  useEffect(() => {
    const savedTheme = localStorage.getItem('site_theme') || 'emerald'
    const savedMode = localStorage.getItem('site_mode') || 'dark'
    document.documentElement.setAttribute('data-theme', savedTheme)
    document.documentElement.setAttribute('data-mode', savedMode)

    axios.get('/api/settings.php')
      .then(res => {
        if (res.data.success && res.data.data.site_theme) {
          const activeTheme = res.data.data.site_theme
          localStorage.setItem('site_theme', activeTheme)
          document.documentElement.setAttribute('data-theme', activeTheme)
        }
      })
      .catch(() => {})

    const handleThemeChange = () => {
      const updatedTheme = localStorage.getItem('site_theme') || 'emerald'
      document.documentElement.setAttribute('data-theme', updatedTheme)
    }

    const handleModeChange = () => {
      const updatedMode = localStorage.getItem('site_mode') || 'dark'
      document.documentElement.setAttribute('data-mode', updatedMode)
    }

    window.addEventListener('theme-settings-changed', handleThemeChange)
    window.addEventListener('color-scheme-changed', handleModeChange)
    return () => {
      window.removeEventListener('theme-settings-changed', handleThemeChange)
      window.removeEventListener('color-scheme-changed', handleModeChange)
    }
  }, [])

  useEffect(() => {
    if (isPrerenderedLoad) return
    const timer = setTimeout(() => setLoading(false), 400)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (loading) return
    const raf = requestAnimationFrame(() => {
      window.__APP_READY__ = true
    })
    return () => cancelAnimationFrame(raf)
  }, [loading])

  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <LoadingScreen isLoading={loading} />
        <ResumeDownloadModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />

        {!loading && (
          <Routes>
            {/* ── Public Pages ── */}
            <Route path="/" element={<PageWrapper><HomePage /></PageWrapper>} />
            <Route path="/about" element={<PageWrapper><AboutPage /></PageWrapper>} />
            <Route path="/services" element={<PageWrapper><ServicesPage /></PageWrapper>} />
            <Route path="/skills" element={<PageWrapper><HomePage canonical="/skills" /></PageWrapper>} />
            <Route path="/services/:slug" element={<PageWrapper><ServiceDetailPage /></PageWrapper>} />
            <Route path="/projects" element={<PageWrapper><ProjectsPage /></PageWrapper>} />
            <Route path="/projects/:slug" element={<PageWrapper><ProjectDetailPage /></PageWrapper>} />
            <Route path="/blog" element={<PageWrapper><BlogPage /></PageWrapper>} />
            <Route path="/blog/best-web-developer-in-jammu-and-kashmir" element={<PageWrapper><BestWebDeveloperJammuKashmirPost /></PageWrapper>} />
            <Route path="/blog/how-to-choose-the-best-website-development-company-in-kashmir" element={<PageWrapper><ChooseBestWebDevCompanyPost /></PageWrapper>} />
            <Route path="/blog/:slug" element={<PageWrapper><BlogPostPage /></PageWrapper>} />
            <Route path="/testimonials" element={<PageWrapper><TestimonialsPage /></PageWrapper>} />
            <Route path="/experience" element={<PageWrapper><ExperiencePage /></PageWrapper>} />
            <Route path="/resume" element={<PageWrapper><ResumePage /></PageWrapper>} />
            <Route path="/contact" element={<PageWrapper><ContactPage /></PageWrapper>} />
            <Route path="/privacy-policy" element={<PageWrapper><PrivacyPage /></PageWrapper>} />
            <Route path="/terms" element={<PageWrapper><TermsPage /></PageWrapper>} />
            <Route path="/sitemap" element={<PageWrapper><SitemapPage /></PageWrapper>} />

            {/* 404 */}
            <Route path="*" element={<PageWrapper><NotFoundPage /></PageWrapper>} />
          </Routes>
        )}
      </BrowserRouter>
    </HelmetProvider>
  )
}

