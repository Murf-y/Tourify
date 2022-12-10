<?php

include_once 'connection.php';

// allow cors and json response type in one line
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");


if (
    $_SERVER['REQUEST_METHOD'] == 'POST'
    && isset($_POST['user_id'])
    && isset($_POST['name'])
    && isset($_POST['start_date'])
    && isset($_POST['end_date'])
) {
    $user_id = $_POST['user_id'];
    $name = $_POST['name'];
    $start_date = $_POST['start_date'];
    $end_date = $_POST['end_date'];

    $sql = "INSERT INTO trips (name, start_date, end_date) VALUES ('$name', '$start_date', '$end_date')";
} else {
    echo json_encode(array(
        "status" => 400,
        "message" => "Bad Request"
    ));
}
