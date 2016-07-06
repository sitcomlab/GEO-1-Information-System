<?php

require('bootstrap.inc.php');

$result = $db->fetch_one('SELECT "Room", "Affiliation" FROM "GEO1" WHERE "Name" = $1 LIMIT 1', array($_GET['name']));
echo json_encode($result);
