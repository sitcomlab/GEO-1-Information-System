<?php
header("Content-Type: text/html; charset=utf-8");  
$userdatei = fopen("persons.txt","r");
$allRooms = '';
while(!feof($userdatei))
   {
   $zeile = fgets($userdatei);
   $allRooms = $allRooms.$zeile;
   }
   echo $allRooms;
fclose($userdatei);
?>