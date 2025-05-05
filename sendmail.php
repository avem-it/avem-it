<?php
session_start();

// Подключаем конфиг и получаем настройки
$config = require __DIR__ . '/config.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/PHPMailer/src/Exception.php';
require __DIR__ . '/PHPMailer/src/PHPMailer.php';
require __DIR__ . '/PHPMailer/src/SMTP.php';

header('Content-Type: application/json; charset=UTF-8');

$response = ['success' => false, 'message' => 'Непредвиденная ошибка.'];

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    $response['message'] = 'Метод не поддерживается.';
    echo json_encode($response);
    exit;
}

if (empty($_POST['csrf_token']) || $_POST['csrf_token'] !== $_SESSION['csrf_token']) {
    http_response_code(403);
    $response['message'] = 'Неверный CSRF-токен.';
    echo json_encode($response);
    exit;
}

$name    = trim($_POST['name'] ?? '');
$email   = trim($_POST['email'] ?? '');
$phone   = trim($_POST['phone'] ?? '');
$message = trim($_POST['message'] ?? '');

if ($name === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    $response['message'] = 'Пожалуйста, укажите корректное имя и e-mail.';
    echo json_encode($response);
    exit;
}

try {
    $mail = new PHPMailer(true);
    $mail->CharSet    = 'UTF-8';
    $mail->isSMTP()

  // Настройки SMTP из конфига
$mail->isSMTP();
$mail->Host       = $config['smtp_host'];
$mail->SMTPAuth   = true;
$mail->Username   = $config['smtp_username'];
$mail->Password   = $config['smtp_password'];
$mail->SMTPSecure = $config['smtp_secure'];
$mail->Port       = $config['smtp_port'];

// От кого
$mail->setFrom(
  $config['from_email'],
  $config['from_name']
);
// Кому
$mail->addAddress(
  $config['to_email'],
  $config['to_name']
);

    $mail->Subject = 'Новая заявка с сайта AVEMGROUP';

    $body  = "<h2>Новая заявка с сайта AVEMGROUP</h2>";
    $body .= "<p><strong>Имя:</strong> "  . htmlspecialchars($name) . "</p>";
    $body .= "<p><strong>E-mail:</strong> " . htmlspecialchars($email) . "</p>";
    if ($phone !== '') {
        $body .= "<p><strong>Телефон:</strong> " . htmlspecialchars($phone) . "</p>";
    }
    if ($message !== '') {
        $body .= "<p><strong>Сообщение:</strong><br>" . nl2br(htmlspecialchars($message)) . "</p>";
    }

    $mail->isHTML(true);
    $mail->Body = $body;

    $mail->send();
    $response['success'] = true;
    $response['message'] = 'Спасибо! Ваша заявка отправлена.';
} catch (Exception $e) {
    http_response_code(500);
    $response['message'] = 'Ошибка при отправке: ' . $mail->ErrorInfo;
}

echo json_encode($response);
