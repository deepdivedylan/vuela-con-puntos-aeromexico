<?php
// A script to be run by cron to update exchange rates.
// It should be quiet unless there is an error.

// Since this is a CLI script, we want to see errors.
ini_set('display_errors', 1);
error_reporting(E_ALL);

try {
    // --- Configuration ---
    // The env file is expected to be two directories above this script's location.
    $env_path = __DIR__ . '/.vuela-con-puntos-aeromexico';

    if (!file_exists($env_path)) {
        throw new Exception("Environment file not found: " . $env_path);
    }
    $env = parse_ini_file($env_path);
    if ($env === false) {
        throw new Exception("Could not parse environment file.");
    }

    $apiKey = $env['OPEN_EXCHANGE_RATES_API_KEY'] ?? null;
    if (empty($apiKey)) {
        throw new Exception("OPEN_EXCHANGE_RATES_API_KEY is not set in the environment file.");
    }
    
    // --- Fetch from API ---
    $apiUrl = "https://openexchangerates.org/api/latest.json?app_id={$apiKey}&symbols=MXN&prettyprint=false&show_alternative=false";
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $apiUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    $apiResponse = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    if (curl_errno($ch)) {
        throw new Exception('Curl error: ' . curl_error($ch));
    }
    curl_close($ch);

    if ($http_code !== 200) {
        throw new Exception("API request failed with HTTP code {$http_code}. Response: {$apiResponse}");
    }

    $data = json_decode($apiResponse, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception("Failed to decode JSON response: " . json_last_error_msg());
    }

    $rate = $data['rates']['MXN'] ?? null;
    $timestamp = $data['timestamp'] ?? null;
    if (!is_numeric($rate)) {
        throw new Exception("Invalid or missing rate in API response. Response: {$apiResponse}");
    }
    if (!is_numeric($timestamp)) {
        throw new Exception("Invalid or missing timestamp in API response. Response: {$apiResponse}");
    }

    // --- Update Database ---
    $servername = $env['MARIADB_HOSTNAME'];
    $username = $env['MARIADB_USERNAME'];
    $password = $env['MARIADB_PASSWORD'];
    $dbname = $env['MARIADB_DATABASE'];

    $conn = new mysqli($servername, $username, $password, $dbname);
    if ($conn->connect_error) {
        throw new Exception("Database connection failed: " . $conn->connect_error);
    }
    
    // Set connection timezone to UTC to ensure correct timestamp storage
    if (!$conn->query("SET time_zone = '+00:00'")) {
        throw new Exception("Failed to set time_zone: " . $conn->error);
    }

    $stmt = $conn->prepare("INSERT INTO exchange_rates (rate, timestamp) VALUES (?, FROM_UNIXTIME(?))");
    if ($stmt === false) {
        throw new Exception("Failed to prepare statement: " . $conn->error);
    }
    
    $stmt->bind_param("di", $rate, $timestamp);
    if (!$stmt->execute()) {
        throw new Exception("Failed to execute statement: " . $stmt->error);
    }

    $stmt->close();
    $conn->close();

} catch (Exception $e) {
    // Write error to stderr for cron logging
    file_put_contents('php://stderr', $e->getMessage() . PHP_EOL);
    exit(1);
}

// Success is silent
exit(0);
?>
