<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Výsledky</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="form.css">
    <style>
        div{display: none;}
        button{display: inline;}
        h2{height: 2.2em; display: block; text-align: center}
    </style>
</head>
<body>

<script>
    function averageShit() {
        document.getElementById("filtr").style.display = "none";
        let  bunky = document.getElementsByClassName("reflex-column");
        for (let i = 0; i < bunky.length; i++) {
            let cell = bunky[i];
            let text = cell.innerText.split(",");
            text.sort((a, b) => a-b);
            while (text[0] == "-1") {
                text.shift();
            }
            text.shift();
            text.pop();
            console.log(text);
            cell.innerText = text;
        }
    }
</script>
</body>
</html>

<?php
if (empty($_POST['heslo']) && empty($_POST['admin-username'])) {
    $password = "-";
    $uname = "-";
} else {
    $password = $_POST['heslo'];
    $uname = $_POST['admin-username'];
}
if ($uname === "tvoje máma" && $password === "1235") {
    echo '<h1 class="thanks" onload="">
    Výsledky nebo něco takovýho:
    <h2>
        <button id="filtr" onclick="averageShit()">Filtrovat výsledky testu</button>
    </h2>
    </h1>';
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

    $sql = "SELECT * FROM results";
    $result = $conn->query($sql);

    echo "<table>";
    echo "<thead>";
    echo "<th class='identifier'>ID</th> <th class='identifier'>Čas vyplnění</th> <th>Věk</th> <th>Pohlaví</th> <th>Hraje hry</th> <th>Jak často hraje hry</th> <th>Typy her</th> <th>Online/offline</th>  <th>Výsledky testu [ms]</th>";
    echo "</thead>";
    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
        echo 
        "<tr><td>" . $row["id"]. "</td>
        <td>" . $row["datetime"]."</td>
        <td>" . $row["age"]."</td>
        <td>" . $row["gender"]."</td>
        <td>" . $row["plays_games"] . "</td>
        <td>" . $row["how_often"] . "</td>
        <td>" . $row["game_types"]. "</td>
        <td>" . $row["the_line"]. "</td>
        <td class='reflex-column'>" . $row["reflexes"]. "</td></tr>";
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