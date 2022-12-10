<?php

include_once "connection.php";
include("helper.php");


// allow cors and json response type in one line
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['user_id'])) {

    $user_id = $_GET['user_id'];

    if (isset($_GET['favorites'])) {
        getFavorites($user_id);
    } else {
        getAllPlaces($user_id);
    }
}

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['place_id']) && isset($_POST['user_id']) && isset($_POST['is_favorited'])) {
    $place_id = $_POST['place_id'];
    $user_id = $_POST['user_id'];

    // new value of is_favorited 
    // "1" means true, "0" means false
    // this is because the value is sent as a string
    $is_favorited = $_POST['is_favorited'];

    // if === "1" then the place is being added to favorites
    // if === "0" then the place is being removed from favorites
    if ($is_favorited === "1") {
        addPlaceToFavorites($place_id, $user_id);
    } else if ($is_favorited === "0") {
        removePlaceFromFavorites($place_id, $user_id);
    } else {
        echo json_encode(array(
            'status' => 500,
            'data' => [
                "message" => "Error adding place to favorites"
            ]
        ));
    }
}



function getAllPlaces($user_id)
{
    global $connection;
    $sql = "SELECT places.*, IF(favorites.id IS NULL, false, true) AS isFavorited FROM places LEFT JOIN favorites ON places.id = favorites.place_id AND favorites.user_id = $user_id";
    $result = $connection->query($sql);

    // for each place, get the category
    $places = [];
    while ($row = $result->fetch_assoc()) {
        $row['category'] = getCategoryById($row['category_id']);
        // replace the category_id with the category object
        unset($row['category_id']);
        $row['isFavorited'] = $row['isFavorited'] == 1;
        $places[] = $row;
    }

    echo json_encode(array(
        'status' => 200,
        'data' => [
            "places" => $places
        ]
    ));
}

function getFavorites($user_id)
{
    global $connection;
    $sql = "SELECT places.* FROM places INNER JOIN favorites ON places.id = favorites.place_id AND favorites.user_id = $user_id";
    $result = $connection->query($sql);


    // for each place, get the category
    $places = [];
    while ($row = $result->fetch_assoc()) {
        $row['category'] = getCategoryById($row['category_id']);
        // replace the category_id with the category object
        unset($row['category_id']);
        $row['isFavorited'] = true;
        $places[] = $row;
    }

    echo json_encode(array(
        'status' => 200,
        'data' => [
            "places" => $places
        ]
    ));
}


function addPlaceToFavorites($place_id, $user_id)
{
    global $connection;
    $sql = "INSERT INTO favorites (place_id, user_id) VALUES ($place_id, $user_id)";
    $result = $connection->query($sql);
    if ($result) {
        echo json_encode(array(
            'status' => 200,
            'data' => [
                "message" => "Place added to favorites"
            ]
        ));
    } else {
        echo json_encode(array(
            'status' => 500,
            'data' => [
                "message" => "Error adding place to favorites"
            ]
        ));
    }
}




function removePlaceFromFavorites($place_id, $user_id)
{
    global $connection;
    $sql = "DELETE FROM favorites WHERE place_id = $place_id AND user_id = $user_id";
    $result = $connection->query($sql);
    if ($result) {
        echo json_encode(array(
            'status' => 200,
            'data' => [
                "message" => "Place removed from favorites"
            ]
        ));
    } else {
        echo json_encode(array(
            'status' => 500,
            'data' => [
                "message" => "Error removing place from favorites"
            ]
        ));
    }
}
