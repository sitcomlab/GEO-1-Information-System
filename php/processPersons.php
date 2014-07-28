<?php
$dbconn = pg_connect("host=giv-konkol.uni-muenster.de port=5432 dbname=GEO1 user=postgres password=navigeo1")
    or die('Verbindungsaufbau fehlgeschlagen: ' . pg_last_error());

	$query=pg_query($dbconn,'SELECT * FROM "Staff";');
	
	$wholeStaff = '';
	while ($line = pg_fetch_array($query, null, PGSQL_ASSOC)) {
		foreach ($line as $col_value) {		
			$wholeStaff = $wholeStaff.$col_value.";";
		}
    
	}
	echo $wholeStaff;

?>