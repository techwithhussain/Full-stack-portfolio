import { useState } from 'react'
import { Share2, Copy, Check } from 'lucide-react'
import styles from './SocialShare.module.css'

export default function SocialShare({ title, url }) {
  const [copied, setCopied] = useState(false)

  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '')
  const shareTitle = title || 'Tech With Hussain Blog'

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      // Fallback
    }
  }

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          url: shareUrl,
        })
      } catch {
        // User cancelled or share failed
      }
    }
  }

  const encodedUrl = encodeURIComponent(shareUrl)
  const encodedTitle = encodeURIComponent(shareTitle)

  return (
    <div className={styles.shareContainer}>
      <div className={styles.shareHeader}>
        <Share2 size={18} className={styles.shareIcon} />
        <span className={styles.shareLabel}>Share this article:</span>
      </div>

      <div className={styles.shareButtons}>
        {/* WhatsApp */}
        <a
          href={`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.shareBtn} ${styles.whatsapp}`}
          title="Share on WhatsApp"
          data-cursor="hover"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.762.459 3.48 1.332 5.001L2 22l5.161-1.336a9.98 9.98 0 0 0 4.851 1.258h.004c5.507 0 9.99-4.478 9.99-9.984 0-2.667-1.037-5.176-2.922-7.062A9.925 9.925 0 0 0 12.012 2zm.004 18.257h-.003a8.318 8.318 0 0 1-4.241-1.166l-.304-.18-3.149.814.841-3.056-.198-.313a8.307 8.307 0 0 1-1.274-4.373c.001-4.588 3.733-8.32 8.321-8.32 2.223 0 4.312.866 5.88 2.436a8.27 8.27 0 0 1 2.433 5.884c-.001 4.588-3.733 8.32-8.312 8.32zm4.563-6.223c-.25-.125-1.481-.731-1.71-.814-.229-.083-.396-.125-.563.125-.167.25-.646.814-.792.98-.146.166-.292.187-.542.062-.25-.125-1.056-.389-2.012-1.242-.744-.664-1.247-1.484-1.393-1.734-.146-.25-.015-.385.11-.509.112-.112.25-.292.375-.438.125-.146.167-.25.25-.417.083-.166.042-.312-.021-.437-.062-.125-.563-1.354-.771-1.854-.203-.487-.41-.421-.563-.429-.146-.007-.313-.008-.479-.008a.922.922 0 0 0-.667.312c-.229.25-.875.854-.875 2.083 0 1.229.896 2.417 1.021 2.583.125.167 1.763 2.693 4.27 3.776.596.257 1.062.41 1.425.525.599.19 1.144.163 1.575.099.481-.072 1.481-.604 1.688-1.188.208-.583.208-1.083.146-1.188-.063-.104-.229-.166-.479-.291z"/>
          </svg>
          <span>WhatsApp</span>
        </a>

        {/* Twitter / X */}
        <a
          href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.shareBtn} ${styles.twitter}`}
          title="Share on X (Twitter)"
          data-cursor="hover"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          <span>X / Twitter</span>
        </a>

        {/* LinkedIn */}
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.shareBtn} ${styles.linkedin}`}
          title="Share on LinkedIn"
          data-cursor="hover"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
          </svg>
          <span>LinkedIn</span>
        </a>

        {/* Facebook */}
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.shareBtn} ${styles.facebook}`}
          title="Share on Facebook"
          data-cursor="hover"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H7.5v-3H10V9.5C10 7.01 11.49 5.6 13.73 5.6c1.07 0 2.19.19 2.19.19v2.41h-1.24c-1.23 0-1.62.77-1.62 1.56V12h2.77l-.44 3h-2.33v6.8c4.56-.93 8-4.96 8-9.8z"/>
          </svg>
          <span>Facebook</span>
        </a>

        {/* Copy Link */}
        <button
          onClick={handleCopyLink}
          className={`${styles.shareBtn} ${styles.copyBtn} ${copied ? styles.copied : ''}`}
          title="Copy Article Link"
          data-cursor="hover"
        >
          {copied ? <Check size={16} className="text-primary" /> : <Copy size={16} />}
          <span>{copied ? 'Copied!' : 'Copy Link'}</span>
        </button>

        {/* Native Share (if supported) */}
        {typeof navigator !== 'undefined' && 'share' in navigator && (
          <button
            onClick={handleNativeShare}
            className={`${styles.shareBtn} ${styles.nativeBtn}`}
            title="More Share Options"
            data-cursor="hover"
          >
            <Share2 size={16} />
            <span>More</span>
          </button>
        )}
      </div>
    </div>
  )
}
