<?php
/**
 * Projects API
 *
 * GET    /api/projects/index.php              → list (public)
 * GET    /api/projects/index.php?slug=xxx     → single by slug (public)
 * POST   /api/projects/index.php              → create (admin)
 * PUT    /api/projects/index.php?id=N         → update (admin)
 * DELETE /api/projects/index.php?id=N         → delete (admin)
 */

require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../config/jwt.php';

$pdo    = Database::getInstance();
$method = $_SERVER['REQUEST_METHOD'];

// Auto-create table and sync primary 3 projects if empty or outdated
try {
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS projects (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            slug VARCHAR(255) NOT NULL UNIQUE,
            excerpt TEXT,
            description TEXT,
            category VARCHAR(100) NOT NULL DEFAULT 'Web Development',
            technologies JSON,
            thumbnail VARCHAR(500),
            gallery JSON,
            live_url VARCHAR(500),
            github_url VARCHAR(500),
            case_study_url VARCHAR(500),
            results JSON,
            is_featured TINYINT(1) DEFAULT 1,
            sort_order INT DEFAULT 0,
            status ENUM('published', 'draft', 'archived') DEFAULT 'published',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    ");

    // Clean up old dummy rows if present
    $pdo->exec("DELETE FROM projects WHERE slug IN ('ai-chat-agent', 'bold-design-agency', 'ecommerce-store') OR title LIKE '%AI Chat%' OR title LIKE '%Bold Design%'");

    // Ensure WalnutWala exists/updated
    $chk1 = $pdo->prepare("SELECT id FROM projects WHERE slug = 'walnutwala' OR title LIKE '%Walnut%' LIMIT 1");
    $chk1->execute();
    if (!$chk1->fetch()) {
        $pdo->prepare("INSERT INTO projects (title, slug, excerpt, description, category, technologies, thumbnail, live_url, is_featured, sort_order, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1, 1, 'published')")
            ->execute([
                'WalnutWala — Kashmiri Walnuts & Organic Dry Fruits Store',
                'walnutwala',
                'Official E-Commerce store & SEO growth strategy for WalnutWala — Kashmir premier organic dry fruits & walnut brand.',
                'WalnutWala is Kashmir’s top organic dry fruits provider specializing in premium Kashmiri walnuts, almonds, saffron, and shilajit.',
                'WordPress',
                json_encode(['WordPress', 'WooCommerce', 'SEO Optimization', 'Google Ads']),
                '/walnuta.webp',
                'https://walnutwala.com/'
            ]);
    } else {
        $pdo->prepare("UPDATE projects SET thumbnail = '/walnuta.webp' WHERE slug = 'walnutwala' OR title LIKE '%Walnut%'")->execute();
    }

    // Ensure Guru Digital Advertising exists/updated
    $chk2 = $pdo->prepare("SELECT id FROM projects WHERE slug = 'guru-digital-advertising' OR (title LIKE '%Guru%' AND title NOT LIKE '%Gurukul%') LIMIT 1");
    $chk2->execute();
    if (!$chk2->fetch()) {
        $pdo->prepare("INSERT INTO projects (title, slug, excerpt, description, category, technologies, thumbnail, live_url, is_featured, sort_order, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1, 2, 'published')")
            ->execute([
                'Guru Digital Advertising — Top Digital Marketing & Web Agency',
                'guru-digital-advertising',
                'Official enterprise website & digital growth strategy for Guru Digital Advertising — Leading performance marketing & SEO agency.',
                'Guru Digital Advertising is a full-service digital agency delivering high-converting Meta & Google ad campaigns and enterprise web development.',
                'Web Development',
                json_encode(['React', 'PHP', 'Meta Ads', 'Google Ads', 'SEO Optimization']),
                '/guru.webp',
                'https://www.gurudigitaladvertising.com/'
            ]);
    } else {
        $pdo->prepare("UPDATE projects SET thumbnail = '/guru.webp' WHERE slug = 'guru-digital-advertising' OR (title LIKE '%Guru%' AND title NOT LIKE '%Gurukul%')")->execute();
    }

    // Ensure Gurukul Vidya Peeth exists/updated
    $chk3 = $pdo->prepare("SELECT id FROM projects WHERE slug = 'gurukul-vidya-peeth' OR title LIKE '%Gurukul%' LIMIT 1");
    $chk3->execute();
    if (!$chk3->fetch()) {
        $pdo->prepare("INSERT INTO projects (title, slug, excerpt, description, category, technologies, thumbnail, live_url, is_featured, sort_order, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1, 3, 'published')")
            ->execute([
                'Gurukul Vidya Peeth — Educational Institution & School Management Portal',
                'gurukul-vidya-peeth',
                'Official responsive website & digital enrollment portal for Gurukul Vidya Peeth school.',
                'Gurukul Vidya Peeth is a premier educational institution committed to modern academic excellence.',
                'WordPress',
                json_encode(['WordPress', 'SEO Optimization', 'Responsive UI']),
                '/school.webp',
                'https://www.gurukulvidyahpeeth.in/'
            ]);
    } else {
        $pdo->prepare("UPDATE projects SET thumbnail = '/school.webp' WHERE slug = 'gurukul-vidya-peeth' OR title LIKE '%Gurukul%'")->execute();
    }
} catch (Exception $e) {
    // Ignore DB setup errors quietly
}

// ── GET ──────────────────────────────────────────────────────
if ($method === 'GET') {
    if (!empty($_GET['slug'])) {
        // Single project
        $stmt = $pdo->prepare("SELECT * FROM projects WHERE slug = ? AND status = 'published' LIMIT 1");
        $stmt->execute([sanitize($_GET['slug'])]);
        $project = $stmt->fetch();
        if (!$project) error('Project not found', 404);
        success(decode_json_fields($project, ['technologies', 'gallery', 'results']));
    }

    // List projects
    $pag = get_pagination();
    $auth = get_auth_payload();
    $where = "status = 'published'";
    if ($auth && isset($_GET['status']) && $_GET['status'] === 'all') {
        $where = "1=1";
    }
    $params = [];

    if (!empty($_GET['category'])) {
        $where   .= " AND category = ?";
        $params[] = sanitize($_GET['category']);
    }
    if (!empty($_GET['featured'])) {
        $where   .= " AND is_featured = 1";
    }

    $count = $pdo->prepare("SELECT COUNT(*) FROM projects WHERE $where");
    $count->execute($params);
    $total = (int)$count->fetchColumn();

    $params[] = $pag['limit'];
    $params[] = $pag['offset'];
    $stmt = $pdo->prepare("SELECT * FROM projects WHERE $where ORDER BY sort_order ASC, created_at DESC LIMIT ? OFFSET ?");
    $stmt->execute($params);
    $rows = array_map(fn($r) => decode_json_fields($r, ['technologies', 'gallery', 'results']), $stmt->fetchAll());

    success(['items' => $rows, 'pagination' => pagination_meta($total, $pag['page'], $pag['limit'])]);
}

// ── POST (Create) ─────────────────────────────────────────────
if ($method === 'POST') {
    $auth = require_auth();
    $body = get_body();

    $required = ['title', 'slug', 'category'];
    foreach ($required as $field) {
        if (empty($body[$field])) error("Field '$field' is required.", 422);
    }

    $slug = sanitize($body['slug']);
    // Check slug uniqueness
    $exists = $pdo->prepare("SELECT id FROM projects WHERE slug = ? LIMIT 1");
    $exists->execute([$slug]);
    if ($exists->fetch()) error('A project with this slug already exists.', 409);

    $stmt = $pdo->prepare("
        INSERT INTO projects (title, slug, excerpt, description, category, technologies, thumbnail, gallery, live_url, github_url, case_study_url, results, is_featured, sort_order, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ");
    $stmt->execute([
        sanitize($body['title']),
        $slug,
        sanitize($body['excerpt'] ?? ''),
        $body['description'] ?? '',
        sanitize($body['category']),
        json_encode($body['technologies'] ?? []),
        sanitize($body['thumbnail'] ?? ''),
        json_encode($body['gallery'] ?? []),
        sanitize($body['live_url'] ?? ''),
        sanitize($body['github_url'] ?? ''),
        sanitize($body['case_study_url'] ?? ''),
        json_encode($body['results'] ?? []),
        (int)($body['is_featured'] ?? 0),
        (int)($body['sort_order'] ?? 0),
        in_array($body['status'] ?? '', ['published', 'draft', 'archived']) ? $body['status'] : 'draft',
    ]);

    log_activity($pdo, $auth['id'], 'create_project', 'projects', (int)$pdo->lastInsertId());
    success(['id' => (int)$pdo->lastInsertId()], 'Project created', 201);
}

// ── PUT (Update) ──────────────────────────────────────────────
if ($method === 'PUT') {
    $auth = require_auth();
    $id   = (int)($_GET['id'] ?? 0);
    if (!$id) error('Project ID is required.', 422);

    $body = get_body();
    
    if (array_key_exists('slug', $body)) {
        $slug = sanitize($body['slug']);
        $exists = $pdo->prepare("SELECT id FROM projects WHERE slug = ? AND id != ? LIMIT 1");
        $exists->execute([$slug, $id]);
        if ($exists->fetch()) error('A project with this slug already exists.', 409);
    }

    $fields = [];
    $params = [];

    $updatable = ['title', 'slug', 'excerpt', 'description', 'category', 'thumbnail', 'live_url', 'github_url', 'case_study_url', 'is_featured', 'sort_order', 'status'];
    foreach ($updatable as $f) {
        if (array_key_exists($f, $body)) {
            $fields[]  = "$f = ?";
            $params[]  = in_array($f, ['title', 'slug', 'excerpt', 'category', 'thumbnail', 'live_url', 'github_url', 'case_study_url'])
                ? sanitize((string)$body[$f])
                : $body[$f];
        }
    }
    foreach (['technologies', 'gallery', 'results'] as $jsonField) {
        if (array_key_exists($jsonField, $body)) {
            $fields[]  = "$jsonField = ?";
            $params[]  = json_encode($body[$jsonField]);
        }
    }

    if (empty($fields)) error('No fields to update.', 422);

    $params[] = $id;
    $pdo->prepare("UPDATE projects SET " . implode(', ', $fields) . " WHERE id = ?")->execute($params);
    log_activity($pdo, $auth['id'], 'update_project', 'projects', $id);
    success(null, 'Project updated');
}

// ── DELETE ────────────────────────────────────────────────────
if ($method === 'DELETE') {
    $auth = require_auth();
    $id   = (int)($_GET['id'] ?? 0);
    if (!$id) error('Project ID is required.', 422);

    $pdo->prepare("DELETE FROM projects WHERE id = ?")->execute([$id]);
    log_activity($pdo, $auth['id'], 'delete_project', 'projects', $id);
    success(null, 'Project deleted');
}

// ── Helpers ───────────────────────────────────────────────────
function decode_json_fields(array $row, array $fields): array
{
    foreach ($fields as $f) {
        if (isset($row[$f])) {
            $row[$f] = json_decode($row[$f], true) ?? [];
        }
    }
    return $row;
}

function log_activity(PDO $pdo, int $admin_id, string $action, string $entity, int $entity_id): void
{
    $pdo->prepare("INSERT INTO admin_activity_log (admin_id, action, entity, entity_id, ip_address) VALUES (?, ?, ?, ?, ?)")
        ->execute([$admin_id, $action, $entity, $entity_id, get_ip()]);
}
