<?php

header("Content-Type: application/json");

require_once "../../config/database.php";

$data = json_decode(file_get_contents("php://input"), true);

$name = $data['name'];
$email = $data['email'];
$password = password_hash(
    $data['password'],
    PASSWORD_DEFAULT
);

$sql = "INSERT INTO users(name,email,password)
        VALUES('$name','$email','$password')";

if($conn->query($sql)){
    echo json_encode([
        "success" => true,
        "message" => "User Registered Successfully"
    ]);
}
else{
    echo json_encode([
        "success" => false,
        "error" => $conn->error
    ]);
}