<?php

$userdatei = fopen("instructions.txt", "r");
while (!feof($userdatei)) {
	echo fgets($userdatei);
}
fclose($userdatei);
