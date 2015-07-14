<?php
$dbconn = pg_connect("host=giv-konkol.uni-muenster.de port=5432 dbname=GEO1 user=postgres password=navigeo1")
	or die('Verbindungsaufbau fehlgeschlagen: ' . pg_last_error());

$type = gethostbyname($_GET['type']);	
$result = "";

switch ($type) {
    case "room":
		$result = pg_query($dbconn, "SELECT * FROM \"GEO1\" ORDER BY \"Room\";");
        break;
    case "person":
		$result = pg_query($dbconn, "SELECT * FROM \"GEO1\" WHERE \"Type\" = 'p' ORDER BY \"Name\";");
        break;
    case "institute":
		$result = pg_query($dbconn, "SELECT * FROM \"GEO1\" ORDER BY \"Affiliation\";");
        break;
}
	
$resultArray = pg_fetch_all($result);
$json = json_encode($resultArray);
echo $json;

?>