<?php

require('../admin/php/bootstrap.inc.php');

$result = array();
switch ($_GET['type']) {
	case "room":
		$result = $db->fetch_all('SELECT * FROM "GEO1" ORDER BY "Room"');
		break;
	case "person":
		$result = $db->fetch_all('SELECT * FROM "GEO1" WHERE "Type" = \'p\' ORDER BY "Name"');
		break;
	case "institute":
		$result = $db->fetch_all('SELECT * FROM "GEO1" ORDER BY "Affiliation"');
		break;
}

echo json_encode($result);
