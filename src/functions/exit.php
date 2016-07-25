<?php
require_once('db_data.php');

$db = mysql_connect($mysql_host,$mysql_user,$mysql_password) or die(mysql_error());
mysql_select_db($mysql_database, $db);

mysql_query("DROP TABLE IF EXISTS 4dField");

mysql_close($db);
?>