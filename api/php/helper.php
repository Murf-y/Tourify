<?php

include_once "connection.php";
include("constants.php");

// allow cors and json response type in one line
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");


function getCategoryById($id)
{
    global $connection;
    $sql = "SELECT * FROM categories WHERE id = $id";
    $result = $connection->query($sql);
    return $result->fetch_assoc();
}

function getReviewsByPlaceId($place_id)
{
    global $connection;
    $sql = "SELECT * FROM reviews WHERE place_id = $place_id";
    $result = $connection->query($sql);
    while ($review = $result->fetch_assoc()) {
        $review['author'] = getUserById($review['user_id']);
        unset($review['user_id']);
        $reviews[] = $review;
    }

    // if reviews is null, return empty array
    if (!isset($reviews)) {
        $reviews = [];
    }
    return $reviews;
}

function getUserById($id)
{
    global $connection;
    global $server_host;
    $sql = "SELECT * FROM users WHERE id = $id";
    $result = $connection->query($sql);
    $user = $result->fetch_assoc();
    $user['profile_photo_url'] = "http://" . $server_host . $user['profile_photo_url'];
    return $user;
}

function sendEmail($to, $subject, $body)
{
    $headers = "From: tourify.in@gmail.com\r\n";
    mail($to, $subject, $body, $headers);
}

function addCredits($user_id, $credits)
{
    global $connection;
    $sql = "UPDATE users SET credit_score = credit_score + $credits WHERE id = $user_id";
    $connection->query($sql);
}
