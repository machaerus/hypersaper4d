<?php
require('db_data.php');
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

/* TODO:
sprawdzamy s¹siadów po wspó³rzêdnych.
dla ka¿dego z nich zwracamy odpowiednio:
0 - nie istnieje (brzeg planszy)
1 - istnieje, brak danych
2 - odkryty
3 - oflagowany

oraz iloœæ min wokó³ danego pola.

razem 80 pól do przeanalizowania. (kurwa, optymistycznie patrz¹c)
*/

$curr = array($x, $y, $z, $v);

$mines = 0;
$flags = 0;
$uncovs = 0;

for($i = -1; $i < 2; $i++) {
	for($j = -1; $j < 2; $j++) {
		for($k = -1; $k < 2; $k++) {
			for($m = -1; $m < 2; $m++) {
				$p = array($x+$i, $y+$j, $z+$k, $v+$m);
				if( !($p[0] >= 0 && $p[1] >= 0 && $p[2] >= 0 && $p[3] >= 0  &&  $p[0] < 8 && $p[1] < 8 && $p[2] < 8 && $p[3] < 8) ) {
					// CHUJOWO, NIE MA TAKIEGO POLA
					$neighbours[] = 0;
				}
				else if($curr != $p) {	// pomijamy pole, na którym siê znajdujemy.
					$field = search($x+$i, $y+$j, $z+$k, $v+$m);
					if($field['mine'] == 1) $mines++;
					if($field['flag'] == 1) {
						$flags++;
						$neighbours[] = 3;
					}
					if($field['uncov'] == 1) {
						$uncovs++;
						$neighbours[] = 2;
					}
				}
				else $neighbours[] = 1;
			}
		}
	}
}
mysql_close($db);

$res = "";
for($i = 0; $i < sizeof($neighbours); $i++) {
	$res .= ($neighbours[$i] . " ");
}

echo $flag." ".$uncov." ".$mines." ".$flags." ".$uncovs." ".$res;
?>