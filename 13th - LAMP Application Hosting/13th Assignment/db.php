<?php
$host = "your-rds-endpoint";
$user = "admin";
$pass = "password123";
$db = "lampdb";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Connection Failed: " . $conn->connect_error);
}
?>