<?php
/**
 * CORS + Request bootstrapper
 * Included at top of every API endpoint
 */

// â”€â”€ CORS headers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
$allowed_origins = [
    'https://techwithhussain.online',
    'http://localhost:3000',   // dev
    'http://localhost:5173',   // vite alt port
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowed_origins, true)) {
    header("Access-Control-Allow-Origin: $origin");
}

header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: Content-Type, X-Requested-With, X-CSRF-Token');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: SAMEORIGIN');
header('X-XSS-Protection: 1; mode=block');

// Handle pre-flight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// â”€â”€ Helpers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

/**
 * Return JSON success response
 */
function success(mixed $data = null, string $message = 'OK', int $code = 200): never
{
    http_response_code($code);
    echo json_encode(['success' => true, 'message' => $message, 'data' => $data]);
    exit;
}

/**
 * Return JSON error response
 */
function error(string $message = 'Error', int $code = 400, mixed $errors = null): never
{
    http_response_code($code);
    echo json_encode(['success' => false, 'message' => $message, 'errors' => $errors]);
    exit;
}

/**
 * Get JSON body from request
 */
function get_body(): array
{
    $raw = file_get_contents('php://input');
    return json_decode($raw, true) ?? [];
}

/**
 * Basic sanitize (strip tags, trim)
 */
function sanitize(string $val): string
{
    return trim(strip_tags($val));
}

/**
 * Validate email
 */
function valid_email(string $email): bool
{
    return (bool) filter_var($email, FILTER_VALIDATE_EMAIL);
}

/**
 * Pagination helper
 */
function get_pagination(): array
{
    $page  = max(1, (int)($_GET['page'] ?? 1));
    $limit = min(50, max(1, (int)($_GET['limit'] ?? 10)));
    return [
        'page'   => $page,
        'limit'  => $limit,
        'offset' => ($page - 1) * $limit,
    ];
}

/**
 * Build pagination meta
 */
function pagination_meta(int $total, int $page, int $limit): array
{
    return [
        'total'        => $total,
        'page'         => $page,
        'limit'        => $limit,
        'total_pages'  => (int) ceil($total / $limit),
        'has_next'     => ($page * $limit) < $total,
    ];
}

/**
 * Method guard â€” only allow specified HTTP method
 */
function only_method(string ...$methods): void
{
    if (!in_array($_SERVER['REQUEST_METHOD'], $methods, true)) {
        error('Method Not Allowed', 405);
    }
}

/**
 * Get client IP (proxy-aware)
 */
function get_ip(): string
{
    return $_SERVER['HTTP_X_FORWARDED_FOR']
        ?? $_SERVER['HTTP_CLIENT_IP']
        ?? $_SERVER['REMOTE_ADDR']
        ?? 'unknown';
}
