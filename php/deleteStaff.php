<?php

require('bootstrap.inc.php');

$db->execute("DELETE FROM \"GEO1\" WHERE Name = $1", array($_POST['name']));
