<?php
function search($x, $y, $z, $v) {
	$result = mysql_query("SELECT * FROM 4dField WHERE (x = " . $x . " AND y = " . $y . " AND z = " . $z . " AND v = " . $v .")");
	return mysql_fetch_array($result);
}
?>