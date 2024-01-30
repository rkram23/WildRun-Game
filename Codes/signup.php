<?php
$host = "localhost";
$username_db = "root";
$password_db = ""; // Change this to your database password
$database = "boyrun";

// Create connection
$conn = new mysqli($host, $username_db, $password_db, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Create 'dino' table if it doesn't exist
$sqlCreateTable = "
    CREATE TABLE IF NOT EXISTS dino (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL
    )
";

if ($conn->query($sqlCreateTable) !== TRUE) {
    die("Error creating table: " . $conn->error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $password = $_POST["password"];

    // Validate input (you can add more validation as needed)
    if (empty($name) || empty($password)) {
        echo "Name and password are required.";
    } else {
        // Insert user data into the database with plain text password
        $sql = "INSERT INTO dino (name, password) VALUES ('$name', '$password')";
        if ($conn->query($sql) === TRUE) {
            // Redirect to login.html after successful signup
            header("Location: dinodb.php");
            exit(); // Ensure that no further code is executed after the redirect
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    }
}

// Close connection
$conn->close();
?>
