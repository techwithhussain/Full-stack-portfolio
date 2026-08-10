import { motion, AnimatePresence } from 'framer-motion'
import Logo from './Logo'
import styles from './LoadingScreen.module.css'

export default function LoadingScreen({ isLoading }) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className={styles.screen}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
          aria-hidden="true"
        >
          {/* Animated logo mark and brand name */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            style={{ zIndex: 10 }}
          >
            <Logo mode="stacked" />
          </motion.div>

          {/* Spinner ring */}
          <motion.div
            className={styles.ring}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          />

          {/* Background orbs */}
          <div className={styles.orb1} />
          <div className={styles.orb2} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
