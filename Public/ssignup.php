<?php
header('Content-Type: application/json'); // Send a JSON response

// Check if the POST request has the expected fields
if (isset($_POST['email']) && isset($_POST['username']) && isset($_POST['password'])) {
    $email = $_POST['email'];
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Hash the password before storing it (for security)
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Database connection
    $dbHost = getenv('DB_HOST');
    $dbName = getenv('DB_NAME');
    $dbUser = getenv('DB_USER');
    $dbPass = getenv('DB_PASS');
    
    $objCon = new mysqli($dbHost, $dbUser, $dbPass, $dbName);
    if ($objCon->connect_error) {
        echo json_encode(['success' => false, 'error' => 'Database connection failed']);
        exit;
    }

    // Check if the username or email already exists
    $sql = "SELECT * FROM Users WHERE Email = ? OR Username = ?";
    $stmt = $objCon->prepare($sql);
    $stmt->bind_param('ss', $email, $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        echo json_encode(['success' => false, 'error' => 'Email or username already taken']);
    } else {
        // Insert the new user into the database
        $sql = "INSERT INTO users (email, username, password) VALUES (?, ?, ?)";
        $stmt = $objCon->prepare($sql);
        $stmt->bind_param('sss', $email, $username, $hashedPassword);

        if ($stmt->execute()) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'error' => 'Error inserting user']);
        }
    }

    $stmt->close();
    $objCon->close();
} else {
    echo json_encode(['success' => false, 'error' => 'Missing required fields']);
}
?>