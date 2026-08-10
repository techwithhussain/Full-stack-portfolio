<?php
require_once __DIR__ . '/../backend/api/config/db.php';

try {
    $pdo = Database::getInstance();

    // 1. Check/Add columns
    $columnsToAdd = [
        'color' => "VARCHAR(50) DEFAULT NULL AFTER `icon`",
        'tools' => "JSON DEFAULT NULL AFTER `description`",
        'process' => "JSON DEFAULT NULL AFTER `tools`"
    ];

    // Get existing columns
    $stmt = $pdo->query("DESCRIBE `services`");
    $existingColumns = $stmt->fetchAll(PDO::FETCH_COLUMN);

    foreach ($columnsToAdd as $col => $definition) {
        if (!in_array($col, $existingColumns)) {
            echo "Adding column '$col' to 'services' table...\n";
            $pdo->exec("ALTER TABLE `services` ADD `$col` $definition");
        } else {
            echo "Column '$col' already exists.\n";
        }
    }

    // 2. Check if we have services
    $count = (int) $pdo->query("SELECT COUNT(*) FROM `services`")->fetchColumn();

    // If table has records but doesn't have details, or if it has some default records, let's update them
    echo "Current services count: $count\n";

    // Default services data from ServicesPage.jsx and ServiceDetailPage.jsx
    $defaultServices = [
        'ai-development' => [
            'title' => 'AI Web Development',
            'icon' => 'Bot',
            'color' => 'var(--clr-primary)',
            'short_desc' => 'Streamline operations, integrate LLMs, and automate repetitive tasks using n8n, Make.com, and custom API pipelines.',
            'description' => 'Integrate custom OpenAI/Claude models, build smart lead chat routing systems, and automate operational workflows via n8n and Make.com.',
            'tools' => ['OpenAI API', 'Claude API', 'n8n', 'Make.com', 'n8n Cloud', 'LangChain', 'Vector DBs'],
            'process' => [
                ['step' => '01', 'title' => 'Consultation', 'desc' => 'Identify operational bottlenecks and plan automated pipelines.'],
                ['step' => '02', 'title' => 'System Architecture', 'desc' => 'Map triggers, API connections, and logic schemas.'],
                ['step' => '03', 'title' => 'Pipeline Build', 'desc' => 'Construct workflows in n8n/Make and write custom API code.'],
                ['step' => '04', 'title' => 'Testing & QA', 'desc' => 'Perform system checks and error handling validations.']
            ],
            'packages' => [
                'basic' => [
                    'name' => 'Starter Automation',
                    'price' => '$499',
                    'delivery' => '7 Days',
                    'revisions' => '3 Revisions',
                    'desc' => 'Single workflow automation between up to 3 applications (e.g. Gmail to Google Sheets with AI parsing).',
                    'features' => ['1 n8n / Make Workflow', 'API Integration (up to 3 apps)', 'Basic Error Notification', '7 Days Support']
                ],
                'standard' => [
                    'name' => 'Business Agent',
                    'price' => '$999',
                    'delivery' => '14 Days',
                    'revisions' => 'Unlimited',
                    'desc' => 'Advanced workflow systems with vector database storage and custom LLM chatbot context for support.',
                    'features' => ['Up to 3 Linked Workflows', 'Custom GPT Chatbot Integration', 'Vector Database Storage', 'Advanced Error Handling', '30 Days Support']
                ],
                'premium' => [
                    'name' => 'Enterprise Automation',
                    'price' => '$1,999',
                    'delivery' => '21 Days',
                    'revisions' => 'Unlimited',
                    'desc' => 'Full company operations overhaul, connecting multi-agent systems to CRMs and client interfaces.',
                    'features' => ['Unlimited Workflows', 'Multi-Agent AI Setup', 'CRM & ERP Deep Connection', 'Team Training & Admin Docs', '60 Days Priority Support']
                ]
            ],
            'faqs' => [
                ['q' => 'Which automation tool is better, n8n or Make.com?', 'a' => 'n8n is ideal for self-hosted setups and complex custom code pipelines. Make.com is great for fast visual triggers. I will recommend the best based on your stack.'],
                ['q' => 'Do I need to pay for my own API keys?', 'a' => 'Yes, you will need your own OpenAI, Claude, or Make.com accounts. I will guide you through setting these up securely.']
            ],
            'is_featured' => 1,
            'sort_order' => 1
        ],
        'wordpress-development' => [
            'title' => 'WordPress Development',
            'icon' => 'Code',
            'color' => 'var(--clr-secondary)',
            'short_desc' => 'High-performance websites, custom portfolio displays, and fully functional online e-commerce shops built to convert visitors.',
            'description' => 'High-speed agency sites, responsive custom landing pages, and secure e-commerce portals using modern UX architectures.',
            'tools' => ['WordPress Core', 'Elementor Pro', 'WooCommerce', 'Custom PHP/CSS', 'WP Rocket', 'Advanced Custom Fields'],
            'process' => [
                ['step' => '01', 'title' => 'UX/UI Wireframing', 'desc' => 'Design sitemap structures and page mockups.'],
                ['step' => '02', 'title' => 'Custom Theme Build', 'desc' => 'Assemble templates using clean element structures.'],
                ['step' => '03', 'title' => 'Responsive Testing', 'desc' => 'Optimize layouts for mobile, tablet, and desktop viewports.'],
                ['step' => '04', 'title' => 'SEO & Speed tuning', 'desc' => 'Inject metadata and implement page caching policies.']
            ],
            'packages' => [
                'basic' => [
                    'name' => 'Landing Page',
                    'price' => '$299',
                    'delivery' => '5 Days',
                    'revisions' => '3 Revisions',
                    'desc' => 'A single high-converting landing page optimized for lead collection or product highlights.',
                    'features' => ['1 Landing Page Section Grid', 'Contact Form Integration', 'Fully Responsive Design', 'Basic On-page SEO setup', '7 Days Support']
                ],
                'standard' => [
                    'name' => 'Professional Website',
                    'price' => '$699',
                    'delivery' => '10 Days',
                    'revisions' => '5 Revisions',
                    'desc' => 'Full multi-page company website (up to 5 pages) designed to showcase services and drive leads.',
                    'features' => ['Up to 5 Pages', 'Elementor Pro Builder', 'Advanced Forms & Map Pack', 'SEO & Speed Optimization', '30 Days Support']
                ],
                'premium' => [
                    'name' => 'E-Commerce Portal',
                    'price' => '$1,299',
                    'delivery' => '18 Days',
                    'revisions' => 'Unlimited',
                    'desc' => 'Complete WooCommerce web store with payment gateway connections, invoice routing, and email triggers.',
                    'features' => ['Full Web Store Setup', 'WooCommerce + Payment Gateways', 'Inventory & Coupon Controls', 'Invoice/Receipt Automations', '60 Days Priority Support']
                ]
            ],
            'faqs' => [
                ['q' => 'Do you write custom CSS and PHP?', 'a' => 'Yes. While I use Elementor Pro for design speed, I write custom CSS and PHP functions for unique components and layouts.'],
                ['q' => 'Will I be able to edit my own site later?', 'a' => 'Absolutely. I build sites with client handoff in mind, providing easy-to-use editor fields and custom video training.']
            ],
            'is_featured' => 1,
            'sort_order' => 2
        ],
        'seo-services' => [
            'title' => 'SEO Full Project',
            'icon' => 'BarChart',
            'color' => 'var(--clr-purple)',
            'short_desc' => 'On-Page, Off-Page, Technical & Local SEO, keyword research, and Google Maps domination.',
            'description' => 'Increase your search traffic. Comprehensive keyword mapping, On-Page, Off-Page, Technical & Local SEO audits, page speed tune-ups, and local SEO map pack dominance.',
            'tools' => ['Google Search Console', 'Ahrefs', 'Semrush', 'Google Analytics 4', 'Schema JSON-LD', 'PageSpeed Insights'],
            'process' => [
                ['step' => '01', 'title' => 'Keyword Research', 'desc' => 'Analyze buyer intent keywords and competitor strategies.'],
                ['step' => '02', 'title' => 'Technical Audit', 'desc' => 'Identify crawl issues, duplicate tags, and index errors.'],
                ['step' => '03', 'title' => 'On-Page Optimization', 'desc' => 'Inject schemas, structure headings, and refine meta copies.'],
                ['step' => '04', 'title' => 'Backlink Blueprint', 'desc' => 'Map outreach assets to grow domain authority.']
            ],
            'packages' => [
                'basic' => [
                    'name' => 'SEO Audit & Map',
                    'price' => '$399',
                    'delivery' => '7 Days',
                    'revisions' => '2 Revisions',
                    'desc' => 'Comprehensive SEO audit checklist and custom keyword map for your website.',
                    'features' => ['Full SEO Audit Report', 'Competitor Analysis Map', 'Target Keyword Strategy', 'Recommended Schema Actions', '1 Consultation Call']
                ],
                'standard' => [
                    'name' => 'Core SEO Setup',
                    'price' => '$799',
                    'delivery' => '14 Days',
                    'revisions' => '3 Revisions',
                    'desc' => 'Implementation of critical SEO fixes, page schema injections, and metadata rewrite for up to 10 pages.',
                    'features' => ['On-page Fixes (up to 10 pages)', 'Full JSON-LD Schema Setup', 'Core Web Vitals Speed Tune', 'Google Analytics/GSC Config', '30 Days Retainer Support']
                ],
                'premium' => [
                    'name' => 'SEO Authority retainer',
                    'price' => '$1,299',
                    'delivery' => 'Monthly',
                    'revisions' => 'Ongoing',
                    'desc' => 'Complete monthly SEO management including content writing, rank tracking, and speed audits.',
                    'features' => ['Ongoing On-page SEO', '4 High-Quality Blog Posts/mo', 'Monthly Rank Reports', 'Crawl Monitoring & Fixes', 'Priority Live Chat Support']
                ]
            ],
            'faqs' => [
                ['q' => 'How long does it take to see SEO results?', 'a' => 'Technical fixes and indexing can show impact in weeks. Higher authority rankings typically take 3 to 6 months of steady optimization.'],
                ['q' => 'Do you guarantee first page rankings?', 'a' => 'No ethical SEO specialist guarantees #1 ranks since Google algorithm changes constantly. However, my strategies consistently drive positive organic traffic growth.']
            ],
            'is_featured' => 1,
            'sort_order' => 3
        ],
        'content-creation' => [
            'title' => 'Content Creation & Strategy',
            'icon' => 'Video',
            'color' => 'var(--clr-primary)',
            'short_desc' => 'High-converting blogs, social media scripts, and video hooks.',
            'description' => 'Accelerate your digital footprint. High-converting shortform video edits (CapCut/Premiere), copywriting, and content pipelines for socials.',
            'tools' => ['Adobe Premiere', 'CapCut Pro', 'Canva Pro', 'Photoshop', 'Submagic', 'ChatGPT Copywriting'],
            'process' => [
                ['step' => '01', 'title' => 'Script & Strategy', 'desc' => 'Hook writing and topic selection based on trends.'],
                ['step' => '02', 'title' => 'Video Editing', 'desc' => 'Adding dynamic text, visual effects, and sound design.'],
                ['step' => '03', 'title' => 'Asset packaging', 'desc' => 'Designing thumb-stopping cover graphic elements.'],
                ['step' => '04', 'title' => 'Optimization', 'desc' => 'Writing captions, hashtags, and keywords.']
            ],
            'packages' => [
                'basic' => [
                    'name' => 'Starter Video Pack',
                    'price' => '$199',
                    'delivery' => '5 Days',
                    'revisions' => '2 Revisions',
                    'desc' => '3 edited high-quality shortform videos (Reels/Shorts) with captions and hooks.',
                    'features' => ['3 Shortform Video Edits', 'Dynamic Captions & Sound FX', 'Title/Hook Writing', 'CapCut templates handoff', '5 Days Support']
                ],
                'standard' => [
                    'name' => 'Growth Content retainer',
                    'price' => '$599',
                    'delivery' => 'Monthly',
                    'revisions' => 'Ongoing',
                    'desc' => '10 edited shortform videos per month, content planning calendar, and cover designs.',
                    'features' => ['10 Shortform Edits / month', 'Monthly Topic/Script Call', '10 Thumbnail Designs', 'Caption & Hashtag Packs', 'Slack Collaboration Support']
                ],
                'premium' => [
                    'name' => 'Full Brand Authority',
                    'price' => '$1,199',
                    'delivery' => 'Monthly',
                    'revisions' => 'Ongoing',
                    'desc' => 'Complete brand management: 20 shortform videos, 2 longform YouTube edits, and 5 LinkedIn graphics.',
                    'features' => ['20 Shortform Edits / month', '2 Longform YT Edits / month', '5 LinkedIn Graphics & Copy', 'Full Strategy & Analytics Dashboard', 'Priority Phone Support']
                ]
            ],
            'faqs' => [
                ['q' => 'What files do I need to send you?', 'a' => 'You will need to provide raw footage and script briefs. I will handle editing, sound design, hooks, and formatting.'],
                ['q' => 'What editing programs do you use?', 'a' => 'I use Adobe Premiere Pro for longform assets, and CapCut Pro + Photoshop for shortform reels and thumbnail covers.']
            ],
            'is_featured' => 0,
            'sort_order' => 4
        ],
        'website-optimization' => [
            'title' => 'Performance Optimization',
            'icon' => 'Zap',
            'color' => 'var(--clr-secondary)',
            'short_desc' => 'Core Web Vitals, TTFB fixes, and speed scores above 95.',
            'description' => 'Pass Googles Core Web Vitals. Reduce LCP, TTFB, and fix Cumulative Layout Shift parameters.',
            'tools' => ['GTmetrix', 'PageSpeed Insights', 'Web Dev Tools', 'WP Rocket / LSCache', 'Cloudflare CDN', 'TinyPNG API'],
            'process' => [
                ['step' => '01', 'title' => 'Speed Diagnostics', 'desc' => 'Assess LCP, FID, and CLS performance parameters.'],
                ['step' => '02', 'title' => 'Resource Minification', 'desc' => 'Defer blocking scripts and minify CSS/JS.'],
                ['step' => '03', 'title' => 'Media Compression', 'desc' => 'Convert media assets to WebP and configure CDN.'],
                ['step' => '04', 'title' => 'Caching Audits', 'desc' => 'Verify browser caching and database cleanups.']
            ],
            'packages' => [
                'basic' => [
                    'name' => 'Speed Audit & Fix',
                    'price' => '$149',
                    'delivery' => '3 Days',
                    'revisions' => 'Unlimited',
                    'desc' => 'Essential optimizations to pass Core Web Vitals on a single landing page or simple site.',
                    'features' => ['PageSpeed Diagnostic Report', 'Image WebP Compression', 'CSS/JS Deferral Setup', 'Cache Rules Setup', '3 Days Support']
                ],
                'standard' => [
                    'name' => 'Full Optimization',
                    'price' => '$299',
                    'delivery' => '5 Days',
                    'revisions' => 'Unlimited',
                    'desc' => 'Complete technical optimization for a site with up to 10 pages, including database cleanup and CDN setup.',
                    'features' => ['Core Web Vitals Pass Guarantee', 'Database Optimization & Cleanup', 'Cloudflare CDN Configuration', 'Lazy Loading & Script Deferral', '15 Days Support']
                ],
                'premium' => [
                    'name' => 'Enterprise Optimization',
                    'price' => '$599',
                    'delivery' => '7 Days',
                    'revisions' => 'Unlimited',
                    'desc' => 'Speed tuning for complex sites (WooCommerce or custom React portals) with server diagnostics.',
                    'features' => ['WooCommerce Checkout Speed Audit', 'Server Response Diagnostics (TTFB)', 'Critical CSS Path Generation', 'Ongoing Monitoring (30 days)', '30 Days Priority Support']
                ]
            ],
            'faqs' => [
                ['q' => 'Do you guarantee a 90+ PageSpeed score?', 'a' => 'Yes, for most websites, I guarantee passing Core Web Vitals (90+ score on desktop, and green markers on mobile) unless limited by poor hosting.'],
                ['q' => 'Will this optimization break my site layout?', 'a' => 'No. I perform optimization in a staging clone first, test scripts, and deploy to live only after testing layout features.']
            ],
            'is_featured' => 0,
            'sort_order' => 5
        ]
    ];

    foreach ($defaultServices as $slug => $data) {
        // Check if exists
        $chk = $pdo->prepare("SELECT id FROM `services` WHERE `slug` = ?");
        $chk->execute([$slug]);
        $row = $chk->fetch();

        if ($row) {
            echo "Updating service details for '$slug'...\n";
            $stmt = $pdo->prepare("
                UPDATE `services` 
                SET `title` = ?, `icon` = ?, `color` = ?, `short_desc` = ?, `description` = ?, 
                    `tools` = ?, `process` = ?, `packages` = ?, `faqs` = ?, `is_featured` = ?, `sort_order` = ?
                WHERE `id` = ?
            ");
            $stmt->execute([
                $data['title'],
                $data['icon'],
                $data['color'],
                $data['short_desc'],
                $data['description'],
                json_encode($data['tools']),
                json_encode($data['process']),
                json_encode($data['packages']),
                json_encode($data['faqs']),
                $data['is_featured'],
                $data['sort_order'],
                $row['id']
            ]);
        } else {
            echo "Inserting new service '$slug'...\n";
            $stmt = $pdo->prepare("
                INSERT INTO `services` (`title`, `slug`, `icon`, `color`, `short_desc`, `description`, `tools`, `process`, `packages`, `faqs`, `is_featured`, `sort_order`, `status`)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'active')
            ");
            $stmt->execute([
                $data['title'],
                $slug,
                $data['icon'],
                $data['color'],
                $data['short_desc'],
                $data['description'],
                json_encode($data['tools']),
                json_encode($data['process']),
                json_encode($data['packages']),
                json_encode($data['faqs']),
                $data['is_featured'],
                $data['sort_order']
            ]);
        }
    }
    
    // 3. Update skills table name
    echo "Updating skills in database...\n";
    $pdo->exec("UPDATE `skills` SET `name` = 'Full SEO' WHERE `name` = 'Technical SEO'");

    echo "Database sync completed successfully!\n";
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
