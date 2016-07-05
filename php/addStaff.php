<?php

require('bootstrap.inc.php');

$name = $_POST['LastName'] . ',' . $_POST['FirstName'];

$db->execute("INSERT INTO \"GEO1\" VALUES ($1, $2, $3, default, 'p')", array($name, $_POST['Room'], $_POST['Affiliation']));
