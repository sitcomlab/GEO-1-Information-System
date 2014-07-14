<?php
$userdatei = fopen("only_names.txt","r");
$allRooms = '';
while(!feof($userdatei))
   {
   $zeile = fgets($userdatei);
   $split = explode(";",$zeile);
   $trennen = strpos($split[2]," ",0);
   $prename = substr($split[2],0,$trennen);
   $lastname = substr($split[2],$trennen,strlen($zeile)-1);
   $newname = trim($lastname).",".$prename;	
   $allRooms = $allRooms.$newname.";".$split[1].";".$split[0].'</br>';
   }
   echo $allRooms;
fclose($userdatei);
?>