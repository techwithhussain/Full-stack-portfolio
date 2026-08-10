import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, ArrowLeft } from 'lucide-react'
import SEOMeta from '@/components/common/SEOMeta'
import styles from './NotFoundPage.module.css'

export default function NotFoundPage() {
  return (
    <>
      <SEOMeta title="404 — Page Not Found" noIndex />
      <section className={styles.page}>
        <div className={styles.orb1} />
        <div className={styles.orb2} />
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className={styles.code}
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            4<span>0</span>4
          </motion.div>
          <h1 className={styles.title}>Page Not Found</h1>
          <p className={styles.desc}>
            The page you're looking for doesn't exist or has been moved.
            Let's get you back on track.
          </p>
          <div className={styles.actions}>
            <Link to="/" className="btn btn-primary btn-lg">
              <Home size={18} /> Go Home
            </Link>
            <button onClick={() => window.history.back()} className="btn btn-ghost btn-lg">
              <ArrowLeft size={18} /> Go Back
            </button>
          </div>
        </motion.div>
      </section>
    </>
  )
}
