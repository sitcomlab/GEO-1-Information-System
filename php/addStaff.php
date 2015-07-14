<?php
$dbconn = pg_connect("host=giv-konkol.uni-muenster.de port=5432 dbname=GEO1 user=postgres password=navigeo1")
	or die('Verbindungsaufbau fehlgeschlagen: ' . pg_last_error());

	header("Content-Type: text/html; charset=utf-8");  

	//Person to be added
	$firstName = $_POST['FirstName'];
	$lastName = $_POST['LastName'];
	$roomNumber = $_POST['Room'];
	$affiliation = $_POST['Affiliation'];
	
	$name = $lastName.','.$firstName;
	$StaffQuery=pg_query($dbconn,"insert into \"GEO1\" values ('".$name."',".$roomNumber.",'".$affiliation."',default,'p')");
?>