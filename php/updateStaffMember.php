<?php
$dbconn = pg_connect("host=giv-konkol.uni-muenster.de port=5432 dbname=GEO1 user=postgres password=navigeo1")
	or die('Verbindungsaufbau fehlgeschlagen: ' . pg_last_error());
		
	$oldname = gethostbyname($_POST['OldName']);	
	$firstname = gethostbyname($_POST['FirstName']);	
	$secondname = gethostbyname($_POST['LastName']);
	$room = gethostbyname($_POST['Room']);
	$name = $secondname.",".$firstname;
	$room = explode(".",$room);
	
	//Because of any reason $room is always something like 0.0.0.235
	$room = intval($room[count($room)-1]);

	
	$result = pg_query($dbconn,"SELECT \"ID\" FROM \"GEO1\" WHERE \"Name\" = '".$oldname."'");

	$id = "";
	while ($line = pg_fetch_array($result, null, PGSQL_ASSOC)) {
		foreach ($line as $col_value) {		
			$id =  $col_value;
		}
    
	}
	
	$result = pg_query($dbconn,"UPDATE \"GEO1\" SET \"Room\" = ".$room." WHERE \"ID\" = ".$id.";");
	$result2 = pg_query($dbconn,"UPDATE \"GEO1\" SET \"Name\" = '".$name."' WHERE \"ID\" = '".$id."';");
	
?>