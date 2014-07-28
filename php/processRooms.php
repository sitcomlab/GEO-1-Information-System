<?php

$dbconn = pg_connect("host=giv-konkol.uni-muenster.de port=5432 dbname=GEO1 user=postgres password=navigeo1")
    or die('Verbindungsaufbau fehlgeschlagen: ' . pg_last_error());

	$query=pg_query($dbconn,'SELECT * FROM "Rooms" order by "RoomNumber" Asc;');
	
	$wholeRooms = '';
	while ($line = pg_fetch_array($query, null, PGSQL_ASSOC)) {
		foreach ($line as $col_value) {		
			$wholeRooms = $wholeRooms.$col_value.";";
		}
    
	}
	echo $wholeRooms;   

?>