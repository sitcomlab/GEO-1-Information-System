<?php
	$people = fopen("persons.txt","r");
	$allPeople = '';
	
	while(!feof($people)){
		$zeile = fgets($people);
		$allPeople = $allPeople.$zeile;
	}
  
	$name = $_POST['Name']; 
	$allPeople = explode(";",$allPeople);
	$slot = array_search($name, $allPeople);
	unset($allPeople[$slot]);
	unset($allPeople[$slot+1]);
	unset($allPeople[$slot+2]);
	
	$newAllPeople = "";
	for ( $i = 0; $i < count($allPeople); $i++){
		if (!empty($allPeople[$i])) {
			$newAllPeople = $newAllPeople.$allPeople[$i].";";
		}	
	}
	file_put_contents("persons.txt", $newAllPeople);
	fclose($people);
	
	
	
	$rooms = fopen("allRooms.txt","r");
   	$allStaff = '';
	$name = $_POST['Name']; 
	while(!feof($rooms)){
		$zeile = fgets($rooms);
		$allStaff = $allStaff.$zeile;
	}
	
	$allStaff = explode(";",$allStaff);
	
	$hit="";
	$order = "";
	for ( $i = 0; $i < count($allStaff)-2; $i+=3){
		$newName;
		if (strpos($allStaff[$i+2],",")!==false){
			$names = explode(",",$allStaff[$i+2]);
			for ( $j = 0; $j < count($names); $j++ ){
				$divide = strpos(trim($names[$j]), " ");
				$first = substr($names[$j],0,$divide+1);
				$second = substr($names[$j],$divide+1,strlen($names[$j]));
				$newName = trim($second).",".trim($first);
		
				if ( $newName == $name){
					$hit = $i+2;
					$order = $j;
				}
			}
		}
		else{
			$divide = strpos(trim($allStaff[$i+2]), " ");
			$first = substr($allStaff[$i+2],0,$divide+1);
			$second = substr($allStaff[$i+2],$divide+1,strlen($allStaff[$i+2]));	
			$newName = trim($second).",".trim($first);
			if ( $newName == $name){
					$hit = $i+2;
					
			}
		}
	}
	
	$newEntry="";
	if (strpos($allStaff[$hit],",")!==false){
		$temp = explode(",",$allStaff[$hit]);	
		$amountTemp = count($temp);
		unset($temp[$order]);
		
		if (count($temp)>1){
			for ($k=0;$k<$amountTemp;$k++){
				if (!empty($temp[$k])) {$newEntry = $newEntry.$temp[$k].",";echo $newEntry;}
			}
			$newEntry = substr($newEntry,0,strlen($newEntry)-1);
			$allStaff[$hit] = $newEntry;}
		elseif ($order==1){
			$newEntry = $temp[0];
			$allStaff[$hit] = $newEntry;
		}
		else{
			$newEntry = $temp[1];
			$allStaff[$hit] = $newEntry;}
	}
	else{
		unset($allStaff[$hit]);
		unset($allStaff[$hit-1]);
		unset($allStaff[$hit-2]);
	}	
	
	$allStaff = array_values($allStaff);
	$newAllStaff = "";
	for ( $i = 0; $i < count($allStaff); $i++){

			$newAllStaff = $newAllStaff.$allStaff[$i].";";
			
	}
	echo $newAllStaff;
	file_put_contents("allRooms.txt", $newAllStaff);

?>