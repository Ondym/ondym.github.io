<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dotazník</title>
  <link rel="stylesheet" href="form.css">
  <link rel="stylesheet" href="style.css">
  <style>
    .thanks{
    width: 100%;
    text-align: center;
    margin-top: 20px;
    font-size: 50px;
    text-decoration: underline;
    text-decoration-color: var(--radioLabel-color);
}
  </style>
</head>
<body>
  
</body>
</html>

<?php
// Retrieve the values from the form
$age = $_POST['age'];
$gender = $_POST['gender'];
$plays_games = $_POST['plays-games'];
$reflexes = $_POST['reflexes'];


if (empty($_POST['how-often'])) {
  $how_often = "-";
} else {
  $how_often = $_POST['how-often'];
}
if (empty($_POST['what-kind'])) {
  $what_kind = -1;
} else {
  $what_kind = implode($_POST['what-kind']);
}
if (empty($_POST['online-games'])) {
  $online_games = "-";
} else {
  $online_games = $_POST['online-games'];
}

// Connect to MySQL database
$servername = "sql4.webzdarma.cz";
$username = "*****************";
$password = "****************";
$dbname = "****************";

$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn -> connect_error) {
  echo "<div class='thanks'>NĚCO SE POKAZILO, ZKUSTE TO PROSÍM ZNOVU.</div>";
}


// Insert the values into the results table
$sql = "INSERT INTO results (`age`, `gender`, `plays_games`, `how_often`, `game_types`, `the_line`, `reflexes`) 
VALUES ('$age', '$gender', '$plays_games', '$how_often', '$what_kind', '$online_games', '$reflexes')";
// $sql = "INSERT INTO `testing` (`name`, `gender`, `age`) VALUES ('PEPA TESTR', '2', '9')";

if ($conn->query($sql) === TRUE) {
  echo "<div class='thanks'>DĚKUJEME ZA VYPLNĚNÍ</div>";
} else {
  echo "<div class='thanks'>Děkujeme za vyplnění dotazníku</div>";
}

$conn->close();
?>
