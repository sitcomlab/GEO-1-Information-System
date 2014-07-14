<?php

	$firstName = $_POST['FirstName'];
	$lastName = $_POST['LastName'];	
	$room = $_POST['Room'];
	$affiliation = $_POST['Affiliation'];

	$personsTXT = fopen("persons.txt","a");

	$newEntry = $lastName.",".$firstName.";".$affiliation.";".$room.";";
	fwrite($personsTXT, $newEntry);

	fclose($personsTXT);


	$allRooms = fopen("allRooms.txt","r");
   	$allStaff = '';
	
	while(!feof($allRooms)){
		$zeile = fgets($allRooms);
		$allStaff = $allStaff.$zeile;
	}
	
	$allStaff = explode(";",$allStaff);
	
	function roomChecker($Staff,$Room){
		for ($i = 0; $i < count($Staff)-2; $i+=3 ){
			//echo $Staff[$i]; echo "|";
			//echo $Room;echo "|";
			if ( $Staff[$i] == $Room ){
				return $i;
				break;}
			if ( intval($Room) < intval($Staff[$i]) ){
				return $i;
				break;
			}	
			}	
		}
	


	$slot = roomChecker($allStaff,$room);
	$newStaff='';
	echo $allStaff[$slot];
	echo $room;

	
	if ( $allStaff[$slot] != $room){
		
		$array1 = Array();
		$array2 = Array();
		for ( $i = 0; $i < $slot; $i += 3){
			array_push($array1,$allStaff[$i]);
			array_push($array1,$allStaff[$i+1]);
			array_push($array1,$allStaff[$i+2]);			
		}
		for ( $i = $slot; $i < count($allStaff)-2; $i += 3){
			array_push($array2,$allStaff[$i]);
			array_push($array2,$allStaff[$i+1]);
			array_push($array2,$allStaff[$i+2]);			
		}
		array_push($array1,$room);
		array_push($array1,$affiliation);
		array_push($array1,$firstName." ".$lastName);
		$result = array_merge($array1,$array2);
		for ($i=0;$i<count($result)-2;$i+=3){
			$newStaff = $newStaff.$result[$i].';'.$result[$i+1].';'.$result[$i+2].';';
		}	
		
		file_put_contents("allRooms.txt", $newStaff);
	}
	else{
		if ($allStaff[$slot+2] == ''){
			$allStaff[$slot+2] = $allStaff[$slot+2].$firstName." ".$lastName; }
		else{
			$allStaff[$slot+2] = $allStaff[$slot+2].', '.$firstName." ".$lastName;
		}
		for ($i=0;$i<count($allStaff)-2;$i+=3){
			$newStaff = $newStaff.$allStaff[$i].';'.$allStaff[$i+1].';'.$allStaff[$i+2].';';
		}
		file_put_contents("allRooms.txt", $newStaff);
	}

?>	