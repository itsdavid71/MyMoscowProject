<?php

include 'db.php';

$postData = file_get_contents('php://input');

$data = json_decode($postData, true);

$name = $data['name'];
$email = $data['email'];
$message = $data['message'];

$query = "INSERT INTO moscow_form (name, email, message, date_created)
          VALUES ('$name', '$email', '$message', NOW())";
        
mysqli_query($link, $query);
$error = mysqli_error($link);

if ($error) {
    echo $error;
} else {
    $encode = json_encode($data);
    echo 'Ваше сообщение отправлено!';
}