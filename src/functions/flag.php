<?php
require_once('db_data.php');

$db = mysql_connect($mysql_host,$mysql_user,$mysql_password) or die(mysql_error());
mysql_select_db($mysql_database, $db);

function search($x, $y, $z, $v) {
	$result = mysql_query("SELECT * FROM 4dField WHERE (x = " . $x . " AND y = " . $y . " AND z = " . $z . " AND v = " . $v .")");
	return mysql_fetch_array($result);
}

$x = $_POST['x'];
$y = $_POST['y'];
$z = $_POST['z'];
$v = $_POST['v'];

$row = search($x, $y, $x, $v);

$flag = $row['flag'];
$uncov = $row['uncov'];
$id = $row['id'];

if($uncov == 1) {
	$msg = "Pole zostało już odkryte.";
}
else if($flag == 0) {
	mysql_query("UPDATE 4dField SET flag = '1' WHERE id = ".$id);
	$msg = "Postawiono flagę na polu (".$x.", ".$y.", ".$z.", ".$v.").";
}
else {
	mysql_query("UPDATE 4dField SET flag = '0' WHERE id = ".$id);
	$msg = "Zdjęto flagę z pola (".$x.", ".$y.", ".$z.", ".$v.").";
}

mysql_close($db);
echo $msg;

?>



