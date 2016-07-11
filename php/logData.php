<?php

require('../admin/php/bootstrap.inc.php');

$db->execute('INSERT INTO "LoggedData" ("Logging") VALUES ($1)', array($_POST['Actions']));

echo $_POST['Actions'];
