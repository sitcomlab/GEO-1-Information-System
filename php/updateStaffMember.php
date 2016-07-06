<?php

require('bootstrap.inc.php');

$name = $_POST['LastName'] . "," . $_POST['FirstName'];

$result = $db->fetch_one('SELECT "ID" FROM "GEO1" WHERE "Name" = $1 LIMIT 1', array($_POST['OldName']));
if (!empty($result['ID'])) {
	$db->execute('UPDATE "GEO1" SET "Room" = $1 WHERE "ID" = $2', array($_POST['Room'], $result['ID']));
	$db->execute('UPDATE "GEO1" SET "Name" = $1 WHERE "ID" = $2', array($name, $result['ID']));
}