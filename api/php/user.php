<?php

include_once 'connection.php';

include('constants.php');

// allow cors and json response type in one line
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// if method is post and there exists a username paramter then create a new user
// if method is post and there does not exists a username paramter then check if the user exists (login)

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['username']) && isset($_POST['email']) && isset($_POST['password'])) {
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

            $user['profile_photo_url'] = "http://" . $server_host . $user['profile_photo_url'];

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
} else if ($_SERVER['REQUEST_METHOD'] == 'POST' && !isset($_POST['username']) && isset($_POST['email']) && isset($_POST['password'])) {
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

        $user['profile_photo_url'] = "http://" . $server_host . $user['profile_photo_url'];

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
} else if ($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['user_id'])) {
    $user_id = $_GET['user_id'];

    $sql = "SELECT * FROM users WHERE id = $user_id";
    $result = $connection->query($sql);

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();

        // add the rank based on the credit score
        $sql = "SELECT 1 + COUNT(*) AS rank FROM users WHERE credit_score > (SELECT credit_score FROM users WHERE id = $user_id)";
        $result = $connection->query($sql);
        $user["rank"] = $result->fetch_assoc()['rank'];

        unset($user['password']);
        unset($user['email']);

        $user['profile_photo_url'] = "http://" . $server_host . $user['profile_photo_url'];

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
    // get with page
} else if ($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['page'])) {
    $page = $_GET['page'];
    $limit = 10;
    $offset = ($page - 1) * $limit;

    $sql = "SELECT * FROM users ORDER BY credit_score DESC LIMIT $limit OFFSET $offset";
    $result = $connection->query($sql);

    $users = array();
    while ($row = $result->fetch_assoc()) {
        // add the rank based on the credit score
        $sql = "SELECT 1 + COUNT(*) AS rank FROM users WHERE credit_score > (SELECT credit_score FROM users WHERE id = " . $row['id'] . ")";
        $result2 = $connection->query($sql);
        $row["rank"] = $result2->fetch_assoc()['rank'];


        unset($row['password']);
        unset($row['email']);

        $row['profile_photo_url'] = "http://" . $server_host . $row['profile_photo_url'];

        array_push($users, $row);
    }

    echo json_encode(array(
        "status" => 200,
        "data" => [
            "users" => $users
        ]
    ));
} else if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['user_id']) && isset($_POST['profile_photo'])) {
    $user_id = $_POST['user_id'];
    $profile_photo = $_POST['profile_photo'];

    // profile photo is a base64 encoded image
    // decode the image and save it to the server content/assets/user/hash(user_id).jpg
    $profile_photo = base64_decode($profile_photo);
    $file = fopen("../content/assets/user/" . md5($user_id . "profile_photo") . ".jpg", "w");
    fwrite($file, $profile_photo);
    fclose($file);

    $profile_photo_url = "/tourify/api/content/assets/user/" . md5($user_id . "profile_photo") . ".jpg";

    $sql = "UPDATE users SET profile_photo_url = '$profile_photo_url' WHERE id = $user_id";
    $result = $connection->query($sql);

    $sql = "SELECT * FROM users WHERE id = $user_id";
    $result = $connection->query($sql);
    $user = $result->fetch_assoc();

    $sql = "SELECT 1 + COUNT(*) AS rank FROM users WHERE credit_score > (SELECT credit_score FROM users WHERE id = $user_id)";
    $result = $connection->query($sql);
    $user["rank"] = $result->fetch_assoc()['rank'];

    unset($user['password']);
    $user['profile_photo_url'] = "http://" . $server_host . $user['profile_photo_url'];

    echo json_encode(array(
        "status" => 200,
        "data" => [
            "user" => $user
        ]
    ));
} else {
    echo json_encode(array(
        "status" => 400,
        "message" => "Bad Request"
    ));
}
