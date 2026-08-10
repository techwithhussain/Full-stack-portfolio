<?php
/**
 * Media Upload API
 * POST /api/upload/index.php   → upload file (admin only)
 * GET  /api/upload/index.php   → list media library (admin only)
 * DELETE /api/upload/index.php?id=N → delete (admin only)
 *
 * Security:
 *  - Admin-auth required
 *  - Whitelist MIME types
 *  - Rename file to random hash
 *  - uploads/ directory has PHP execution blocked via .htaccess
 *  - Max file size: 5MB
 */

require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../config/jwt.php';

$auth   = require_auth();
$pdo    = Database::getInstance();
$method = $_SERVER['REQUEST_METHOD'];

// ── Allowed MIME types ────────────────────────────────────────
const ALLOWED_MIME = [
    'image/webp',
    'application/pdf',
];
const MAX_SIZE     = 5 * 1024 * 1024; // 5MB
const UPLOAD_DIR   = __DIR__ . '/../../uploads/';
const UPLOAD_URL   = '/uploads/'; // relative base URL

// ── GET: List media ───────────────────────────────────────────
if ($method === 'GET') {
    $pag = get_pagination();
    $folder  = sanitize($_GET['folder'] ?? '');
    $where   = '';
    $params  = [];
    if ($folder) { $where = "WHERE folder = ?"; $params[] = $folder; }

    $total = (int)$pdo->prepare("SELECT COUNT(*) FROM media_library $where")->execute($params) ? $pdo->query("SELECT COUNT(*) FROM media_library $where")->fetchColumn() : 0;
    $params[] = $pag['limit']; $params[] = $pag['offset'];
    $stmt = $pdo->prepare("SELECT * FROM media_library $where ORDER BY created_at DESC LIMIT ? OFFSET ?");
    $stmt->execute($params);
    success(['items' => $stmt->fetchAll(), 'pagination' => pagination_meta($total, $pag['page'], $pag['limit'])]);
}

// ── POST: Upload ──────────────────────────────────────────────
if ($method === 'POST') {
    if (empty($_FILES['file'])) error('No file provided.', 422);

    $file      = $_FILES['file'];
    $folder    = sanitize($_POST['folder'] ?? 'general');
    $altText   = sanitize($_POST['alt_text'] ?? '');

    // Validate size
    if ($file['size'] > MAX_SIZE) error('File too large. Maximum size is 5MB.', 413);

    // Validate MIME (finfo for security — do NOT trust $_FILES['type'])
    $finfo    = new finfo(FILEINFO_MIME_TYPE);
    $mimeType = $finfo->file($file['tmp_name']);
    if (!in_array($mimeType, ALLOWED_MIME, true)) {
        error('Invalid file type. Only WebP images (.webp) and PDF documents (.pdf) are allowed.', 415);
    }

    // Extension map
    $extMap = [
        'image/webp' => 'webp',
        'application/pdf' => 'pdf',
    ];
    $ext  = $extMap[$mimeType] ?? 'bin';
    $hash = bin2hex(random_bytes(16));
    $filename = $hash . '.' . $ext;

    // Create folder
    $destDir = UPLOAD_DIR . $folder . '/';
    if (!is_dir($destDir)) mkdir($destDir, 0755, true);

    $destPath = $destDir . $filename;
    if (!move_uploaded_file($file['tmp_name'], $destPath)) {
        error('Upload failed. Could not save file.', 500);
    }

    // Dimensions (images only)
    $width = $height = null;
    if (str_starts_with($mimeType, 'image/') && $mimeType !== 'image/svg+xml') {
        $dims   = @getimagesize($destPath);
        $width  = $dims[0] ?? null;
        $height = $dims[1] ?? null;
    }

    $url = UPLOAD_URL . $folder . '/' . $filename;

    $stmt = $pdo->prepare("
        INSERT INTO media_library (filename, original_name, file_type, file_size, width, height, url, folder, alt_text, uploaded_by)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ");
    $stmt->execute([
        $filename, $file['name'], $mimeType, $file['size'],
        $width, $height, $url, $folder, $altText, $auth['id']
    ]);

    success([
        'id'  => (int)$pdo->lastInsertId(),
        'url' => $url,
        'filename' => $filename,
        'type' => $mimeType,
        'size' => $file['size'],
    ], 'File uploaded successfully', 201);
}

// ── DELETE: Remove media ──────────────────────────────────────
if ($method === 'DELETE') {
    $id = (int)($_GET['id'] ?? 0);
    if (!$id) error('Media ID required.', 422);

    $stmt = $pdo->prepare("SELECT filename, folder FROM media_library WHERE id = ? LIMIT 1");
    $stmt->execute([$id]);
    $media = $stmt->fetch();
    if (!$media) error('Media not found.', 404);

    // Delete physical file
    $path = UPLOAD_DIR . $media['folder'] . '/' . $media['filename'];
    if (file_exists($path)) unlink($path);

    $pdo->prepare("DELETE FROM media_library WHERE id = ?")->execute([$id]);
    success(null, 'Media deleted');
}
