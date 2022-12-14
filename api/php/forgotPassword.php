<?php

include_once 'connection.php';
include_once 'helper.php';
include_once 'constants.php';

// allow cors and json response type in one line
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['email'])) {
    $email = $_POST['email'];

    $sql = "SELECT * FROM users WHERE email = '$email'";
    $result = $connection->query($sql);

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();

        $sql = "SELECT * FROM password_resets WHERE email = " . $user['email'];
        $result = $connection->query($sql);

        // user has a reset token update the token
        if ($result->num_rows > 0) {

            // get the id of the reset token
            $reset_token_id = $result->fetch_assoc()['id'];


            $reset_token = substr(uniqid(), -8);

            $sql = "UPDATE password_resets SET token = '$reset_token' WHERE id=$reset_token_id";

            sendEmail($email, "Password Reset", "Your Reset Code is $reset_token \n Do not share this code with anyone \n Best Regards, \n Tourify Team");
        } else {
            // create a new reset token
            $reset_token = substr(uniqid(), -8);

            $sql = "INSERT INTO password_resets (email, token) VALUES ('$email', '$reset_token')";

            sendEmail($email, "Password Reset", "Your Reset Code is $reset_token \n Do not share this code with anyone \n Best Regards, \n Tourify Team");
        }
    } else {
        echo json_encode(array(
            "status" => 404,
            "message" => "User not found"
        ));
    }
} else {
    echo json_encode(array(
        "status" => 400,
        "message" => "Bad request"
    ));
}
