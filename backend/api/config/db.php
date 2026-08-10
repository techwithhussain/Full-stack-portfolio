<?php
/**
 * Database connection (PDO + singleton)
 * Hostinger MySQL 8.0
 */

// Helper to load .env variables if .env file exists
function load_env_file() {
    $paths = [
        __DIR__ . '/../../../.env', // Local Workspace Root
        __DIR__ . '/../../.env',    // Production Root (zip root)
        __DIR__ . '/../.env',       // API directory
        __DIR__ . '/env',           // Config directory
    ];
    foreach ($paths as $path) {
        if (file_exists($path)) {
            $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
            foreach ($lines as $line) {
                $line = trim($line);
                // Skip comments or empty lines
                if (empty($line) || strpos($line, '#') === 0) {
                    continue;
                }
                
                // Split by first equals sign
                $parts = explode('=', $line, 2);
                if (count($parts) === 2) {
                    $key = trim($parts[0]);
                    $val = trim($parts[1]);
                    
                    // Strip enclosing quotes if present
                    $firstChar = substr($val, 0, 1);
                    $lastChar = substr($val, -1);
                    if (($firstChar === '"' && $lastChar === '"') || ($firstChar === "'" && $lastChar === "'")) {
                        $val = substr($val, 1, -1);
                    }
                    
                    if (!array_key_exists($key, $_ENV)) {
                        $_ENV[$key] = $val;
                        putenv("$key=$val");
                    }
                }
            }
            break;
        }
    }
}

// Load environment variables
load_env_file();

// Detect configuration and define constants
define('DB_HOST',    getenv('DB_HOST')    ?: 'localhost');
define('DB_NAME',    getenv('DB_NAME')    ?: 'u180848400_TechPort');
define('DB_USER',    getenv('DB_USER')    ?: 'u180848400_techport');
define('DB_PASS',    getenv('DB_PASS') !== false ? getenv('DB_PASS') : 'Zakir124@.');
define('DB_CHARSET', getenv('DB_CHARSET') ?: 'utf8mb4');

class Database
{
    private static ?PDO $instance = null;

    public static function getInstance(): PDO
    {
        if (self::$instance === null) {
            $dsn = sprintf(
                'mysql:host=%s;dbname=%s;charset=%s',
                DB_HOST, DB_NAME, DB_CHARSET
            );

            try {
                self::$instance = new PDO($dsn, DB_USER, DB_PASS, [
                    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES   => false,
                    PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci",
                ]);
            } catch (PDOException $e) {
                // Never expose DB errors to client
                http_response_code(500);
                header('Content-Type: application/json');
                echo json_encode(['success' => false, 'message' => 'Database connection failed.']);
                exit;
            }
        }
        return self::$instance;
    }
}
