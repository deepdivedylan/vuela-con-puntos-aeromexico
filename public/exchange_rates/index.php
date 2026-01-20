<?php
// Set header to return JSON
header('Content-Type: application/json');

// --- Database Configuration ---
$env_path = dirname(__DIR__, 4) . '/.vuela-con-puntos-aeromexico';

try {
    if (!file_exists($env_path)) {
        throw new Exception("Environment file not found: " . $env_path);
    }
    $env = parse_ini_file($env_path);
    if ($env === false) {
        throw new Exception("Could not parse environment file.");
    }

    $servername = $env['MARIADB_HOSTNAME'];
    $username = $env['MARIADB_USERNAME'];
    $password = $env['MARIADB_PASSWORD'];
    $dbname = $env['MARIADB_DATABASE'];
    // Create a new MySQLi connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check for connection errors
    if ($conn->connect_error) {
        throw new Exception("Database connection failed: " . $conn->connect_error);
    }

    // SQL query to get the latest exchange rate
    $sql = "SELECT rate, timestamp FROM exchange_rates ORDER BY id DESC LIMIT 1";
    $result = $conn->query($sql);

    if ($result && $result->num_rows > 0) {
        // Fetch the result as an associative array
        $row = $result->fetch_assoc();

        // Prepare the response data
        $response = [
            'rate'      => (float) $row['rate'],
            'timestamp' => $row['timestamp']
        ];

        // Encode the response as JSON and output it
        echo json_encode($response);
    } else {
        // If no results are found, return a 404 error
        http_response_code(404);
        echo json_encode(['error' => 'No exchange rates found in the database.']);
    }

    // Close the database connection
    $conn->close();

} catch (Exception $e) {
    // If any other error occurs, return a 500 internal server error
    http_response_code(500);
    echo json_encode(['error' => 'A server error occurred: ' . $e->getMessage()]);
}
?>
