<?php

include_once "connection.php";

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
    $sql = "SELECT * FROM users WHERE id = $id";
    $result = $connection->query($sql);
    return $result->fetch_assoc();
}
