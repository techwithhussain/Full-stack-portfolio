<?php
/**
 * Newsletter Subscribe API
 * POST /api/newsletter/index.php
 *
 * Saves subscriber to DB and emails instant lead notification to lonezakir124@gmail.com
 */

require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/db.php';

only_method('POST');

$body   = get_body();
$email  = sanitize($body['email'] ?? $_POST['email'] ?? '');
$name   = sanitize($body['name'] ?? $_POST['name'] ?? '');
$source = sanitize($body['source'] ?? $_POST['source'] ?? 'footer');

if (!valid_email($email)) error('A valid email address is required.', 422);

$ownerEmail = 'lonezakir124@gmail.com';
$subId = 0;
$isResubscribe = false;

try {
    $pdo = Database::getInstance();
    $pdo->exec("CREATE TABLE IF NOT EXISTS `newsletter_subscribers` (
        `id` INT AUTO_INCREMENT PRIMARY KEY,
        `email` VARCHAR(150) NOT NULL UNIQUE,
        `name` VARCHAR(100) DEFAULT NULL,
        `status` ENUM('active','unsubscribed') DEFAULT 'active',
        `source` VARCHAR(50) DEFAULT 'footer',
        `verify_token` VARCHAR(64) DEFAULT NULL,
        `subscribed_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
        `unsubscribed_at` DATETIME DEFAULT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;");

    $existing = $pdo->prepare("SELECT id, status FROM newsletter_subscribers WHERE email = ? LIMIT 1");
    $existing->execute([$email]);
    $sub = $existing->fetch();

    if ($sub) {
        if ($sub['status'] === 'active') {
            success(null, "You're already subscribed!");
        }
        $pdo->prepare("UPDATE newsletter_subscribers SET status = 'active', unsubscribed_at = NULL WHERE id = ?")->execute([$sub['id']]);
        $subId = $sub['id'];
        $isResubscribe = true;
    } else {
        $token = bin2hex(random_bytes(24));
        $pdo->prepare("INSERT INTO newsletter_subscribers (email, name, source, verify_token) VALUES (?, ?, ?, ?)")
            ->execute([$email, $name, $source, $token]);
        $subId = (int)$pdo->lastInsertId();
        $isResubscribe = false;
    }
} catch (\Exception $e) {
    error_log('Newsletter DB Error: ' . $e->getMessage());
}

// ── Send Email Alert to Owner ──
$statusText = $isResubscribe ? 'Re-Subscribed Subscriber' : 'New Newsletter Lead';
$emailSubject = "🎉 NEW SUBSCRIBER LEAD: $email";

$emailBodyHtml = "
<div style='font-family: Arial, sans-serif; max-width: 600px; padding: 24px; background: #0f0f17; color: #e2e8f0; border-radius: 12px;'>
  <h2 style='color: #00ff9d; margin-bottom: 8px;'>New Newsletter Subscriber!</h2>
  <p style='color: #94a3b8; font-size: 13px;'>Subscriber ID: #$subId | Type: $statusText</p>
  <table style='width: 100%; margin-top: 16px; border-collapse: collapse;'>
    <tr><td style='padding: 8px 0; color: #94a3b8; width: 130px;'>Subscriber Email:</td><td style='padding: 8px 0; color: #00ff9d;'><strong><a href='mailto:$email' style='color: #00ff9d;'>$email</a></strong></td></tr>
    " . ($name ? "<tr><td style='padding: 8px 0; color: #94a3b8;'>Name:</td><td style='padding: 8px 0; color: #e2e8f0;'>$name</td></tr>" : "") . "
    <tr><td style='padding: 8px 0; color: #94a3b8;'>Signup Source:</td><td style='padding: 8px 0; color: #e2e8f0; text-transform: uppercase;'>$source</td></tr>
  </table>
</div>
";

$emailSent = false;

if (file_exists(__DIR__ . '/../../../vendor/autoload.php')) {
    require_once __DIR__ . '/../../../vendor/autoload.php';
    try {
        $mail = new PHPMailer\PHPMailer\PHPMailer(true);
        $mail->isSMTP();
        $mail->Host       = 'smtp.hostinger.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'contact@techwithhussain.online';
        $mail->Password   = getenv('SMTP_PASSWORD') ?: '';
        $mail->SMTPSecure = PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port       = 465;
        $mail->CharSet    = 'UTF-8';

        $mail->setFrom('contact@techwithhussain.online', 'Tech With Hussain');
        $mail->addAddress($ownerEmail, 'Hussain Lone');
        $mail->addReplyTo($email, $name ?: $email);

        $mail->isHTML(true);
        $mail->Subject = $emailSubject;
        $mail->Body    = $emailBodyHtml;

        $mail->send();
        $emailSent = true;
    } catch (\Exception $e) {
        error_log('Mailer Error: ' . $e->getMessage());
    }
}

if (!$emailSent) {
    $headers  = "From: Tech With Hussain <noreply@techwithhussain.online>\r\n";
    $headers .= "Reply-To: " . ($name ? "$name <$email>" : $email) . "\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    @mail($ownerEmail, $emailSubject, $emailBodyHtml, $headers);
}

success(null, "Thank you for subscribing! You're all set.");
