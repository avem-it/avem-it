<?php
/**
 * Конфигурационный файл проекта.
 * Здесь хранятся параметры подключения к SMTP.
 * Не забывайте добавить его в .gitignore, чтобы не залить в репозиторий.
 */
return [
    // SMTP-сервер (Host)
    'smtp_host'     => 'smtp.gmail.com',

    // Порт (обычно 587 для STARTTLS или 465 для SSL)
    'smtp_port'     => 465,

    // Логин и пароль
    'smtp_username' => 'aakosolapov.it@gmail.com',
    'smtp_password' => '!Zolla200',

    // Метод шифрования: либо '', 'ssl' или 'tls'
    'smtp_secure'   => 'ssl',

    // От кого отправляем письмо
    'from_email'    => 'aakosolapov.it@gmail.com',
    'from_name'     => 'Avem-IT',

    // Кому по умолчанию отправляем
    'to_email'      => 'aakosolapov.it@gmail.com',
    'to_name'       => 'Avem-IT',
];