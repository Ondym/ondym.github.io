<?php
// Retrieve the values from the form
$age = $_GET['age'];
$gender = $_GET['gender'];
$play_games = $_GET['play-games'];
$how_often = $_GET['how-often'];
$what_kind = $_GET['what-kind'];
$online_games = $_GET['online-games'];

echo "$age, $gender, $play_games, $how_often, $what_kind, $online_games";

// Connect to MySQL database
$servername = "sql4.webzdarma.cz";
$username = "testingoszeu6472";
$password = "Jednadvatri123.";
$dbname = "testingoszeu6472";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn -> connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$testii = $conn->query("SELECT * FROM `results`");
echo "The database: $testii";

// Insert the values into the results table
$sql = "INSERT INTO results (`age`, `gender`, `play-games`, `how-often`, `game-types`, `is-online`) VALUES ('$age', '$gender', '$play_games', '$how_often', '$what_kind', '$online_games')";

if ($conn->query($sql) === TRUE) {
  echo("<br>NEPOSRALO");
  echo "New record created successfully";
} else {
  echo("<br>POSRALO");
  echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
