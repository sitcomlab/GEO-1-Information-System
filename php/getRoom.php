<?php
$dbconn = pg_connect("host=giv-konkol.uni-muenster.de port=5432 dbname=GEO1 user=postgres password=navigeo1")
	or die('Verbindungsaufbau fehlgeschlagen: ' . pg_last_error());

	$name = gethostbyname($_GET['name']); 
	$query=pg_query($dbconn,"SELECT \"Room\", \"Affiliation\" FROM \"GEO1\" WHERE \"Name\" = '".$name."'");
	$resultArray = pg_fetch_all($query);
	$json = json_encode($resultArray[0]);
	echo $json;
?>