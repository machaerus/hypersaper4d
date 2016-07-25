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

/*
function check($a, $b, $c, $d) {
	$row = search($a, $b, $c, $d);
	if();
	else {	// jeśli pole nie było jeszcze odkryte, a jest puste
		$msg = "Pole (".$a.", ".$b.", ".$c.", ".$d.") jest puste. Ciesz się życiem.";
		// odkrywamy wszystkich pustych sąsiadów
	}
}
*/

$row = search($x, $y, $z, $v);
	
if($row['uncov'] == 1) {
	//$msg = "Pole (".$x.", ".$y.", ".$z.", ".$v.") zostało już odkryte.";
	$msg = "2";
}
else if($row['mine'] == 1) {
	//$msg = "Chuj, przegrałeś.";
	$msg = "0";
}
else {
	//$msg = "Pole (".$a.", ".$b.", ".$c.", ".$d.") jest puste. Ciesz się życiem.";
	$msg = "1";
	// przeszukujemy teraz sąsiadów aby odkryć puste pola
	// tego mysql tu nie będzie, zamiast tego chłodne rekurencyjne wywołanie check() po sąsiadach
	mysql_query("UPDATE 4dField SET flag = 0 WHERE id = ".$row['id']);
	mysql_query("UPDATE 4dField SET uncov = 1 WHERE id = ".$row['id']);
}

mysql_close($db);
echo $msg;

?>



