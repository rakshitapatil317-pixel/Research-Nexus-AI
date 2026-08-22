<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Content-Type: application/json");

require_once "../../config/database.php";

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    die(json_encode([
        "success" => false,
        "message" => "Only POST method allowed"
    ]));
}

if (!isset($_FILES['pdf'])) {
    die(json_encode([
        "success" => false,
        "message" => "No PDF uploaded"
    ]));
}

$user_id = $_POST['user_id'];
$title = $_POST['title'];
$author = $_POST['author'];

$file = $_FILES['pdf'];

$fileName = time() . "_" . basename($file['name']);

$uploadPath = "../../uploads/papers/" . $fileName;

if (move_uploaded_file($file['tmp_name'], $uploadPath)) {

    $dbPath = "uploads/papers/" . $fileName;

    $sql = "INSERT INTO papers
            (user_id,title,author,abstract,summary,keywords,pdf_path)
            VALUES
            ('$user_id','$title','$author','','','','$dbPath')";

    if ($conn->query($sql)) {

        echo json_encode([
            "success" => true,
            "message" => "Paper Uploaded Successfully"
        ]);

    } else {

        echo json_encode([
            "success" => false,
            "error" => $conn->error
        ]);
    }

} else {

    echo json_encode([
        "success" => false,
        "message" => "File Upload Failed"
    ]);
}