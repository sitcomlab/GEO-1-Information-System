<?php
$userdatei = fopen("allRooms.txt","r");
$allRooms = '';
while(!feof($userdatei))
   {
   $zeile = fgets($userdatei);
   $allRooms = $allRooms.$zeile;
   }
   echo $allRooms;
fclose($userdatei);
?>