<?php

include_once "connection.php";

function getCategoryById($id)
{
    global $connection;
    $sql = "SELECT * FROM categories WHERE id = $id";
    $result = $connection->query($sql);
    return $result->fetch_assoc();
}
