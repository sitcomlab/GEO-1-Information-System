<?php
$dbconn = pg_connect("host=giv-konkol.uni-muenster.de port=5432 dbname=GEO1 user=postgres password=navigeo1")
	or die('Verbindungsaufbau fehlgeschlagen: ' . pg_last_error());

	header("Content-Type: text/html; charset=utf-8");  

	//Name to be deleted
	$name = $_POST['Name'];
	
	$query6=pg_query($dbconn,"DELETE FROM \"GEO1\" WHERE \"Name\"='".$name."';");
?>