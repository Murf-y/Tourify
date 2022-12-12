<?php

include_once "connection.php";
include("helper.php");


// allow cors and json response type in one line
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['user_id']) && !isset($_GET['place_id'])) {

    $user_id = $_GET['user_id'];

    if (isset($_GET['category_id'])) {
        $category_id = $_GET['category_id'];
        if (isset($_GET['popular'])) {
            getPopularPlacesByCategory($category_id, $user_id);
        } else {
            getPlacesByCategory($category_id, $user_id);
        }
    } else {
        if (isset($_GET['favorites'])) {
            getFavoritePlaces($user_id);
        } else if (isset($_GET['popular'])) {
            getPopularPlaces($user_id);
        } else if (isset($_GET['latest'])) {
            getLatestPlaces($user_id);
        } else {
            getAllPlaces($user_id);
        }
    }
} else if ($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['user_id']) && isset($_GET['place_id'])) {

    $user_id = $_GET['user_id'];
    $place_id = $_GET['place_id'];
    getPlaceById($place_id, $user_id);
    return;
} else if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['place_id']) && isset($_POST['user_id']) && isset($_POST['rating']) && isset($_POST['review'])) {
    $place_id = $_POST['place_id'];
    $user_id = $_POST['user_id'];
    $rating = $_POST['rating'];
    $review = $_POST['review'];


    $rating = (int) $rating;


    addReview($place_id, $user_id, $rating, $review);
    return;
} else if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['place_id']) && isset($_POST['user_id']) && isset($_POST['report_reason'])) {
    $place_id = $_POST['place_id'];
    $user_id = $_POST['user_id'];
    $report_reason = $_POST['report_reason'];

    // check if the user has already reported this place

    $sql = "SELECT * FROM reports WHERE place_id = $place_id AND user_id = $user_id";
    $result = $connection->query($sql);

    if ($result->num_rows > 0) {
        echo json_encode(array(
            'status' => 500,
            'data' => [
                "message" => "You have already reported this place"
            ]
        ));
        return;
    }

    addReport($place_id, $user_id, $report_reason);
    return;
} else if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['place_id']) && isset($_POST['user_id']) && isset($_POST['is_favorited'])) {
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
} else {
    echo json_encode(array(
        "status" => 400,
        "message" => "Bad Request"
    ));
}


function addReport($place_id, $user_id, $report_reason)
{
    global $connection;
    $sql = "INSERT INTO reports (place_id, user_id, report_reason) VALUES ($place_id, $user_id, '$report_reason')";
    $result = $connection->query($sql);

    if ($result) {
        echo json_encode(array(
            'status' => 200,
            'data' => [
                "message" => "Report added successfully"
            ]
        ));
    }
}


function addReview($place_id, $user_id, $rating, $review)
{
    // check if the user has already reviewed this place
    global $connection;
    $sql = "SELECT * FROM reviews WHERE place_id = $place_id AND user_id = $user_id";
    $result = $connection->query($sql);

    if ($result->num_rows > 0) {
        echo json_encode(array(
            'status' => 500,
            'data' => [
                "message" => "You have already reviewed this place"
            ]
        ));
        return;
    }


    $sql = "INSERT INTO reviews (place_id, user_id, rating, review) VALUES ($place_id, $user_id, $rating, '$review')";
    $result = $connection->query($sql);

    if ($result) {
        echo json_encode(array(
            'status' => 200,
            'data' => [
                "message" => "Review added successfully"
            ]
        ));
    } else {
        echo json_encode(array(
            'status' => 500,
            'data' => [
                "message" => "Error adding review"
            ]
        ));
    }
}

function getPlaceById($place_id, $user_id)
{
    global $connection;
    $sql = "SELECT places.*, IF(favorites.id IS NULL, false, true) AS isFavorited FROM places LEFT JOIN favorites ON places.id = favorites.place_id AND favorites.user_id = $user_id WHERE places.id = $place_id";
    $result = $connection->query($sql);

    //  get the category
    $place = $result->fetch_assoc();
    $place['category'] = getCategoryById($place['category_id']);
    // replace the category_id with the category object
    unset($place['category_id']);

    $place['isFavorited'] = $place['isFavorited'] == 1;

    $place['reviews'] = getReviewsByPlaceId($place_id);

    echo json_encode(array(
        'status' => 200,
        'data' => [
            "place" => $place
        ]
    ));
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

function getPlacesByCategory($category_id, $user_id)
{
    global $connection;
    $sql = "SELECT places.*, IF(favorites.id IS NULL, false, true) AS isFavorited FROM places LEFT JOIN favorites ON places.id = favorites.place_id AND favorites.user_id = $user_id WHERE category_id = $category_id";
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

function getPopularPlacesByCategory($category_id, $user_id)
{
    // sort by rating 
    global $connection;

    // first select all places
    $sql = "SELECT places.*, IF(favorites.id IS NULL, false, true) AS isFavorited FROM places LEFT JOIN favorites ON places.id = favorites.place_id AND favorites.user_id = $user_id WHERE category_id = $category_id";
    $result = $connection->query($sql);
    $places = [];

    // for each place, get the average rating
    // and the number of favorites
    // and add it to the place object
    while ($row = $result->fetch_assoc()) {
        $row['category'] = getCategoryById($row['category_id']);
        unset($row['category_id']);
        $row['isFavorited'] = $row['isFavorited'] == 1;

        $place_id = $row['id'];
        $sql = "SELECT AVG(rating) AS average_rating FROM reviews WHERE place_id = $place_id";
        $result2 = $connection->query($sql);
        $row2 = $result2->fetch_assoc();
        // if average_rating is null, then set it to 0
        $row['average_rating'] = $row2['average_rating'] ?? 0;

        $sql = "SELECT COUNT(*) AS favorites_count FROM favorites WHERE place_id = $place_id";
        $result2 = $connection->query($sql);
        $row2 = $result2->fetch_assoc();
        $row['favorites_count'] = $row2['favorites_count'];

        $places[] = $row;
    }

    // sort the places by average_rating
    // if the average_rating is the same, then sort by favorites_count
    usort($places, function ($a, $b) {
        if ($a['average_rating'] == $b['average_rating']) {
            return $b['favorites_count'] <=> $a['favorites_count'];
        }
        return $b['average_rating'] <=> $a['average_rating'];
    });

    echo json_encode(array(
        'status' => 200,
        'data' => [
            "places" => $places
        ]
    ));
}

function getPopularPlaces($user_id)
{
    // sort by rating 
    global $connection;

    // first select all places
    $sql = "SELECT places.*, IF(favorites.id IS NULL, false, true) AS isFavorited FROM places LEFT JOIN favorites ON places.id = favorites.place_id AND favorites.user_id = $user_id";
    $result = $connection->query($sql);
    $places = [];

    // for each place, get the average rating
    // and the number of favorites
    // and add it to the place object
    while ($row = $result->fetch_assoc()) {
        $row['category'] = getCategoryById($row['category_id']);
        unset($row['category_id']);
        $row['isFavorited'] = $row['isFavorited'] == 1;

        $place_id = $row['id'];
        $sql = "SELECT AVG(rating) AS average_rating FROM reviews WHERE place_id = $place_id";
        $result2 = $connection->query($sql);
        $row2 = $result2->fetch_assoc();
        // if average_rating is null, then set it to 0
        $row['average_rating'] = $row2['average_rating'] ?? 0;

        $sql = "SELECT COUNT(*) AS favorites_count FROM favorites WHERE place_id = $place_id";
        $result2 = $connection->query($sql);
        $row2 = $result2->fetch_assoc();
        $row['favorites_count'] = $row2['favorites_count'];
        $places[] = $row;
    }

    // descending order
    // SORT first by average_rating
    // then by favorites_count
    usort($places, function ($a, $b) {
        if ($a['average_rating'] == $b['average_rating']) {
            return $b['favorites_count'] <=> $a['favorites_count'];
        }
        return $b['average_rating'] <=> $a['average_rating'];
    });

    echo json_encode(array(
        'status' => 200,
        'data' => [
            "places" => $places
        ]
    ));
}


function getLatestPlaces($user_id)
{
    // sort by date added


    global $connection;
    $sql = "SELECT places.*, IF(favorites.id IS NULL, false, true) AS isFavorited FROM places LEFT JOIN favorites ON places.id = favorites.place_id AND favorites.user_id = $user_id ORDER BY added_at DESC";
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

function getFavoritePlaces($user_id)
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
