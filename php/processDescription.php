<?php
$userdatei = fopen("instructions.txt","r");
$allDescription = '';
while(!feof($userdatei))
   {
   $zeile = fgets($userdatei);
   $allDescription = $allDescription.$zeile;
   }
   echo $allDescription;
fclose($userdatei);
?>