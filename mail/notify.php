<?php
        
    $dbServername = "localhost";
    $dbUsername = "root";
    $dbPassword = "";
    $dbName = "db_myflirt";

    $conn = mysqli_connect($dbServername, $dbUsername, $dbPassword, $dbName);

    $firstname = $_POST["firstname"];
    $email = $_POST["user-email"];

    $sql = "INSERT INTO users (user_first, user_email) VALUES('$firstname', '$email');";
    mysqli_query($conn, $sql);

    header("Location: ../index.php?signup=success");

?>