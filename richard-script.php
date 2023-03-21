<?php
// Get the form data
$eventName = $_POST['eventName'];
$eventDate = $_POST['eventDate'];
$venueName = $_POST['venueName'];
$venueAddress = $_POST['venueAddress'];
$venuePhone = $_POST['venuePhone'];
$venueEmail = $_POST['venueEmail'];
$ico = $_POST['ico'];
$accountNumber = $_POST['accountNumber'];
// $current_date = date('Y-m-d H:i:s');

// Connect to the database
$servername = "0.0.0.0";
$username = "NO";
$password = "NO";
// $schema = "MAINTEST";
$dbname = "sys";
$Eventtable = "EventList";
$Venuetable = "Venues";
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Insert the form data into the database
$sql = "INSERT INTO $Eventtable (NAME, DATE, VENUE) VALUES ('$eventName', '$eventDate', '$venueName')";
$sql = "INSERT INTO $Venuetable (Name, Address, Phone, Email) VALUES ('$venueName', '$venueAddress', '$venuePhone', '$venueEmail')";
if ($conn->query($sql) === TRUE) {
  echo "New record created successfully";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>