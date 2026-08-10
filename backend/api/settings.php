<?php
/**
 * Public Settings API
 * GET  /api/settings.php          Ã¢â€ â€™ get all public settings
 */

require_once __DIR__ . '/config/cors.php';
require_once __DIR__ . '/config/db.php';

$pdo    = Database::getInstance();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $rows = $pdo->query("SELECT setting_key, setting_val FROM site_settings WHERE setting_key NOT LIKE 'smtp_%' ORDER BY id ASC")->fetchAll();
    $settings = [];
    foreach ($rows as $row) {
        $settings[$row['setting_key']] = $row['setting_val'];
    }
    success($settings);
} else {
    error('Method Not Allowed', 405);
}
