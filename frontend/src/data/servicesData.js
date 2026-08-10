// Comprehensive list of core services offered by Hussain Lone
export const DEFAULT_SERVICES = [
  {
    id: 1,
    title: 'Web Development',
    slug: 'web-development',
    icon: 'Code',
    color: '#00FF9D',
    short_desc: 'High-speed, mobile-responsive websites, WordPress portals & custom web platforms built for high conversions and Google rankings.',
    description: 'Complete end-to-end web development services using React, WordPress, PHP, and modern CSS. Whether you need a corporate business site, WooCommerce online store, or custom enterprise web app, I deliver fast, secure, and mobile-optimized web solutions.',
    tools: ['WordPress', 'React.js', 'PHP 8', 'MySQL', 'Tailwind CSS', 'Elementor Pro'],
    process: [
      { step: '01', title: 'Discovery & Wireframing', desc: 'Analyzing business goals, target audience, and layout architecture.' },
      { step: '02', title: 'Design & Development', desc: 'Building clean code, responsive layouts, and custom features.' },
      { step: '03', title: 'Speed & SEO Audit', desc: 'Optimizing Core Web Vitals (95+ score), meta tags, and SSL.' },
      { step: '04', title: 'Testing & Launch', desc: 'Deploying to live hosting with domain, SSL, and backup configuration.' }
    ],
    features: [
      'Responsive UI/UX for all screen sizes (320px to 4K)',
      'WordPress & Custom PHP/React Web Application Setup',
      'Speed Optimization with 95+ PageSpeed score',
      'Full On-Page & Technical SEO Ready Structure',
      'Contact Forms & WhatsApp Direct Integration',
      'Ongoing Security, SSL & Maintenance Support'
    ],
    faqs: [
      { q: 'Will my website be mobile-friendly?', a: 'Yes, 100% of websites built are tested and optimized across 320px to 4K resolutions.' },
      { q: 'Can I edit content myself later?', a: 'Absolutely. I provide full admin dashboard access and step-by-step video guides.' }
    ],
    is_featured: 1,
    sort_order: 1
  },
  {
    id: 2,
    title: 'Search Engine Optimization (SEO)',
    slug: 'seo-services',
    icon: 'TrendingUp',
    color: '#00F0FF',
    short_desc: 'Rank #1 on Google with Technical SEO audits, On-Page optimization, keyword strategy & Google Maps (GMB) domination.',
    description: 'Drive sustained organic traffic and rank on page 1 of Google. My SEO services cover deep competitor keyword research, technical performance audits, Schema JSON-LD markup, high-authority backlink strategy, and local GMB Google Maps optimization.',
    tools: ['Google Search Console', 'Google Analytics 4', 'Ahrefs', 'SEMrush', 'Screaming Frog', 'Yoast / RankMath'],
    process: [
      { step: '01', title: 'Comprehensive SEO Audit', desc: 'Diagnosing technical crawl errors, broken links, and site speed.' },
      { step: '02', title: 'Keyword & Competitor Strategy', desc: 'Finding high-volume, low-competition buyer keywords.' },
      { step: '03', title: 'On-Page & Schema Optimization', desc: 'Optimizing titles, headers, image ALT tags, and structured JSON-LD.' },
      { step: '04', title: 'Off-Page & Authority Building', desc: 'Earning high-quality backlinks and local Google Maps citations.' }
    ],
    features: [
      'Full Technical & On-Page SEO Audit',
      'High-Intent Buyer Keyword Research & Strategy',
      'Google Maps (GMB) Local Ranking Domination',
      'Structured Data & Schema JSON-LD Implementation',
      'High Authority Backlink Building & PR Citations',
      'Weekly & Monthly Rank Tracking Reports'
    ],
    faqs: [
      { q: 'How long before I see SEO results?', a: 'First indexing and ranking improvements usually show in 4 to 8 weeks, with major traffic boosts by month 3.' }
    ],
    is_featured: 1,
    sort_order: 2
  },
  {
    id: 3,
    title: 'Application Development',
    slug: 'application-development',
    icon: 'Smartphone',
    color: '#7B61FF',
    short_desc: 'Scalable Web Applications, SaaS platforms & Mobile App UI/UX tailored for custom workflow automation.',
    description: 'Building custom web applications, internal business software, and cross-platform mobile app interfaces. From API integrations, secure authentication, database schemas to AI workflow automation (OpenAI/n8n/Zapier), I deliver high-performance software.',
    tools: ['React.js', 'React Native', 'Node.js / PHP', 'MySQL / Supabase', 'REST / GraphQL APIs', 'OpenAI / n8n'],
    process: [
      { step: '01', title: 'Requirements Mapping', desc: 'Drafting entity-relationship diagrams and user story flows.' },
      { step: '02', title: 'Backend & DB Architecture', desc: 'Creating secure REST APIs and optimized database tables.' },
      { step: '03', title: 'Frontend & UI Integration', desc: 'Building responsive, reactive user interfaces.' },
      { step: '04', title: 'Deployment & CI/CD', desc: 'Deploying to cloud hosting with SSL and automated backups.' }
    ],
    features: [
      'Full-Stack Web App & SaaS Architecture',
      'Secure User Authentication & Database Management',
      'Custom REST API Development & Integration',
      'Cross-Platform Mobile App Interfaces (React Native)',
      'AI Models (OpenAI/GPT) & n8n Automation Workflows',
      'Cloud Server Setup, SSL & Scalable Infrastructure'
    ],
    faqs: [
      { q: 'Do you provide app maintenance?', a: 'Yes, ongoing maintenance and feature expansion contracts are available.' }
    ],
    is_featured: 1,
    sort_order: 3
  },
  {
    id: 4,
    title: 'Meta Ads (Facebook & Instagram Ads)',
    slug: 'meta-ads',
    icon: 'Target',
    color: '#FF2E93',
    short_desc: 'High-ROI Meta Ad campaigns engineered to generate targeted leads, online sales, and high brand engagement.',
    description: 'Maximize your advertising return on investment across Facebook & Instagram. I craft compelling ad creatives, configure Meta Pixel and Conversion API tracking, write persuasive copy, and manage hyper-targeted campaigns for maximum sales and low Cost Per Acquisition (CPA).',
    tools: ['Meta Ads Manager', 'Meta Pixel & CAPI', 'Canva Pro', 'Copywriting Hooks', 'Lookalike Audiences', 'A/B Testing Tools'],
    process: [
      { step: '01', title: 'Audience & Offer Audit', desc: 'Analyzing buyer personas, competitors, and offer hooks.' },
      { step: '02', title: 'Creative & Copy Setup', desc: 'Designing high-click banners, reels hooks, and copy angles.' },
      { step: '03', title: 'Campaign & Pixel Tracking', desc: 'Setting up Pixel, CAPI, custom conversions, and retargeting.' },
      { step: '04', title: 'Scaling & Optimization', desc: 'Scaling winning ad sets and trimming underperforming creatives.' }
    ],
    features: [
      'Targeted Lead Generation & Sales Ad Funnels',
      'Meta Pixel & Conversion API (CAPI) Tracking Setup',
      'High-Converting Ad Copy & Creative Banners/Reels',
      'Custom Audience Building & Lookalike Audience Scaling',
      'Continuous A/B Split Testing & CPA Optimization',
      'Transparent Weekly Performance & ROI Dashboards'
    ],
    faqs: [
      { q: 'Are ad spend budgets included in the fee?', a: 'No, ad spend is paid directly to Meta via your ad account.' }
    ],
    is_featured: 1,
    sort_order: 4
  },
  {
    id: 5,
    title: 'Google Ads Management',
    slug: 'google-ads',
    icon: 'Search',
    color: '#FFB800',
    short_desc: 'Precision-targeted Search, Display & YouTube PPC campaigns to capture high-intent buyers on Google.',
    description: 'Capture instant high-converting customer traffic from Google Search, Display Network, and YouTube. I manage negative keyword lists, Smart bidding strategies, and landing page optimization to achieve top Ad positions with lower Cost Per Click (CPC).',
    tools: ['Google Ads Editor', 'Google Keyword Planner', 'Google Tag Manager', 'GA4 Conversion Tracking', 'Landing Page Audits'],
    process: [
      { step: '01', title: 'Intent Keyword Research', desc: 'Identifying commercial search terms with high purchase intent.' },
      { step: '02', title: 'Ad Copy & Extensions', desc: 'Writing high CTR ad headlines, site-links, and callouts.' },
      { step: '03', title: 'Tag Manager & Bidding', desc: 'Setting up conversion tracking and target CPA bidding.' },
      { step: '04', title: 'Continuous Bid Tuning', desc: 'Optimizing negative keywords and landing page conversions.' }
    ],
    features: [
      'High-Intent Commercial Keyword Bidding Strategy',
      'Google Search, Display & Shopping PPC Campaigns',
      'Google Tag Manager Conversion & Event Tracking',
      'Negative Keyword Filtering for Minimum Ad Waste',
      'Landing Page Conversion Rate Optimization (CRO)',
      'Target CPA & ROAS Bid Optimization'
    ],
    faqs: [
      { q: 'Which is better, Google Ads or Meta Ads?', a: 'Google Ads targets active buyer intent, while Meta Ads builds visual brand demand. Combining both yields the highest conversion rates.' }
    ],
    is_featured: 1,
    sort_order: 5
  },
  {
    id: 6,
    title: 'Social Media Marketing',
    slug: 'social-media-marketing',
    icon: 'Megaphone',
    color: '#FF6B35',
    short_desc: 'Organic social media growth, engaging visual branding, video reels strategy & strategic community management.',
    description: 'Elevate your brand presence across Instagram, Facebook, LinkedIn, and YouTube. I create eye-catching graphic banners, short-form video hooks, reel editing, carousel slides, and strategic posting calendars to turn followers into active customers.',
    tools: ['Canva Pro', 'CapCut / Premiere', 'Photoshop', 'Meta Business Suite', 'Content Calendars', 'Analytics Tools'],
    process: [
      { step: '01', title: 'Brand Identity & Strategy', desc: 'Defining visual aesthetic, tone of voice, and content pillars.' },
      { step: '02', title: 'Content Creation & Editing', desc: 'Designing custom carousels, graphic banners, and video reels.' },
      { step: '03', title: 'Scheduling & Publishing', desc: 'Posting at peak engagement times with targeted hashtags.' },
      { step: '04', title: 'Growth Analysis', desc: 'Reviewing engagement metrics and optimizing strategy.' }
    ],
    features: [
      'Custom Graphic Banners, Carousels & Visual Branding',
      'Short-Form Video Reel Editing & Engaging Hooks',
      'Targeted Caption Writing & Trend Hashtag Research',
      'Multi-Platform Publishing (Instagram, Facebook, LinkedIn)',
      'Active Community Engagement & DM Management',
      'Monthly Audience Growth & Analytics Reports'
    ],
    faqs: [
      { q: 'Do you create the graphics and videos?', a: 'Yes, all graphic banners, carousel slides, captions, and reel edits are custom crafted by me.' }
    ],
    is_featured: 1,
    sort_order: 6
  }
]
