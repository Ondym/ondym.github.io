<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Výsledky</title>
    <link rel="stylesheet" href="style.css">
    <style>
        div{display: none;}
    </style>
</head>
<body>
<h1 class="thanks">
    Výsledky nebo něco takovýho:
</h1>
</body>
</body>
</html>

<?php
$password = $_POST['heslo'];
$uname = $_POST['admin-username'];
if ($uname === "tvoje máma" && $password === "1235") {
    
    $servername = "sql4.webzdarma.cz";
    $username = "****";
    $password = "****";
    $dbname = "****";
    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
    }

    $sql = "SELECT `age`, `gender`, `plays_games`, `how_often`, `game_types`, `the_line`, `reflexes` FROM results";
    $result = $conn->query($sql);

    echo "<table>";
    echo "<thead>";
    echo "<th>Věk</th> <th>Pohlaví</th> <th>Hraje hry</th> <th>Jak často hraje hry</th> <th>Typy her</th> <th>Online/offline</th>  <th>Výsledky testu [ms]</th>";
    echo "</thead>";
    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
        echo 
        "<tr><td>" . $row["age"]. "</td>
        <td>" . $row["gender"]."</td>
        <td>" . $row["plays_games"] . "</td>
        <td>" . $row["how_often"] . "</td>
        <td>" . $row["game_types"]. "</td>
        <td>" . $row["the_line"]. "</td>
        <td>" . $row["reflexes"]. "</td></tr>";
        }
    } else {
        echo "0 results";
    }
    $conn->close();
    echo "</table>";
} else {
    echo "<h1 class='thanks'>ŠPATNÉ UŽIVATELSKÉ ÚDAJE</h1>";
} 
?>