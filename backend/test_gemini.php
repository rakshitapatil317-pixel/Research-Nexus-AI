<?php

require_once "config/env.php";

$url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" . GEMINI_API_KEY;

$data = [
    "contents" => [
        [
            "parts" => [
                [
                    "text" => "Explain Artificial Intelligence in 3 simple sentences."
                ]
            ]
        ]
    ]
];

$ch = curl_init($url);

curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Content-Type: application/json"
]);

curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

$response = curl_exec($ch);

if(curl_errno($ch)){
    echo curl_error($ch);
}

curl_close($ch);

echo "<pre>";
print_r(json_decode($response, true));
echo "</pre>";