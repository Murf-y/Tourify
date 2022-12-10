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

    // validate date, if not valid, return error and check if start date is less than end date
    $start_date = date('Y-m-d', strtotime($start_date));
    $end_date = date('Y-m-d', strtotime($end_date));

    if ($start_date > $end_date) {
        echo json_encode(array(
            "status" => 400,
            "message" => "Start date must be less than end date"
        ));
    }

    $sql = "INSERT INTO trips (name, start_date, end_date, user_id) VALUES ('$name', '$start_date', '$end_date', '$user_id')";
    $result = $conn->query($sql);

    if ($result) {
        echo json_encode(array(
            "status" => 200,
            "data" => "Trip created successfully"
        ));
    } else {
        echo json_encode(array(
            "status" => 500,
            "message" => "Internal Server Error"
        ));
    }
} else {
    echo json_encode(array(
        "status" => 400,
        "message" => "Bad Request"
    ));
}
