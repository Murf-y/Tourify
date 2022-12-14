<?php
include_once 'connection.php';
include('constants.php');

// allow cors and json response type in one line
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");


// if method is get then get all the categories
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $sql = "SELECT * FROM categories";
    $result = $connection->query($sql);

    // for each category create a new object and add it to the categories array
    $categories = [];
    while ($category = $result->fetch_assoc()) {
        $category['image_path'] = "http://" . $server_host . "/tourify/api/content/assets/categories/" . $category['id'] . ".svg";
        array_push($categories, $category);
    }

    echo json_encode(array(
        "status" => 200,
        "data" => [
            "categories" => $categories
        ]
    ));
} else {
    echo json_encode(array(
        "status" => 400,
        "message" => "Bad Request"
    ));
}
