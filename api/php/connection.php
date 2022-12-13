<?php

$db_host = "localhost";
$db_user = "root";
$db_pass = null;
$db_name = "trouifydb";

$connection = new mysqli($db_host, $db_user, $db_pass);

if ($connection->connect_error) {
    die("Connection failed: " . $connection->connect_error);
}

// create the database if it doesn't exist

$sql = "CREATE DATABASE IF NOT EXISTS $db_name";
if ($connection->query($sql) !== TRUE) {
    echo "Error creating database: " . $connection->error;
}

$connection = new mysqli($db_host, $db_user, $db_pass, $db_name);

// create the table if it doesn't exist

$connection->query("CREATE TABLE IF NOT EXISTS users (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(30) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password TEXT NOT NULL,
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    profile_photo_url TEXT NOT NULL DEFAULT 'http://localhost/tourify/api/content/assets/user/avatar.svg',
    credit_score INT(6) NOT NULL DEFAULT 0
)");


$connection->query("CREATE TABLE IF NOT EXISTS categories (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
)");

$connection->query("CREATE TABLE IF NOT EXISTS places (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    overview VARCHAR(255) NOT NULL,
    district VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    photo_url VARCHAR(255) NOT NULL,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    category_id INT(6) UNSIGNED NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories(id)
)");

$connection->query("CREATE TABLE IF NOT EXISTS trips (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INT(6) UNSIGNED NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
)");

$connection->query("CREATE TABLE IF NOT EXISTS trip_places (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    trip_id INT(6) UNSIGNED NOT NULL,
    place_id INT(6) UNSIGNED NOT NULL,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (trip_id) REFERENCES trips(id),
    FOREIGN KEY (place_id) REFERENCES places(id)
)");

$connection->query("CREATE TABLE IF NOT EXISTS reviews (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    rating INT(6) NOT NULL,
    review VARCHAR(255) NOT NULL,
    review_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INT(6) UNSIGNED NOT NULL,
    place_id INT(6) UNSIGNED NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (place_id) REFERENCES places(id)
)");

$connection->query("CREATE TABLE IF NOT EXISTS reports (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    reported_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reason VARCHAR(255) NOT NULL,
    user_id INT(6) UNSIGNED NOT NULL,
    place_id INT(6) UNSIGNED NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (place_id) REFERENCES places(id)
)");

$connection->query("CREATE TABLE IF NOT EXISTS favorites (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id INT(6) UNSIGNED NOT NULL,
    place_id INT(6) UNSIGNED NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (place_id) REFERENCES places(id)
)");
