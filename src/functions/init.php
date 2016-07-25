<?php
require_once('db_data.php');

$n = $_POST["n"];

$db = mysql_connect($mysql_host,$mysql_user,$mysql_password) or die(mysql_error());
mysql_select_db($mysql_database, $db);

mysql_query("DROP TABLE IF EXISTS 4dField");

mysql_query(
	"CREATE TABLE 4dField(
	id INT NOT NULL AUTO_INCREMENT, 
	PRIMARY KEY(id),
	x INT, 
	y INT,
	z INT,
	v INT,
	mine INT,
	flag INT,
	uncov INT
	)") or die(mysql_error()
);  

for($i = 0; $i < $n; $i++) {
	for($j = 0; $j < $n; $j++) {
		for($k = 0; $k < $n; $k++) {
			for($m = 0; $m < $n; $m++) {
				$mine = 0;
				$rand = rand(0, 100) / 100;
				if($rand > 0.75) $mine = 1;
				mysql_query("INSERT INTO 4dField(x, y, z, v, mine, flag, uncov) 
							VALUES('".$i."', '".$j."', '".$k."', '".$m."', '".$mine."', '0', '0') ") 
							or die(mysql_error());  				
			}
		}
	}
}

$result = mysql_query("SELECT * FROM 4dField WHERE id = 1");
$row = mysql_fetch_array($result);
$x = $row['x'];
$y = $row['y'];
$z = $row['z'];
$v = $row['v'];
$mine = $row['mine'];
$flag = $row['flag'];
$uncov = $row['uncov'];

mysql_close($db);
echo "(".$x.", ".$y.", ".$z.", ".$v.") ".$mine.", ".$flag.", ".$uncov;
?>

