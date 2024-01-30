<?php
header('Content-Type: application/json');
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

// Initialize data array
$data = array();

// Retrieve data from the request
$json_data = file_get_contents('php://input');
$data = json_decode($json_data, true);  // true to decode as an associative array

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $data["username"];
    $score = $data["score"];
        // Log received data for debugging
        file_put_contents('php://stderr', "Received data: " . print_r($_POST, true) . PHP_EOL);


    // Check if the user already exists in the database
    $sqlCheckUser = "SELECT * FROM scores WHERE username = '$username'";
    $resultCheckUser = $conn->query($sqlCheckUser);

    if (!$resultCheckUser) {
        // Log or echo the error for debugging
        $data['error'] = $conn->error;
    } else {
        if ($resultCheckUser->num_rows > 0) {
            // User exists, update the score
            $row = $resultCheckUser->fetch_assoc();
            $highscore = max($row["highscore"], $score);

            $sqlUpdateScore = "UPDATE scores SET score = $score, highscore = $highscore WHERE username = '$username'";
            $updateResult = $conn->query($sqlUpdateScore);

            if (!$updateResult) {
                // Log or echo the error for debugging
                $data['updateError'] = $conn->error;
            }
        } else {
            // User doesn't exist, insert a new record
            $sqlInsertScore = "INSERT INTO scores (username, score, highscore) VALUES ('$username', $score, $score)";
            $insertResult = $conn->query($sqlInsertScore);

            if (!$insertResult) {
                // Log or echo the error for debugging
                $data['insertError'] = $conn->error;
            }
        }

        // Get the person with the highest score
        $sqlHighScore = "SELECT * FROM scores ORDER BY highscore DESC LIMIT 1";
        $resultHighScore = $conn->query($sqlHighScore);

        if (!$resultHighScore) {
            // Log or echo the error for debugging
            $data['highScoreError'] = $conn->error;
        } else {
            if ($resultHighScore->num_rows > 0) {
                $rowHighScore = $resultHighScore->fetch_assoc();
                $data['highScoreUser'] = $rowHighScore["username"];
                $data['highScore'] = $rowHighScore["highscore"];
            } else {
                $data['highScoreUser'] = "No one yet";
                $data['highScore'] = 0;  // Set a default value for highScore when there are no rows
            }
        }

        // Add the present score and username to the data array
        $data['presentScore'] = $score;
        $data['username'] = $username;
        file_put_contents('php://stderr', "Final data array: " . print_r($data, true) . PHP_EOL);
    }
}

// Return the data as JSON
echo json_encode($data, JSON_NUMERIC_CHECK);  // Ensure numeric values are encoded as numbers

// Close connection
$conn->close();
?>
