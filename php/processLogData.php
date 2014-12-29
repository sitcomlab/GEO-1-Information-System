<?php
	$dbconn = pg_connect("host=giv-konkol.uni-muenster.de port=5432 dbname=GEO1 user=postgres password=navigeo1")
		or die('Verbindungsaufbau fehlgeschlagen: ' . pg_last_error());

	header("Content-Type: text/html; charset=utf-8");  

	//Get roomnumber of person to be deleted
	$queryRoomNumber=pg_query($dbconn,"SELECT * FROM \"LoggedData\" order by \"ID\";");
	
	$logArray = array();
	
	function getDay($log){
		$temp = explode(";", $log);
		$date = explode(",", $temp[0]);
		$temp = explode(" ", $date[0]);
		$date = $temp[0]." ".$temp[1]." ".$temp[2]." ".$temp[3];
		return $date;
	}
	
	while ($line = pg_fetch_array($queryRoomNumber, null, PGSQL_ASSOC)) {
		$row_array['id'] = $line['ID'];
		$row_array['log'] = $line['Logging'];
		$row_array['date'] = getDay($line['Logging']);

		array_push($logArray,$row_array);
	}
	echo json_encode($logArray);
?>