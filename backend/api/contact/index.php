<?php
/**
 * Contact Form API
 * POST /api/contact/index.php
 *
 * Saves message to DB & sends lead notification email directly to lonezakir124@gmail.com
 */

require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/db.php';

only_method('POST');

$body = get_body();

// ── Validate Inputs ──────────────────────────────────────────
$name    = sanitize($body['name'] ?? $_POST['name'] ?? '');
$email   = sanitize($body['email'] ?? $_POST['email'] ?? '');
$phone   = sanitize($body['phone'] ?? $_POST['phone'] ?? '');
$subject = sanitize($body['subject'] ?? $_POST['subject'] ?? 'New Contact Form Submission');
$message = sanitize($body['message'] ?? $_POST['message'] ?? '');
$service = sanitize($body['service_type'] ?? $_POST['service_type'] ?? $body['service'] ?? $_POST['service'] ?? '');
$budget  = sanitize($body['budget'] ?? $_POST['budget'] ?? '');

if (!$name) error('Name is required.', 422);
if (!valid_email($email)) error('A valid email address is required.', 422);
if (!$phone) error('Phone number is required.', 422);
if (!$message) error('Message is required.', 422);

// ── Auto-Ensure DB Table Exists ──────────────────────────────
$msgId = 0;
try {
    $pdo = Database::getInstance();
    $pdo->exec("CREATE TABLE IF NOT EXISTS `contact_messages` (
        `id` INT AUTO_INCREMENT PRIMARY KEY,
        `name` VARCHAR(100) NOT NULL,
        `email` VARCHAR(150) NOT NULL,
        `phone` VARCHAR(50) DEFAULT NULL,
        `subject` VARCHAR(200) DEFAULT NULL,
        `message` TEXT NOT NULL,
        `service_type` VARCHAR(100) DEFAULT NULL,
        `budget` VARCHAR(100) DEFAULT NULL,
        `source` VARCHAR(50) DEFAULT 'contact_form',
        `ip_address` VARCHAR(45) DEFAULT NULL,
        `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;");

    $stmt = $pdo->prepare("
        INSERT INTO contact_messages (name, email, phone, subject, message, service_type, budget, source, ip_address)
        VALUES (?, ?, ?, ?, ?, ?, ?, 'contact_form', ?)
    ");
    $stmt->execute([$name, $email, $phone, $subject, $message, $service, $budget, get_ip()]);
    $msgId = (int)$pdo->lastInsertId();
} catch (\Exception $e) {
    error_log('Contact DB Save Error: ' . $e->getMessage());
}

// ── Send Email Alert to Owner ───────────────────────────────
$ownerEmail = 'lonezakir124@gmail.com';
$emailSubject = "📬 NEW LEAD: Inquiry from $name ($phone)";

$emailBodyHtml = "
<div style='font-family: Arial, sans-serif; max-width: 600px; padding: 24px; background: #0f0f17; color: #e2e8f0; border-radius: 12px;'>
  <h2 style='color: #25d366; margin-bottom: 8px;'>New Lead Inquiry Received!</h2>
  <p style='color: #94a3b8; font-size: 13px;'>Received via techwithhussain.online contact form</p>
  <hr style='border: 0; border-top: 1px solid #1e293b; margin: 16px 0;'>
  <table style='width: 100%; border-collapse: collapse;'>
    <tr><td style='padding: 8px 0; color: #94a3b8; width: 130px;'>Name:</td><td style='padding: 8px 0; color: #ffffff;'><strong>$name</strong></td></tr>
    <tr><td style='padding: 8px 0; color: #94a3b8;'>Email:</td><td style='padding: 8px 0; color: #25d366;'><a href='mailto:$email' style='color: #25d366;'>$email</a></td></tr>
    <tr><td style='padding: 8px 0; color: #94a3b8;'>Phone:</td><td style='padding: 8px 0; color: #ffffff;'><strong>$phone</strong></td></tr>
    <tr><td style='padding: 8px 0; color: #94a3b8;'>Service Required:</td><td style='padding: 8px 0; color: #ffffff;'>$service</td></tr>
    <tr><td style='padding: 8px 0; color: #94a3b8;'>Budget:</td><td style='padding: 8px 0; color: #ffffff;'>$budget</td></tr>
  </table>
  <div style='margin-top: 20px; padding: 16px; background: #181824; border-radius: 8px; border-left: 4px solid #25d366;'>
    <p style='color: #94a3b8; margin: 0 0 8px; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;'>Client Brief / Message:</p>
    <p style='color: #ffffff; margin: 0; line-height: 1.7; font-size: 15px;'>$message</p>
  </div>
  <div style='margin-top: 24px; text-align: center;'>
    <a href='https://wa.me/" . preg_replace('/[^0-9]/', '', $phone) . "' style='background: #25d366; color: #000; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;'>Reply on WhatsApp</a>
  </div>
</div>
";

$emailSent = false;

// 1. Try PHPMailer if vendor exists
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
        $mail->addReplyTo($email, $name);

        $mail->isHTML(true);
        $mail->Subject = $emailSubject;
        $mail->Body    = $emailBodyHtml;

        $mail->send();
        $emailSent = true;
    } catch (\Exception $e) {
        error_log('PHPMailer Error: ' . $e->getMessage());
    }
}

// 2. Fallback to native PHP mail() on Hostinger
if (!$emailSent) {
    $headers  = "From: Tech With Hussain <noreply@techwithhussain.online>\r\n";
    $headers .= "Reply-To: $name <$email>\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    @mail($ownerEmail, $emailSubject, $emailBodyHtml, $headers);
}

success([
    'message_id' => $msgId,
    'recipient' => $ownerEmail
], 'Thank you! Your inquiry has been sent successfully. We will reply to your email & phone shortly.');
