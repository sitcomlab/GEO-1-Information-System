<?php
	$dbconn = pg_connect("host=giv-konkol.uni-muenster.de port=5432 dbname=GEO1 user=postgres password=navigeo1")
		or die('Verbindungsaufbau fehlgeschlagen: ' . pg_last_error());

	header("Content-Type: text/html; charset=utf-8");  

	//Name to bel deleted
	$name = $_POST['Name'];
	
	//Get roomnumber of person to be deleted
	$queryRoomNumber=pg_query($dbconn,"SELECT \"room\" FROM \"Staff\" WHERE \"Name\"='".$name."';");
	$roomNumber = '';
	
	while ($line = pg_fetch_array($queryRoomNumber, null, PGSQL_ASSOC)) {
		foreach ($line as $col_value) {		
			$roomNumber = $col_value;
		}
	}
	
	//Get whole entry from table Rooms of the person to be deleted --> Room, Affiliation, Names
	$queryRoomsRow=pg_query($dbconn,"SELECT * FROM \"Rooms\" WHERE \"RoomNumber\"='".$roomNumber."';");
	
	//entry contains the row queried above
	$entry = array();
	while ($line = pg_fetch_array($queryRoomsRow, null, PGSQL_ASSOC)) {
		foreach ($line as $col_value) {		
			array_push($entry,$col_value);
		}
	}
	
	//Name has to be converted: Table Staff: LastName,FirstName	Table Rooms: FirstName LastName
	$newName = explode(",",$name);
	$newName = trim($newName[1]).' '.trim($newName[0]);
	
	//Has Names more than one name? If yes, delete only the particular name and keep room number and affiliation
	if (strpos($entry[2],",")!==false){
			$temp = explode(",",$entry[2]);
			$newEntry = '';
			for ( $i = 0; $i < count($temp); $i++){
				if (trim($temp[$i]) === $newName){
				}
				else{
					$newEntry = $newEntry.trim($temp[$i]).', ';
				}
			}
			$newEntry = substr($newEntry,0,strlen($newEntry)-2);
			$query7=pg_query($dbconn,"UPDATE \"Rooms\" SET \"Names\" = '".$newEntry."' WHERE \"RoomNumber\" = ".$roomNumber.";");
	}
	//If row contains only one name, whole row can be deleted
	else{
		$query4=pg_query($dbconn,"DELETE FROM \"Rooms\" WHERE \"RoomNumber\"='".$roomNumber."';");
	}
	$query6=pg_query($dbconn,"DELETE FROM \"Staff\" WHERE \"Name\"='".$name."';");
?>