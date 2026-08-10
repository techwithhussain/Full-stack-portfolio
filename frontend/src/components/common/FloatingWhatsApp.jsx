import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { SITE } from '@/data/constants'
import styles from './FloatingWhatsApp.module.css'

export default function FloatingWhatsApp() {
  return (
    <motion.a
      href={SITE.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.fab}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: 'spring', stiffness: 300, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Chat on WhatsApp"
      data-cursor="hover"
    >
      <span className={styles.pulse} />
      <MessageCircle size={26} fill="white" stroke="none" />
      <span className={styles.tooltip}>Chat on WhatsApp</span>
    </motion.a>
  )
}
