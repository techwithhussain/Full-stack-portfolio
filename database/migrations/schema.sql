-- ============================================================
-- Tech With Hussain — Full Stack Portfolio Platform
-- Database Schema v1.0
-- MySQL 8.0+ | Charset: utf8mb4 | Engine: InnoDB
-- ============================================================

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";
SET NAMES utf8mb4;

-- ── Create Database ──────────────────────────────────────────
CREATE DATABASE IF NOT EXISTS `techwithhussain_db`
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;

USE `techwithhussain_db`;

-- ============================================================
-- 2. SITE SETTINGS (key-value store for all config)
-- ============================================================
CREATE TABLE `site_settings` (
  `id`          INT UNSIGNED   NOT NULL AUTO_INCREMENT,
  `setting_key` VARCHAR(100)   NOT NULL UNIQUE,
  `setting_val` TEXT           DEFAULT NULL,
  `updated_at`  TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_setting_key` (`setting_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `site_settings` (`setting_key`, `setting_val`) VALUES
  ('site_name',            'Tech With Hussain'),
  ('site_url',             'https://techwithhussain.online'),
  ('admin_url',            'https://techwithhussain.online/admin'),
  ('site_tagline',         'Full Stack Developer & AI Automation Expert'),
  ('owner_name',           'Hussain Lone'),
  ('owner_email',          'lonezakir124@gmail.com'),
  ('whatsapp_number',      '916005401734'),
  ('phone',                '+91 6005401734'),
  ('location',             'Srinagar, J&K, India'),
  ('smtp_host',            'smtp.hostinger.com'),
  ('smtp_port',            '465'),
  ('smtp_email',           'lonezakir124@gmail.com'),
  ('smtp_encryption',      'ssl'),
  ('social_facebook',      'https://www.facebook.com/techwithhussain'),
  ('social_instagram',     'https://www.instagram.com/tech.withhussain'),
  ('social_youtube',       'https://youtube.com/@tech.withhussain'),
  ('social_linkedin',      'https://www.linkedin.com/in/techwithhussain'),
  ('social_github',        'https://github.com/techwithhussain'),
  ('meta_title',           'Tech With Hussain — Full Stack Developer & AI Automation Expert'),
  ('meta_description',     'Premium portfolio of Hussain Lone — Full Stack Developer, AI Automation Expert, and SEO Strategist based in Srinagar, India.'),
  ('google_analytics_id',  ''),
  ('maintenance_mode',     '0');

-- ============================================================
-- 3. PROJECTS
-- ============================================================
CREATE TABLE `projects` (
  `id`              INT UNSIGNED   NOT NULL AUTO_INCREMENT,
  `title`           VARCHAR(255)   NOT NULL,
  `slug`            VARCHAR(255)   NOT NULL UNIQUE,
  `excerpt`         TEXT           DEFAULT NULL,
  `description`     LONGTEXT       DEFAULT NULL,
  `category`        VARCHAR(100)   DEFAULT NULL,
  `technologies`    JSON           DEFAULT NULL,             -- ["React","PHP","MySQL"]
  `thumbnail`       VARCHAR(500)   DEFAULT NULL,
  `gallery`         JSON           DEFAULT NULL,             -- ["img1.jpg","img2.jpg"]
  `live_url`        VARCHAR(500)   DEFAULT NULL,
  `github_url`      VARCHAR(500)   DEFAULT NULL,
  `case_study_url`  VARCHAR(500)   DEFAULT NULL,
  `results`         JSON           DEFAULT NULL,             -- [{"label":"Revenue","value":"+40%"}]
  `is_featured`     TINYINT(1)     NOT NULL DEFAULT 0,
  `sort_order`      INT            NOT NULL DEFAULT 0,
  `status`          ENUM('published','draft','archived') NOT NULL DEFAULT 'published',
  `created_at`      TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`      TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_project_slug` (`slug`),
  KEY `idx_project_status`   (`status`),
  KEY `idx_project_featured` (`is_featured`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Seed: sample projects
INSERT INTO `projects` (`title`, `slug`, `excerpt`, `category`, `technologies`, `thumbnail`, `live_url`, `is_featured`, `sort_order`, `status`) VALUES
  ('WalnutWala — Kashmiri Walnuts & Organic Dry Fruits Store', 'walnutwala', 'Official E-Commerce store & SEO growth strategy for WalnutWala — Kashmir premier organic dry fruits & walnut brand. Built with high performance, conversion-optimized checkout, and ranked #1 on Google.', 'WordPress', '["WordPress","WooCommerce","SEO Optimization","Google Ads","Payment Gateway","Core Web Vitals 95+"]', '/walnuta.webp', 'https://walnutwala.com/', 1, 1, 'published'),
  ('Guru Digital Advertising — Top Digital Marketing & Web Agency', 'guru-digital-advertising', 'Official enterprise website & digital growth strategy for Guru Digital Advertising — Leading performance marketing, SEO, and web development agency in India.', 'Web Dev', '["React","PHP","Meta Ads","Google Ads","SEO Optimization","Core Web Vitals 98+"]', '/guru.webp', 'https://www.gurudigitaladvertising.com/', 1, 2, 'published'),
  ('Gurukul Vidya Peeth — Educational Institution Portal', 'gurukul-vidya-peeth', 'Official responsive website & digital enrollment portal for Gurukul Vidya Peeth school. Built with modern UI/UX design, parent notice board, admission portal, and fast mobile performance.', 'WordPress', '["WordPress","SEO Optimization","Core Web Vitals 96+","Responsive UI","Admission Portal"]', '/school.webp', 'https://www.gurukulvidyahpeeth.in/', 1, 3, 'published');

-- ============================================================
-- 4. SERVICES
-- ============================================================
CREATE TABLE `services` (
  `id`            INT UNSIGNED   NOT NULL AUTO_INCREMENT,
  `title`         VARCHAR(255)   NOT NULL,
  `slug`          VARCHAR(255)   NOT NULL UNIQUE,
  `icon`          VARCHAR(100)   DEFAULT NULL,               -- lucide icon name
  `short_desc`    TEXT           DEFAULT NULL,
  `description`   LONGTEXT       DEFAULT NULL,
  `packages`      JSON           DEFAULT NULL,               -- [{name,price,features}]
  `faqs`          JSON           DEFAULT NULL,               -- [{q,a}]
  `is_featured`   TINYINT(1)     NOT NULL DEFAULT 0,
  `sort_order`    INT            NOT NULL DEFAULT 0,
  `status`        ENUM('active','inactive') NOT NULL DEFAULT 'active',
  `created_at`    TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`    TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_service_slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `services` (`title`, `slug`, `icon`, `color`, `short_desc`, `is_featured`, `sort_order`) VALUES
  ('Web Development',            'web-development',           'Code',        '#00FF9D', 'High-speed, mobile-responsive websites, WordPress portals & custom web platforms built for high conversions and Google rankings.', 1, 1),
  ('Search Engine Optimization',  'seo-services',              'TrendingUp',  '#00F0FF', 'Rank #1 on Google with Technical SEO audits, On-Page optimization, keyword strategy & Google Maps (GMB) domination.', 1, 2),
  ('Application Development',     'application-development',   'Smartphone',  '#7B61FF', 'Scalable Web Applications, SaaS platforms & Mobile App UI/UX tailored for custom workflow automation.', 1, 3),
  ('Meta Ads (FB & IG Ads)',      'meta-ads',                  'Target',      '#FF2E93', 'High-ROI Meta Ad campaigns engineered to generate targeted leads, online sales, and high brand engagement.', 1, 4),
  ('Google Ads Management',       'google-ads',                'Search',      '#FFB800', 'Precision-targeted Search, Display & YouTube PPC campaigns to capture high-intent buyers on Google.', 1, 5),
  ('Social Media Marketing',      'social-media-marketing',    'Megaphone',   '#FF6B35', 'Organic social media growth, engaging visual branding, video reels strategy & strategic community management.', 1, 6);

-- ============================================================
-- 5. BLOG POSTS
-- ============================================================
CREATE TABLE `blog_posts` (
  `id`             INT UNSIGNED   NOT NULL AUTO_INCREMENT,
  `title`          VARCHAR(500)   NOT NULL,
  `slug`           VARCHAR(500)   NOT NULL UNIQUE,
  `excerpt`        TEXT           DEFAULT NULL,
  `content`        LONGTEXT       DEFAULT NULL,              -- HTML from Quill.js
  `thumbnail`      VARCHAR(500)   DEFAULT NULL,
  `category`       VARCHAR(100)   DEFAULT NULL,
  `tags`           JSON           DEFAULT NULL,              -- ["SEO","WordPress"]
  `author_id`      INT UNSIGNED   NOT NULL,
  `views`          INT UNSIGNED   NOT NULL DEFAULT 0,
  `read_time`      VARCHAR(20)    DEFAULT NULL,              -- "5 min read"
  `is_featured`    TINYINT(1)     NOT NULL DEFAULT 0,
  `meta_title`     VARCHAR(255)   DEFAULT NULL,
  `meta_desc`      VARCHAR(500)   DEFAULT NULL,
  `status`         ENUM('published','draft','scheduled') NOT NULL DEFAULT 'draft',
  `published_at`   TIMESTAMP      DEFAULT NULL,
  `created_at`     TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`     TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_post_slug` (`slug`),
  KEY `idx_post_status`      (`status`),
  KEY `idx_post_featured`    (`is_featured`),
  KEY `idx_post_author`      (`author_id`),
  KEY `idx_post_published`   (`published_at`),
  FULLTEXT KEY `ft_post_search` (`title`, `excerpt`, `content`),
  CONSTRAINT `fk_post_author` FOREIGN KEY (`author_id`) REFERENCES `admin_users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `blog_posts` (`title`, `slug`, `excerpt`, `category`, `tags`, `author_id`, `is_featured`, `status`, `published_at`) VALUES
  ('Mastering n8n for Workflow Automation', 'mastering-n8n-automation', 'How to connect OpenAI, Gmail, and Slack to build self-healing automation workflows for lead generation.', 'AI & Tech', '["n8n","OpenAI","Automation"]', 1, 1, 'published', NOW()),
  ('How I Fixed Core Web Vitals on WordPress', 'fixing-wordpress-core-web-vitals', 'A case study on optimizing TTFB, CLS, and LCP to pass Google standards with 95+ scores.', 'Web Dev', '["WordPress","SEO","Performance"]', 1, 1, 'published', NOW()),
  ('The Local SEO Guide to Ranking #1 on Google Maps', 'local-seo-ranking-google-maps', 'Discover the exact schema templates and local review strategies we used to dominate local search.', 'SEO Marketing', '["SEO","Local SEO","Schema"]', 1, 0, 'published', NOW()),
  ('Why You Should Stop Storing JWT in localStorage', 'secure-jwt-cookies-php', 'An investigation into XSS vulnerability risks and a guide to securing tokens using HTTP-only cookies in PHP.', 'Web Dev', '["Security","JWT","PHP"]', 1, 0, 'published', NOW());

-- ============================================================
-- 6. TESTIMONIALS
-- ============================================================
CREATE TABLE `testimonials` (
  `id`           INT UNSIGNED   NOT NULL AUTO_INCREMENT,
  `name`         VARCHAR(120)   NOT NULL,
  `designation`  VARCHAR(200)   DEFAULT NULL,
  `company`      VARCHAR(200)   DEFAULT NULL,
  `avatar`       VARCHAR(500)   DEFAULT NULL,
  `content`      TEXT           NOT NULL,
  `rating`       TINYINT(1)     NOT NULL DEFAULT 5,          -- 1–5
  `project_type` VARCHAR(100)   DEFAULT NULL,
  `video_url`    VARCHAR(500)   DEFAULT NULL,                -- optional video testimonial
  `is_featured`  TINYINT(1)     NOT NULL DEFAULT 0,
  `sort_order`   INT            NOT NULL DEFAULT 0,
  `status`       ENUM('approved','pending','rejected') NOT NULL DEFAULT 'approved',
  `created_at`   TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`   TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `testimonials` (`name`, `designation`, `company`, `content`, `rating`, `is_featured`, `sort_order`) VALUES
  ('Ravi Sharma',    'E-commerce Director',   'WalnutWala',       'Hussain ranked us #1 on Google in 4 months. Organic traffic increased by 340%. Absolutely outstanding SEO work.', 5, 1, 1),
  ('Sarah Chen',     'CEO',                   'NovaTech Solutions','The AI chatbot Hussain built tripled our lead conversions. The code quality was exceptional — clean, scalable, fast.',  5, 1, 2),
  ('Ahmed Al-Farsi', 'Marketing Head',        'Dubai Exports LLC', 'Website went from 45 to 98 on PageSpeed. Our bounce rate dropped by 60% and inquiries doubled within a month.', 5, 1, 3),
  ('Priya Nair',     'Co-Founder',            'BrandBloom India',  'Full rebranding and web development done in 3 weeks. Design is stunning. Our clients are always complimenting the site.', 5, 0, 4);

-- ============================================================
-- 7. EXPERIENCE / CAREER
-- ============================================================
CREATE TABLE `experience` (
  `id`           INT UNSIGNED   NOT NULL AUTO_INCREMENT,
  `company`      VARCHAR(255)   NOT NULL,
  `role`         VARCHAR(255)   NOT NULL,
  `type`         ENUM('full-time','part-time','freelance','internship','contract') NOT NULL DEFAULT 'full-time',
  `location`     VARCHAR(200)   DEFAULT NULL,
  `start_date`   DATE           NOT NULL,
  `end_date`     DATE           DEFAULT NULL,               -- NULL = currently working
  `is_current`   TINYINT(1)     NOT NULL DEFAULT 0,
  `description`  LONGTEXT       DEFAULT NULL,
  `achievements` JSON           DEFAULT NULL,               -- ["Grew traffic 300%","Built 5 AI tools"]
  `sort_order`   INT            NOT NULL DEFAULT 0,
  `status`       ENUM('active','inactive') NOT NULL DEFAULT 'active',
  `created_at`   TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `experience` (`company`, `role`, `type`, `location`, `start_date`, `is_current`, `sort_order`) VALUES
  ('Tech With Hussain',        'Full Stack Developer & SEO Expert',      'freelance',   'Srinagar, JK',   '2022-01-01', 1, 1),
  ('Freelance — Upwork/Fiverr','Web Developer & AI Automation Expert',   'freelance',   'Remote',         '2020-06-01', 0, 2);

-- ============================================================
-- 8. CERTIFICATIONS
-- ============================================================
CREATE TABLE `certifications` (
  `id`            INT UNSIGNED   NOT NULL AUTO_INCREMENT,
  `title`         VARCHAR(300)   NOT NULL,
  `issuer`        VARCHAR(200)   NOT NULL,
  `issuer_logo`   VARCHAR(500)   DEFAULT NULL,
  `issued_date`   DATE           DEFAULT NULL,
  `expiry_date`   DATE           DEFAULT NULL,
  `credential_id` VARCHAR(255)   DEFAULT NULL,
  `verify_url`    VARCHAR(500)   DEFAULT NULL,
  `badge_image`   VARCHAR(500)   DEFAULT NULL,
  `category`      VARCHAR(100)   DEFAULT NULL,
  `sort_order`    INT            NOT NULL DEFAULT 0,
  `status`        ENUM('active','expired','pending') NOT NULL DEFAULT 'active',
  `created_at`    TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `certifications` (`title`, `issuer`, `issued_date`, `category`, `sort_order`) VALUES
  ('Google Analytics Individual Qualification', 'Google',                 '2024-03-15', 'Analytics', 1),
  ('HubSpot Content Marketing Certification',   'HubSpot Academy',        '2024-01-10', 'Marketing', 2),
  ('Meta Social Media Marketing Certificate',   'Meta (Facebook)',         '2023-11-01', 'Marketing', 3),
  ('PHP & MySQL — The Complete Guide',           'Udemy',                  '2023-08-20', 'Web Dev',   4),
  ('React 18 Complete Developer Course',         'Zero to Mastery',        '2023-06-15', 'Web Dev',   5),
  ('SEMrush SEO Fundamentals Certificate',       'SEMrush Academy',        '2023-04-10', 'SEO',       6);

-- ============================================================
-- 9. CONTACT MESSAGES / LEADS
-- ============================================================
CREATE TABLE `contact_messages` (
  `id`           INT UNSIGNED   NOT NULL AUTO_INCREMENT,
  `name`         VARCHAR(150)   NOT NULL,
  `email`        VARCHAR(191)   NOT NULL,
  `phone`        VARCHAR(30)    DEFAULT NULL,
  `subject`      VARCHAR(300)   DEFAULT NULL,
  `message`      TEXT           NOT NULL,
  `service_type` VARCHAR(100)   DEFAULT NULL,               -- which service they're interested in
  `budget`       VARCHAR(50)    DEFAULT NULL,               -- "₹10k-₹30k"
  `source`       VARCHAR(50)    DEFAULT 'contact_form',     -- contact_form | popup | whatsapp
  `ip_address`   VARCHAR(50)    DEFAULT NULL,
  `is_read`      TINYINT(1)     NOT NULL DEFAULT 0,
  `is_starred`   TINYINT(1)     NOT NULL DEFAULT 0,
  `replied_at`   TIMESTAMP      DEFAULT NULL,
  `status`       ENUM('new','read','replied','spam') NOT NULL DEFAULT 'new',
  `created_at`   TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_msg_status`   (`status`),
  KEY `idx_msg_email`    (`email`),
  KEY `idx_msg_created`  (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 10. NEWSLETTER SUBSCRIBERS
-- ============================================================
CREATE TABLE `newsletter_subscribers` (
  `id`            INT UNSIGNED   NOT NULL AUTO_INCREMENT,
  `email`         VARCHAR(191)   NOT NULL UNIQUE,
  `name`          VARCHAR(120)   DEFAULT NULL,
  `source`        VARCHAR(50)    DEFAULT 'footer',           -- footer | popup | blog
  `verify_token`  VARCHAR(255)   DEFAULT NULL,
  `is_verified`   TINYINT(1)     NOT NULL DEFAULT 0,
  `subscribed_at` TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `unsubscribed_at` TIMESTAMP    DEFAULT NULL,
  `status`        ENUM('active','unsubscribed','bounced') NOT NULL DEFAULT 'active',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_subscriber_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 11. MEDIA LIBRARY
-- ============================================================
CREATE TABLE `media_library` (
  `id`           INT UNSIGNED   NOT NULL AUTO_INCREMENT,
  `filename`     VARCHAR(300)   NOT NULL,
  `original_name` VARCHAR(300)  NOT NULL,
  `file_type`    VARCHAR(50)    NOT NULL,                    -- image/jpeg, image/png, application/pdf
  `file_size`    INT UNSIGNED   NOT NULL,                    -- bytes
  `width`        SMALLINT       DEFAULT NULL,
  `height`       SMALLINT       DEFAULT NULL,
  `url`          VARCHAR(600)   NOT NULL,
  `folder`       VARCHAR(100)   DEFAULT 'general',
  `alt_text`     VARCHAR(300)   DEFAULT NULL,
  `uploaded_by`  INT UNSIGNED   DEFAULT NULL,
  `created_at`   TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_media_type`   (`file_type`),
  KEY `idx_media_folder` (`folder`),
  CONSTRAINT `fk_media_uploader` FOREIGN KEY (`uploaded_by`) REFERENCES `admin_users`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 12. ANALYTICS EVENTS (lightweight in-built analytics)
-- ============================================================
CREATE TABLE `analytics_events` (
  `id`           BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `event_type`   VARCHAR(50)    NOT NULL,                    -- page_view | service_view | project_view | blog_read
  `page`         VARCHAR(300)   DEFAULT NULL,
  `referrer`     VARCHAR(500)   DEFAULT NULL,
  `user_agent`   VARCHAR(500)   DEFAULT NULL,
  `ip_address`   VARCHAR(50)    DEFAULT NULL,
  `country`      VARCHAR(100)   DEFAULT NULL,
  `device`       ENUM('desktop','mobile','tablet') DEFAULT 'desktop',
  `session_id`   VARCHAR(64)    DEFAULT NULL,
  `created_at`   TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_event_type`    (`event_type`),
  KEY `idx_event_date`    (`created_at`),
  KEY `idx_event_page`    (`page`(100))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 13. ADMIN ACTIVITY LOG
-- ============================================================
CREATE TABLE `admin_activity_log` (
  `id`          BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `admin_id`    INT UNSIGNED   NOT NULL,
  `action`      VARCHAR(100)   NOT NULL,                     -- login | create_post | delete_project
  `entity`      VARCHAR(100)   DEFAULT NULL,                 -- blog_posts | projects
  `entity_id`   INT UNSIGNED   DEFAULT NULL,
  `details`     JSON           DEFAULT NULL,
  `ip_address`  VARCHAR(50)    DEFAULT NULL,
  `created_at`  TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_log_admin`  (`admin_id`),
  KEY `idx_log_action` (`action`),
  KEY `idx_log_date`   (`created_at`),
  CONSTRAINT `fk_log_admin` FOREIGN KEY (`admin_id`) REFERENCES `admin_users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 14. SKILLS
-- ============================================================
CREATE TABLE `skills` (
  `id`           INT UNSIGNED   NOT NULL AUTO_INCREMENT,
  `name`         VARCHAR(100)   NOT NULL,
  `category`     VARCHAR(80)    DEFAULT NULL,                -- Frontend | Backend | AI | SEO | Tools
  `icon`         VARCHAR(100)   DEFAULT NULL,
  `level`        TINYINT        NOT NULL DEFAULT 90,         -- 0–100 percentage
  `sort_order`   INT            NOT NULL DEFAULT 0,
  `status`       ENUM('active','inactive') NOT NULL DEFAULT 'active',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `skills` (`name`, `category`, `level`, `sort_order`) VALUES
  ('React',              'Frontend',  92, 1),
  ('JavaScript',         'Frontend',  90, 2),
  ('CSS / Animations',   'Frontend',  88, 3),
  ('PHP 8',              'Backend',   85, 4),
  ('MySQL',              'Backend',   83, 5),
  ('Python',             'Backend',   78, 6),
  ('OpenAI / GPT',       'AI Tools',  88, 7),
  ('n8n Automation',     'AI Tools',  92, 8),
  ('WordPress',          'CMS',       95, 9),
  ('Full SEO',           'SEO',       90, 10),
  ('Local SEO',          'SEO',       88, 11),
  ('Content Strategy',   'SEO',       80, 12),
  ('Git / GitHub',       'DevOps',    82, 13),
  ('Hostinger / cPanel', 'DevOps',    85, 14);

-- ============================================================
-- DONE — schema.sql complete
-- ============================================================
