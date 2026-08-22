<?php

header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

$text = $data['text'];

$summary =
"This research paper discusses the main concepts, methodology, findings, and conclusions of the study. The proposed approach demonstrates significant improvements and highlights important insights relevant to the research domain.";

echo json_encode([
    "success" => true,
    "summary" => $summary
]);