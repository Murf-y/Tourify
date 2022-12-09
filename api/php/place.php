<?php

include_once "connection.php";
include("helper.php");


// allow cors and json response type in one line
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['user_id'])) {

    // join a derived attribute isFavorited, which is true if the place is favorited by the user
    $user_id = $_GET['user_id'];
    $sql = "SELECT places.*, IF(favorites.id IS NULL, false, true) AS isFavorited FROM places LEFT JOIN favorites ON places.id = favorites.place_id AND favorites.user_id = $user_id";
    $result = $connection->query($sql);

    // for each place, get the category
    $places = [];
    while ($row = $result->fetch_assoc()) {
        $row['category'] = getCategoryById($row['category_id']);
        $places[] = $row;
    }

    echo json_encode(array(
        'status' => 200,
        'data' => [
            "places" => $places
        ]
    ));
}
