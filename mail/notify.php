<?php
    
    // Get user's inputs
    $firstname = $_POST["firstname"];
    $email = $_POST["useremail"];

    // If inputs are empty
    if (empty($firstname) || empty($email)) {

        // output "required" and terminate the script
        exit("required");
    }

    // Sanitize inputs
    $nameRegex = "/^[a-zA-Z ]*$/";
    $email = filter_var($email, FILTER_SANITIZE_EMAIL);

    // Validate user's inputs
    // If inputs are invalid 
    if (!preg_match($nameRegex, $firstname) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        
        // output "invalid" and terminate the script
        exit("invalid");
    
    }

    // Database detail
    $dbServername = "localhost";
    $dbUsername = "root";
    $dbPassword = "";
    $dbName = "db_feedback";

    // Create a connection to the database
    $conn = mysqli_connect($dbServername, $dbUsername, $dbPassword, $dbName);

    // Escape inputs
    $firstname = mysqli_real_escape_string($conn, $firstname);
    $email = mysqli_real_escape_string($conn, $email);

    // Get users email address from the database if it already exist
    $get_user = "SELECT * FROM users WHERE user_email='$email';";
    $result = mysqli_query($conn, $get_user);

    $resultCheck = mysqli_num_rows($result);

    // Check if users email address already exist in the database
    // If it exist 
    if ($resultCheck > 0) {

        // output "exist" and terminate the script
        exit("exist");

    } else {

        // If it doesn't, insert the user's email in the database, output "saved" and terminate the script
        $sql = "INSERT INTO users (user_first, user_email) VALUES('$firstname', '$email');";
        mysqli_query($conn, $sql);

        exit("saved");

    }

?>