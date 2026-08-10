import React from 'react'
import styles from './Logo.module.css'

export function LogoIcon({ className = '', size }) {
  const style = size ? { height: size, width: 'auto' } : {}
  return (
    <svg
      viewBox="0 0 230 120"
      className={`${styles.iconSvg} ${className}`}
      style={style}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <filter id="logo-neon-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g filter="url(#logo-neon-glow)">
        {/* Letter T */}
        <path
          d="M 15 35 L 75 35 L 75 43 L 50 43 L 50 100 L 40 100 L 40 43 L 15 43 Z"
          fill="var(--clr-primary, #00ff9d)"
        />
        
        {/* T Circuit Traces */}
        <path
          d="M 40 50 L 25 65 L 25 100"
          stroke="var(--clr-primary, #00ff9d)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="25" cy="100" r="3" fill="var(--clr-primary, #00ff9d)" />

        <path
          d="M 40 58 L 31 67 L 31 90"
          stroke="var(--clr-primary, #00ff9d)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="31" cy="90" r="3" fill="var(--clr-primary, #00ff9d)" />

        <path
          d="M 40 66 L 37 69 L 37 80"
          stroke="var(--clr-primary, #00ff9d)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="37" cy="80" r="3" fill="var(--clr-primary, #00ff9d)" />

        {/* Letter W */}
        <path
          d="M 70 35 L 92 100 L 105 65 L 118 100 L 140 35 L 130 35 L 125 75 L 115 45 L 105 75 L 92 75 L 80 35 Z"
          fill="var(--clr-primary, #00ff9d)"
        />

        {/* Code Tag </> above W center vertex */}
        <path
          d="M 95 24 L 89 28 L 95 32"
          stroke="var(--clr-primary, #00ff9d)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 101 33 L 109 19"
          stroke="var(--clr-primary, #00ff9d)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 115 24 L 121 28 L 115 32"
          stroke="var(--clr-primary, #00ff9d)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Letter H (linked to W) */}
        <path
          d="M 136 35 L 146 35 L 146 100 L 136 100 Z"
          fill="var(--clr-primary, #00ff9d)"
        />
        <path
          d="M 175 35 L 185 35 L 185 100 L 175 100 Z"
          fill="var(--clr-primary, #00ff9d)"
        />
        <path
          d="M 146 62 L 175 62 L 175 70 L 146 70 Z"
          fill="var(--clr-primary, #00ff9d)"
        />

        {/* H Circuit Traces */}
        <path
          d="M 175 66 L 190 66 L 200 56 L 210 56"
          stroke="var(--clr-primary, #00ff9d)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="210" cy="56" r="3" fill="var(--clr-primary, #00ff9d)" />

        <path
          d="M 175 74 L 192 74 L 202 84 L 212 84"
          stroke="var(--clr-primary, #00ff9d)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="212" cy="84" r="3" fill="var(--clr-primary, #00ff9d)" />
      </g>
    </svg>
  )
}

export function LogoText({ className = '', size }) {
  const style = size ? { height: size, width: 'auto' } : {}
  return (
    <svg
      viewBox="0 0 260 30"
      className={`${styles.textSvg} ${className}`}
      style={style}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <filter id="text-neon-glow" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g filter="url(#text-neon-glow)">
        {/* Left Cyber Bracket */}
        <path
          d="M 5 12 L 12 20 L 50 20"
          stroke="var(--clr-primary, #00ff9d)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Brand Text */}
        <text
          x="130"
          y="24"
          textAnchor="middle"
          fill="var(--clr-primary, #00ff9d)"
          fontSize="11.5"
          fontWeight="800"
          letterSpacing="1.8"
          fontFamily="var(--font-heading)"
        >
          TECH WITH HUSSAIN
        </text>

        {/* Right Cyber Bracket */}
        <path
          d="M 210 20 L 248 20 L 255 12"
          stroke="var(--clr-primary, #00ff9d)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  )
}

export default function Logo({ mode = 'horizontal', className = '', iconSize, textSize }) {
  if (mode === 'icon') {
    return <LogoIcon className={className} size={iconSize} />
  }

  if (mode === 'stacked') {
    return (
      <div className={`${styles.logoStacked} ${className}`}>
        <LogoIcon className={styles.stackedIcon} size={iconSize} />
        <LogoText className={styles.stackedText} size={textSize} />
      </div>
    )
  }

  // Default: horizontal
  return (
    <div className={`${styles.logoHorizontal} ${className}`}>
      <LogoIcon className={styles.horizontalIcon} size={iconSize} />
      <LogoText className={styles.horizontalText} size={textSize} />
    </div>
  )
}
