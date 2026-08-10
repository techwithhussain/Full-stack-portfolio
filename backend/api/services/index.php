<?php
/**
 * Services API
 *
 * GET    /api/services/index.php              → list (public/admin)
 * GET    /api/services/index.php?slug=xxx     → single by slug (public)
 * GET    /api/services/index.php?id=N         → single by id (admin/public)
 * POST   /api/services/index.php              → create (admin)
 * PUT    /api/services/index.php?id=N         → update (admin)
 * DELETE /api/services/index.php?id=N         → delete (admin)
 */

require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../config/jwt.php';

$pdo    = Database::getInstance();
$method = $_SERVER['REQUEST_METHOD'];

// ── GET ──────────────────────────────────────────────────────
if ($method === 'GET') {
    $jsonFields = ['tools', 'process', 'packages', 'faqs'];

    if (!empty($_GET['slug'])) {
        // Single service by slug
        $stmt = $pdo->prepare("SELECT * FROM services WHERE slug = ? LIMIT 1");
        $stmt->execute([sanitize($_GET['slug'])]);
        $service = $stmt->fetch();
        if (!$service) error('Service not found', 404);
        success(decode_json_fields($service, $jsonFields));
    }

    if (!empty($_GET['id'])) {
        // Single service by ID
        $stmt = $pdo->prepare("SELECT * FROM services WHERE id = ? LIMIT 1");
        $stmt->execute([(int)$_GET['id']]);
        $service = $stmt->fetch();
        if (!$service) error('Service not found', 404);
        success(decode_json_fields($service, $jsonFields));
    }

    // List services
    $pag = get_pagination();
    $where = "status = 'active'";
    $params = [];

    if (!empty($_GET['status']) && $_GET['status'] === 'all') {
        $where = "1=1";
    }
    if (!empty($_GET['featured'])) {
        $where .= " AND is_featured = 1";
    }

    $count = $pdo->prepare("SELECT COUNT(*) FROM services WHERE $where");
    $count->execute($params);
    $total = (int)$count->fetchColumn();

    $params[] = $pag['limit'];
    $params[] = $pag['offset'];
    
    $stmt = $pdo->prepare("SELECT * FROM services WHERE $where ORDER BY sort_order ASC, created_at DESC LIMIT ? OFFSET ?");
    $stmt->execute($params);
    $rows = array_map(fn($r) => decode_json_fields($r, $jsonFields), $stmt->fetchAll());

    success(['items' => $rows, 'pagination' => pagination_meta($total, $pag['page'], $pag['limit'])]);
}

// ── POST (Create) ─────────────────────────────────────────────
if ($method === 'POST') {
    $auth = require_auth();
    $body = get_body();

    $required = ['title', 'slug'];
    foreach ($required as $field) {
        if (empty($body[$field])) error("Field '$field' is required.", 422);
    }

    $slug = sanitize($body['slug']);
    // Check slug uniqueness
    $exists = $pdo->prepare("SELECT id FROM services WHERE slug = ? LIMIT 1");
    $exists->execute([$slug]);
    if ($exists->fetch()) error('A service with this slug already exists.', 409);

    $stmt = $pdo->prepare("
        INSERT INTO services (title, slug, icon, color, short_desc, description, tools, process, packages, faqs, is_featured, sort_order, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ");
    
    $stmt->execute([
        sanitize($body['title']),
        $slug,
        sanitize($body['icon'] ?? 'Code'),
        sanitize($body['color'] ?? 'var(--clr-primary)'),
        sanitize($body['short_desc'] ?? ''),
        $body['description'] ?? '',
        json_encode($body['tools'] ?? []),
        json_encode($body['process'] ?? []),
        json_encode($body['packages'] ?? new stdClass()),
        json_encode($body['faqs'] ?? []),
        (int)($body['is_featured'] ?? 0),
        (int)($body['sort_order'] ?? 0),
        in_array($body['status'] ?? '', ['active', 'inactive']) ? $body['status'] : 'active',
    ]);

    log_activity($pdo, $auth['id'], 'create_service', 'services', (int)$pdo->lastInsertId());
    success(['id' => (int)$pdo->lastInsertId()], 'Service created', 201);
}

// ── PUT (Update) ──────────────────────────────────────────────
if ($method === 'PUT') {
    $auth = require_auth();
    $id   = (int)($_GET['id'] ?? 0);
    if (!$id) error('Service ID is required.', 422);

    $body = get_body();
    $fields = [];
    $params = [];

    $updatable = ['title', 'slug', 'icon', 'color', 'short_desc', 'description', 'is_featured', 'sort_order', 'status'];
    foreach ($updatable as $f) {
        if (array_key_exists($f, $body)) {
            $fields[]  = "`$f` = ?";
            $params[]  = in_array($f, ['title', 'slug', 'icon', 'color', 'short_desc', 'status'])
                ? sanitize((string)$body[$f])
                : $body[$f];
        }
    }
    
    foreach (['tools', 'process', 'packages', 'faqs'] as $jsonField) {
        if (array_key_exists($jsonField, $body)) {
            $fields[]  = "`$jsonField` = ?";
            $params[]  = json_encode($body[$jsonField]);
        }
    }

    if (empty($fields)) error('No fields to update.', 422);

    $params[] = $id;
    $pdo->prepare("UPDATE services SET " . implode(', ', $fields) . " WHERE id = ?")->execute($params);
    log_activity($pdo, $auth['id'], 'update_service', 'services', $id);
    success(null, 'Service updated');
}

// ── DELETE ────────────────────────────────────────────────────
if ($method === 'DELETE') {
    $auth = require_auth();
    $id   = (int)($_GET['id'] ?? 0);
    if (!$id) error('Service ID is required.', 422);

    $pdo->prepare("DELETE FROM services WHERE id = ?")->execute([$id]);
    log_activity($pdo, $auth['id'], 'delete_service', 'services', $id);
    success(null, 'Service deleted');
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
