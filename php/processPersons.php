<?php
$dbconn = pg_connect("host=giv-konkol.uni-muenster.de port=5432 dbname=GEO1 user=postgres password=navigeo1")
    or die('Verbindungsaufbau fehlgeschlagen: ' . pg_last_error());

	$wholeStaff = '';
	$type = gethostbyname($_GET['type']);
       
	if ($type == "autocomplete"){
		$query=pg_query($dbconn,'SELECT "Name" FROM "Staff";');
		while ($line = pg_fetch_array($query, null, PGSQL_ASSOC)) {
			foreach ($line as $col_value) {		
				$wholeStaff = $wholeStaff.$col_value.";";
			}
		}
	}else{
		$query=pg_query($dbconn,'SELECT * FROM "Staff";');
		while ($line = pg_fetch_array($query, null, PGSQL_ASSOC)) {
			foreach ($line as $col_value) {		
				$wholeStaff = $wholeStaff.$col_value.";";
			}
		
		}
	}
	echo $wholeStaff;

?>