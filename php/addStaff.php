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
	$StaffQuery=pg_query($dbconn,"insert into \"Staff\" values ('".$name."','".$affiliation."',".$roomNumber.")");
	
	$query=pg_query($dbconn,'SELECT * FROM "Rooms" where "RoomNumber"='.$roomNumber.';');
	$entry = array();
	
	while ($line = pg_fetch_array($query, null, PGSQL_ASSOC)) {
		foreach ($line as $col_value) {		
			array_push($entry,$col_value);
		}
	}
	
	if ( count($entry) < 1){
		$RoomsQuery=pg_query($dbconn,"insert into \"Rooms\" values (".$roomNumber.",'".$affiliation."','".$firstName." ".$lastName."');");
	}
	else{
		$entry[2] = $entry[2].", ".$firstName." ".$lastName;
		$RoomsQuery=pg_query($dbconn,"UPDATE \"Rooms\" SET \"Names\" = '".$entry[2]."' WHERE \"RoomNumber\" = ".$roomNumber.";");
	}
?>