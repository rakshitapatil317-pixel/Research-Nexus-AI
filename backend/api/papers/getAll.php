<?php

header("Content-Type: application/json");

require_once "../../config/database.php";

$sql = "SELECT * FROM papers ORDER BY created_at DESC";

$result = $conn->query($sql);

$papers = [];

while($row = $result->fetch_assoc()){
    $papers[] = $row;
}

echo json_encode([
    "success" => true,
    "papers" => $papers
]);