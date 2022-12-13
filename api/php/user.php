<?php

include_once 'connection.php';

// allow cors and json response type in one line
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// if method is post and there exists a username paramter then create a new user
// if method is post and there does not exists a username paramter then check if the user exists (login)

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['username'])) {
    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    // check if the user already exists
    $sql = "SELECT * FROM users WHERE username = '$username' OR email = '$email'";
    $result = $connection->query($sql);

    if ($result->num_rows > 0) {
        echo json_encode(array(
            "status" => 400,
            "message" => "User with this username or email already exists"
        ));
    } else {
        // create a new user

        // hash the password using md5
        $password = md5($password);

        $sql = "INSERT INTO users (username, email, password) VALUES ('$username', '$email', '$password')";
        $result = $connection->query($sql);

        if ($result) {

            // get the user using the id last inserted
            $user_id = $connection->insert_id;
            $sql = "SELECT * FROM users WHERE id = $user_id";
            $result = $connection->query($sql);
            $user = $result->fetch_assoc();

            // remove password from the user object
            unset($user['password']);

            echo json_encode(array(
                "status" => 201,
                "data" => [
                    "user" => $user
                ]
            ));
        } else {
            echo json_encode(array(
                "status" => 500,
                "message" => "Error creating user"
            ));
        }
    }
} else if ($_SERVER['REQUEST_METHOD'] == 'POST' && !isset($_POST['username'])) {
    $email = $_POST['email'];
    $password = $_POST['password'];

    // check if the user exists
    // hash the password using md5
    $password = md5($password);

    $sql = "SELECT * FROM users WHERE email = '$email' AND password = '$password'";
    $result = $connection->query($sql);

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();

        // remove password from the user object
        unset($user['password']);
        echo json_encode(array(
            "status" => 200,
            "data" => [
                "user" => $user
            ]
        ));
    } else {
        echo json_encode(array(
            "status" => 404,
            "message" => "User not found"
        ));
    }

    // get with user_id
} else if ($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['user_id'])) {
    $user_id = $_GET['user_id'];

    $sql = "SELECT * FROM users WHERE id = $user_id";
    $result = $connection->query($sql);

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();

        unset($user['password']);
        unset($user['email']);
        echo json_encode(array(
            "status" => 200,
            "data" => [
                "user" => $user
            ]
        ));
    } else {
        echo json_encode(array(
            "status" => 404,
            "message" => "User not found"
        ));
    }
} else {
    echo json_encode(array(
        "status" => 400,
        "message" => "Bad Request"
    ));
}
