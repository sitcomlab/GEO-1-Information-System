<?php
$dbconn = pg_connect("host=giv-konkol.uni-muenster.de port=5432 dbname=GEO1 user=postgres password=navigeo1")
    or die('Verbindungsaufbau fehlgeschlagen: ' . pg_last_error());
	
	$issue = $_POST['Actions'];

	$query=pg_query($dbconn,"Insert into \"LoggedData\" values (DEFAULT,'".$issue."');");
	echo $issue;
?>
