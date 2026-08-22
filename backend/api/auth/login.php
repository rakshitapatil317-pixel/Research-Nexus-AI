<?php

header("Content-Type: application/json");

require_once "../../config/database.php";

$data = json_decode(file_get_contents("php://input"), true);

$email = $data['email'];
$password = $data['password'];

$sql = "SELECT * FROM users WHERE email='$email'";

$result = $conn->query($sql);

if($result->num_rows > 0){

    $user = $result->fetch_assoc();

    if(password_verify($password, $user['password'])){

        echo json_encode([
            "success" => true,
            "message" => "Login Successful",
            "user" => [
                "id" => $user['id'],
                "name" => $user['name'],
                "email" => $user['email']
            ]
        ]);

    } else {

        echo json_encode([
            "success" => false,
            "message" => "Invalid Password"
        ]);
    }

} else {

    echo json_encode([
        "success" => false,
        "message" => "User Not Found"
    ]);
}