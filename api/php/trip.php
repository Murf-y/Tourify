<?php

include_once 'connection.php';

// allow cors and json response type in one line
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");


if (
    $_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['name'])
    && isset($_POST['name'])
    && isset($_POST['name'])
) {
} else {
}
