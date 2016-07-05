<?php

require('bootstrap.inc.php');

$db->execute("INSERT INTO \"LoggedData\" VALUES (DEFAULT, $1)", array($_POST['Actions']));
echo $_POST['Actions'];
