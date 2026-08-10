<?php
/**
 * Blog Posts API
 *
 * GET    /api/blog/index.php                  → list (public)
 * GET    /api/blog/index.php?slug=xxx         → single (public + view count)
 * POST   /api/blog/index.php                  → create (admin)
 * PUT    /api/blog/index.php?id=N             → update (admin)
 * DELETE /api/blog/index.php?id=N             → delete (admin)
 */

require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../config/jwt.php';

$pdo    = Database::getInstance();
$method = $_SERVER['REQUEST_METHOD'];

// ── GET ──────────────────────────────────────────────────────
if ($method === 'GET') {
    if (!empty($_GET['slug'])) {
        $stmt = $pdo->prepare("
            SELECT p.*, 'Hussain Lone' AS author_name, '/profile.png' AS author_avatar
            FROM blog_posts p
            WHERE p.slug = ? AND p.status = 'published'
            LIMIT 1
        ");
        $stmt->execute([sanitize($_GET['slug'])]);
        $post = $stmt->fetch();
        if (!$post) error('Post not found', 404);

        // Increment views
        $pdo->prepare("UPDATE blog_posts SET views = views + 1 WHERE id = ?")->execute([$post['id']]);

        $post['tags'] = json_decode($post['tags'] ?? '[]', true) ?? [];
        success($post);
    }

    // List with pagination
    $pag = get_pagination();
    $auth = get_auth_payload();
    $where = "p.status = 'published'";
    if ($auth && isset($_GET['status']) && $_GET['status'] === 'all') {
        $where = "1=1";
    }
    $params = [];

    if (!empty($_GET['category'])) {
        $where .= " AND p.category = ?";
        $params[] = sanitize($_GET['category']);
    }
    if (!empty($_GET['featured'])) {
        $where .= " AND p.is_featured = 1";
    }
    if (!empty($_GET['search'])) {
        $where .= " AND MATCH(p.title, p.excerpt, p.content) AGAINST(? IN BOOLEAN MODE)";
        $params[] = sanitize($_GET['search']) . '*';
    }

    $count = $pdo->prepare("SELECT COUNT(*) FROM blog_posts p WHERE $where");
    $count->execute($params);
    $total = (int)$count->fetchColumn();

    $params[] = $pag['limit'];
    $params[] = $pag['offset'];
    $stmt = $pdo->prepare("
        SELECT p.id, p.title, p.slug, p.excerpt, p.thumbnail, p.category, p.tags, p.views, p.read_time, p.is_featured, p.published_at, p.status,
               'Hussain Lone' AS author_name
        FROM blog_posts p
        WHERE $where
        ORDER BY COALESCE(p.published_at, p.created_at) DESC
        LIMIT ? OFFSET ?
    ");
    $stmt->execute($params);
    $rows = $stmt->fetchAll();
    foreach ($rows as &$row) {
        $row['tags'] = json_decode($row['tags'] ?? '[]', true) ?? [];
    }

    success(['items' => $rows, 'pagination' => pagination_meta($total, $pag['page'], $pag['limit'])]);
}

// ── POST (Create) ─────────────────────────────────────────────
if ($method === 'POST') {
    $auth = require_auth();
    $body = get_body();

    foreach (['title', 'slug', 'content'] as $f) {
        if (empty($body[$f])) error("Field '$f' is required.", 422);
    }

    $slug = sanitize($body['slug']);
    $exists = $pdo->prepare("SELECT id FROM blog_posts WHERE slug = ? LIMIT 1");
    $exists->execute([$slug]);
    if ($exists->fetch()) error('A post with this slug already exists.', 409);

    // Auto-calculate read time (~200 wpm)
    $wordCount = str_word_count(strip_tags($body['content']));
    $readTime  = max(1, (int)ceil($wordCount / 200)) . ' min read';

    $stmt = $pdo->prepare("
        INSERT INTO blog_posts (title, slug, excerpt, content, thumbnail, category, tags, author_id, read_time, is_featured, meta_title, meta_desc, status, published_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ");
    $status    = in_array($body['status'] ?? '', ['published', 'draft', 'scheduled']) ? $body['status'] : 'draft';
    $published = ($status === 'published') ? date('Y-m-d H:i:s') : null;

    $stmt->execute([
        sanitize($body['title']),
        $slug,
        sanitize($body['excerpt'] ?? ''),
        $body['content'],
        sanitize($body['thumbnail'] ?? ''),
        sanitize($body['category'] ?? ''),
        json_encode($body['tags'] ?? []),
        $auth['id'],
        $readTime,
        (int)($body['is_featured'] ?? 0),
        sanitize($body['meta_title'] ?? ''),
        sanitize($body['meta_desc'] ?? ''),
        $status,
        $published,
    ]);

    $newId = (int)$pdo->lastInsertId();
    $pdo->prepare("INSERT INTO admin_activity_log (admin_id, action, entity, entity_id, ip_address) VALUES (?, 'create_post', 'blog_posts', ?, ?)")
        ->execute([$auth['id'], $newId, get_ip()]);
    success(['id' => $newId], 'Blog post created', 201);
}

// ── PUT (Update) ──────────────────────────────────────────────
if ($method === 'PUT') {
    $auth = require_auth();
    $id   = (int)($_GET['id'] ?? 0);
    if (!$id) error('Post ID is required.', 422);

    $body   = get_body();

    if (array_key_exists('slug', $body)) {
        $slug = sanitize($body['slug']);
        $exists = $pdo->prepare("SELECT id FROM blog_posts WHERE slug = ? AND id != ? LIMIT 1");
        $exists->execute([$slug, $id]);
        if ($exists->fetch()) error('A post with this slug already exists.', 409);
    }

    $fields = [];
    $params = [];

    $textFields = ['title', 'slug', 'excerpt', 'thumbnail', 'category', 'meta_title', 'meta_desc'];
    foreach ($textFields as $f) {
        if (array_key_exists($f, $body)) { $fields[] = "$f = ?"; $params[] = sanitize((string)$body[$f]); }
    }
    if (array_key_exists('content', $body)) { $fields[] = "content = ?"; $params[] = $body['content']; }
    if (array_key_exists('tags', $body))    { $fields[] = "tags = ?";    $params[] = json_encode($body['tags']); }
    if (array_key_exists('is_featured', $body)) { $fields[] = "is_featured = ?"; $params[] = (int)$body['is_featured']; }
    if (array_key_exists('status', $body)) {
        $status = in_array($body['status'], ['published', 'draft', 'scheduled']) ? $body['status'] : 'draft';
        $fields[] = "status = ?"; $params[] = $status;
        if ($status === 'published') { $fields[] = "published_at = COALESCE(published_at, NOW())"; }
    }

    if (empty($fields)) error('No fields to update.', 422);
    $params[] = $id;
    $pdo->prepare("UPDATE blog_posts SET " . implode(', ', $fields) . " WHERE id = ?")->execute($params);
    $pdo->prepare("INSERT INTO admin_activity_log (admin_id, action, entity, entity_id, ip_address) VALUES (?, 'update_post', 'blog_posts', ?, ?)")
        ->execute([$auth['id'], $id, get_ip()]);
    success(null, 'Blog post updated');
}

// ── DELETE ────────────────────────────────────────────────────
if ($method === 'DELETE') {
    $auth = require_auth();
    $id   = (int)($_GET['id'] ?? 0);
    if (!$id) error('Post ID is required.', 422);
    $pdo->prepare("DELETE FROM blog_posts WHERE id = ?")->execute([$id]);
    $pdo->prepare("INSERT INTO admin_activity_log (admin_id, action, entity, entity_id, ip_address) VALUES (?, 'delete_post', 'blog_posts', ?, ?)")
        ->execute([$auth['id'], $id, get_ip()]);
    success(null, 'Blog post deleted');
}
