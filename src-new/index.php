<php header('Cache-Control: no-cache'); ?>
<!DOCTYPE html>
<html lang="pl">
<head>
<meta http-equiv='Content-Type' content='text/html; charset=UTF-8'>
<title>&rsaquo; HyperSaper4D # alfa</title>
<link rel="stylesheet" href="style.css" type="text/css">
<script type='text/javascript' src="includes/jquery-1.7.1.min.js"></script>
<script type='text/javascript' src="includes/text-effects.js"></script>
<link href='http://fonts.googleapis.com/css?family=Source+Code+Pro|Inconsolata|Oxygen+Mono&subset=latin,latin-ext' rel='stylesheet' type='text/css'>
<script type='text/javascript' src="main.js"></script>
</head>

<body>

<div id="wrapper">

	<header></header>

	<div id="intro">
		<div id="intro-text"><?php include('intro.php'); ?></div>
		<div id="intro-skip"><p id="skip">Przejdź do centrum dowodzenia</p></div>
	</div>

	<div id="game">

		<form onSubmit="cmd(); return false;" action="">
		<p>&rsaquo; <input id="in" type="text" name="name"></p>
		<input id="submit" type="submit" value="enter">
		</form>
		<div id="console"></div>

		<div id="help">
		<p>Protip: wpisz help, aby wyświetlić listę dostępnych komend.</p>
		<p><span id="watch-intro">[intro]</span></p>
		<br>
		<p id="stats"></p>
		</div>

	</div>

	<footer>
		<p>Do grania przyda Ci się <del>nowoczesna</del> przeglądarka z włączonym Javascriptem. 		
		Copyleft 2014 <a href="http://wiruje-astrolabium.tk" target="_blank">Mikołaj Kałasznikow</a>. Wszystkie prawa odwrócone. <span id="watch-intro">[intro]</span></p>
		
	</footer>

</div>

</body>
</html>