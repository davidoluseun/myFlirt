<?php
    
    // Database detail
    $dbServername = "localhost";
    $dbUsername = "myflirta0d";
    $dbPassword = "a0dInChristdb";
    $dbName = "db_myflirt";

    // Create a connection to the database
    $conn = mysqli_connect($dbServername, $dbUsername, $dbPassword, $dbName);

    // Get users input
    $firstname = mysqli_real_escape_string($conn, $_POST["firstname"]);
    $email = mysqli_real_escape_string($conn, $_POST["user-email"]);

    // Get users email address from the database if it already exist
    $get_user = "SELECT * FROM users WHERE user_email='$email';";
    $result = mysqli_query($conn, $get_user);

    $resultCheck = mysqli_num_rows($result);

    // Check if users email address already exist in the database
    if ($resultCheck > 0) {

        echo "Your email address already exist in our database";

    } else {

        $sql = "INSERT INTO users (user_first, user_email) VALUES('$firstname', '$email');";
        mysqli_query($conn, $sql);
    
        header("Location: ../index.html?signup=success");
    }

?>