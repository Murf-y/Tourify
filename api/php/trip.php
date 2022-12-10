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

    $sql = "INSERT INTO trips (user_id, name, start_date, end_date) VALUES ('$user_id', '$name', '$start_date', '$end_date')";

    if ($connection->query($sql) === TRUE) {
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
} else if (
    $_SERVER['REQUEST_METHOD'] == 'GET'
    && isset($_GET['user_id'])
) {
    $user_id = $_GET['user_id'];

    $sql = "SELECT * FROM trips WHERE user_id = '$user_id'";

    $result = $connection->query($sql);

    if ($result->num_rows > 0) {
        $trips = array();

        while ($row = $result->fetch_assoc()) {
            $trip_id = $row['id'];
            $sql = "SELECT places.*, categories.* FROM trip_places INNER JOIN places ON trip_places.place_id = places.id INNER JOIN categories ON places.category_id = categories.id WHERE trip_places.trip_id = '$trip_id'";
            $places_result = $connection->query($sql);
            $places = array();
            while ($place_row = $places_result->fetch_assoc()) {
                array_push($places, $place_row);
            }
            $row['places'] = $places;
            array_push($trips, $row);
        }

        echo json_encode(array(
            "status" => 200,
            "data" => [
                "trips" => $trips
            ]
        ));
    } else {
        echo json_encode(array(
            "status" => 404,
            "message" => "Not Found"
        ));
    }
} else {
    echo json_encode(array(
        "status" => 400,
        "message" => "Bad Request"
    ));
}
