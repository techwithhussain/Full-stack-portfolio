-- Run once in the existing InfinityFree database. Does not delete tables or rows.
ALTER TABLE `services` ADD COLUMN `color` VARCHAR(50) DEFAULT NULL AFTER `icon`;

INSERT IGNORE INTO `services` (`title`, `slug`, `icon`, `color`, `short_desc`, `is_featured`, `sort_order`) VALUES
  ('Web Development',            'web-development',           'Code',        '#00FF9D', 'High-speed, mobile-responsive websites, WordPress portals & custom web platforms built for high conversions and Google rankings.', 1, 1),
  ('Search Engine Optimization',  'seo-services',              'TrendingUp',  '#00F0FF', 'Rank #1 on Google with Technical SEO audits, On-Page optimization, keyword strategy & Google Maps (GMB) domination.', 1, 2),
  ('Application Development',     'application-development',   'Smartphone',  '#7B61FF', 'Scalable Web Applications, SaaS platforms & Mobile App UI/UX tailored for custom workflow automation.', 1, 3),
  ('Meta Ads (FB & IG Ads)',      'meta-ads',                  'Target',      '#FF2E93', 'High-ROI Meta Ad campaigns engineered to generate targeted leads, online sales, and high brand engagement.', 1, 4),
  ('Google Ads Management',       'google-ads',                'Search',      '#FFB800', 'Precision-targeted Search, Display & YouTube PPC campaigns to capture high-intent buyers on Google.', 1, 5),
  ('Social Media Marketing',      'social-media-marketing',    'Megaphone',   '#FF6B35', 'Organic social media growth, engaging visual branding, video reels strategy & strategic community management.', 1, 6);
