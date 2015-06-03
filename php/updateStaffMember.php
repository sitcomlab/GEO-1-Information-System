<?php
	$dbconn = pg_connect("host=giv-konkol.uni-muenster.de port=5432 dbname=GEO1 user=postgres password=navigeo1")
		or die('Verbindungsaufbau fehlgeschlagen: ' . pg_last_error());
		
	$firstname = gethostbyname($_POST['firstname']);	
	$secondname = gethostbyname($_POST['secondname']);
	$room = gethostbyname($_POST['room']);
	
?>