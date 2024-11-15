<?php

    $dbHost = getenv('DB_HOST');
    $dbName = getenv('DB_NAME');
    $dbUser = getenv('DB_USER');
    $dbPass = getenv('DB_PASS');



    // Create the database connection
    $objCon = new mysqli($dbHost, $dbUser, $dbPass, $dbName);

    // Check connection
    if ($objCon->connect_error) {
        die("Connection failed: " . $objCon->connect_error);
    }

    // Query to get the first row from the 'Users' table
    $sql = "SELECT `User_id`, `Email`, `Username`, `Password`, `Verified` FROM `Users`";
    $result = $objCon->query($sql);

    if ($result->num_rows > 0) {
        while($obj = $result->fetch_object()) {
          // Fetch and display the first row
          echo "First row from 'Users' table: <br>";
          echo "Email: " . $obj->Email . "<br>";
          echo "Username: " . $obj->Username . "<br>";
          echo "Password: " . $obj->Password . "<br>";
        }
    } else {
        echo "No records found in the 'Users' table.";
    }

    //everything related to registering is starting from here...

    if (isset($_POST['email']) && isset($_POST['username']) && isset($_POST['password'])) {

        $email = $_POST['email'];
        $username = $_POST['username'];
        $password = $_POST['password'];

        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
        
        $sqlRegister = "INSERT INTO Users (Email, Username, Password) VALUES (?, ?, ?)";
        $objCon->prepare($sqlRegister);
    }
    // and ends here




    // Close the connection
    $objCon->close();
?><!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login to Zwitter</title>
    <link rel="stylesheet" href="signup.css">
    <!-- <script src="signup.js" defer></script> -->
</head>

<body>
    <div class="container">
        <img src="Resources/zwitter.png">
        <div class="login-container">
            <h1>Zwitter</h1>
            <input id="email" type="email" placeholder="Enter Email" name="email" required>
            <input id="username" type="text" name="username" placeholder="Username" required>
            <input id="password" type="password" placeholder="Enter Password" name="psw" required>
            <input id="password-repeat" type="password" placeholder="Repeat Password" name="psw-repeat" required>

            <label id="ToS">
            <br>
            <p>By creating an account you agree to our <a href="#" style="color:dodgerblue; text-decoration: none;">Terms of Services</a>.</p>
            </label>

            <div class="clearfix">
            <button type="button" class="signupbtn" onclick="signUp()">Register</button>
            <button style="margin-top: 5px;" type="button" class="cancelbtn" onclick="cancelReverse()">Cancel</button>
            
            <p>Already got an account? You can then log in <a href="login.php" style="color:dodgerblue; text-decoration: none;">here</a>.</p>
            </div>
        </div>
    </div>
</body>
</html>
