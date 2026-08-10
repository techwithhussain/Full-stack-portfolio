<?php
/**
 * Testimonials API (public GET / admin CRUD)
 */

require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../config/jwt.php';

$pdo    = Database::getInstance();
$method = $_SERVER['REQUEST_METHOD'];

// ── GET ──────────────────────────────────────────────────────
if ($method === 'GET') {
    $where  = "status = 'approved'";
    $params = [];
    if (!empty($_GET['featured'])) { $where .= " AND is_featured = 1"; }

    $pag = get_pagination();
    $total = (int)$pdo->prepare("SELECT COUNT(*) FROM testimonials WHERE $where")->execute($params) ? $pdo->query("SELECT COUNT(*) FROM testimonials WHERE $where")->fetchColumn() : 0;
    $params[] = $pag['limit']; $params[] = $pag['offset'];
    $stmt = $pdo->prepare("SELECT * FROM testimonials WHERE $where ORDER BY sort_order ASC LIMIT ? OFFSET ?");
    $stmt->execute($params);
    success(['items' => $stmt->fetchAll(), 'pagination' => pagination_meta($total, $pag['page'], $pag['limit'])]);
}

// ── POST ──────────────────────────────────────────────────────
if ($method === 'POST') {
    $auth = require_auth();
    $body = get_body();
    if (empty($body['name']) || empty($body['content'])) error('Name and content required.', 422);

    $stmt = $pdo->prepare("INSERT INTO testimonials (name, designation, company, avatar, content, rating, project_type, video_url, is_featured, sort_order, status) VALUES (?,?,?,?,?,?,?,?,?,?,?)");
    $stmt->execute([
        sanitize($body['name']), sanitize($body['designation'] ?? ''),
        sanitize($body['company'] ?? ''), sanitize($body['avatar'] ?? ''),
        sanitize($body['content']), (int)($body['rating'] ?? 5),
        sanitize($body['project_type'] ?? ''), sanitize($body['video_url'] ?? ''),
        (int)($body['is_featured'] ?? 0), (int)($body['sort_order'] ?? 0),
        in_array($body['status'] ?? '', ['approved','pending','rejected']) ? $body['status'] : 'pending',
    ]);
    success(['id' => (int)$pdo->lastInsertId()], 'Testimonial created', 201);
}

// ── PUT ───────────────────────────────────────────────────────
if ($method === 'PUT') {
    $auth = require_auth();
    $id   = (int)($_GET['id'] ?? 0);
    if (!$id) error('ID required.', 422);
    $body = get_body();
    $f = []; $p = [];
    foreach (['name','designation','company','avatar','content','project_type','video_url'] as $field) {
        if (array_key_exists($field, $body)) { $f[] = "$field = ?"; $p[] = sanitize((string)$body[$field]); }
    }
    foreach (['rating','is_featured','sort_order'] as $field) {
        if (array_key_exists($field, $body)) { $f[] = "$field = ?"; $p[] = (int)$body[$field]; }
    }
    if (array_key_exists('status', $body)) {
        $f[] = "status = ?"; $p[] = in_array($body['status'], ['approved','pending','rejected']) ? $body['status'] : 'pending';
    }
    if (empty($f)) error('Nothing to update.', 422);
    $p[] = $id;
    $pdo->prepare("UPDATE testimonials SET " . implode(', ', $f) . " WHERE id = ?")->execute($p);
    success(null, 'Testimonial updated');
}

// ── DELETE ────────────────────────────────────────────────────
if ($method === 'DELETE') {
    require_auth();
    $id = (int)($_GET['id'] ?? 0);
    if (!$id) error('ID required.', 422);
    $pdo->prepare("DELETE FROM testimonials WHERE id = ?")->execute([$id]);
    success(null, 'Testimonial deleted');
}
