<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login to Zwitter</title>
    <link rel="stylesheet" href="login.css">
    <script src="login.js" defer></script>
    <script src="signup.js" defer></script>
</head>
<body>
    <div class="container">
        <img src="Resources/zwitter.png">
        <div class="login-container">
            <h1>Zwitter</h1>
            <form>
                <input type="text" id="username" placeholder="Username" required>
                <input type="password" id="password" placeholder="Password" required>
                <input type="checkbox" id="remember" style="margin-bottom: 8px; color: #ccd6dd; margin-right: 10px; vertical-align: middle;"> <span style="color: #ccd6dd; font-size: 14px;">Remember me</span>
                <button type="submit" onclick="loginBtn()">Login</button>
                <button style="margin-top: 5px;" type="button" class="cancelbtn" onclick="cancelReverse()">Cancel</button>
                <p> Don\t have an account? Sign up <a href="signup.php" style="color:dodgerblue; text-decoration: none;">here</a>.</p>
            </form>
        </div>
    </div>
</body>
</html>
<?php
echo '<script>console.log("PHP sdwadcript executed.")</script>';
?>