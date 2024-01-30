<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $password = $_POST["password"];

    // Assuming you have a MySQL database named 'rkdb' with a table named 'dino'
    $host = "localhost";
    $username = "root";
    $password_db = "";
    $database = "boyrun";

    // Create a connection
    $conn = new mysqli($host, $username, $password_db, $database);

    // Check the connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Prepare SQL statement for user login
    $sql = "SELECT * FROM dino WHERE name=? AND password=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $name, $password);

    // Execute the SQL statement
    $stmt->execute();

    // Fetch the result
    $result = $stmt->get_result();

    // Check if the user exists
    if ($result->num_rows > 0) {
        // User login successful

        // Redirect to game.html with the username
        echo "<script>window.location.href = 'index.html?name=" . urlencode($name) . "';</script>";
        exit();
    } else {
        // User login failed
        echo "<script>alert('Invalid name or password'); window.location.href='./login.html';</script>";
    }

    // Close the connection
    $stmt->close();
    $conn->close();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: #f0f0f0;
    }

    .container {
      background-color: #ffe0e000;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      max-width: 400px;
      width: 100%;
      text-align: center;

    }

    form {
      display: flex;
      flex-direction: column;
      gap: 1px;
      border-radius: 10px;
      width: 400px;
      border: 5px solid rgb(255, 255, 255);
    }

    button {
      background-color:green;
      color: rgb(0, 0, 0);
      padding: 10px 15px;
      border: none;
      border-radius: 10px;
      cursor: pointer;
    }

    button:hover {
      background-color: #0056b3;
    }

    a {
      color: #007BFF;
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }
    video {
      position: fixed;
      top: 50%;
      left: 50%;
      min-width: 100%;
      min-height: 100%;
      width: auto;
      height: auto;
      transform: translateX(-50%) translateY(-50%);
      z-index: -1;
    }
    label {
      display: block;
      margin-bottom: 5px;
    }
    input {
      width: 100%;
      padding: 8px;
      margin-bottom: 10px;
      box-sizing: border-box;
    }
  </style>
  <title>Login Page</title>
</head>
<body>
<video autoplay muted loop id="myVideo">
    <source src="img/tree2.mp4" type="video/mp4">
</video>
  <div class="container">
    <form method="post" action="dinodb.php">
        <h1 style="color: #04c4ff; text-align: center;">☠️Wild Run☠️</h1>
        <h3 style="color: #ffffff; text-align: center;">Login</h3>
        <label for="name" ><P style="color: #f0f0f0;">Name:</P></label>
        <input type="text" id="name" name="name"><br><br>
        
        <label for="password"><P style="color: #f0f0f0;">Password:</P></label>
        <input type="password" name="password"><br><br>
        
        <button type="submit">Login</button>
    </form>

    <p style="color: #f0f0f0;">Don't have an account? <a href="signup.html">Sign Up</a></p>
  </div>

  <script>

  </script>
</body>
</html>