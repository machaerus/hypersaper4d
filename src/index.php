<!DOCTYPE HTML PUBLIC '-//W3C//DTD HTML 4.01 Transitional//EN'>
<html lang="pl">
<head>
<meta http-equiv='Content-Type' content='text/html; charset=UTF-8'>
<meta http-equiv="Content-Language" content="pl">
<title>## HyperSapper4D ##</title>
<link rel="stylesheet" href="style.css" type="text/css">
<script type='text/javascript' src="includes/jquery-1.7.1.min.js"></script>
<script type='text/javascript' src="includes/text-effects.js"></script>
<script type='text/javascript' src="main.js"></script>
</head>

<body>

<div id="wrapper">

	<header></header>

	<div id="intro">
		<article id="intro-text"><?php include('intro.php'); ?></article>
		<article id="intro-skip"><p id="skip">Przejdź do centrum dowodzenia.</p></article>
	</div>

	<div id="game">
		<section id="left">
			<form onSubmit="cmd(); return false;" action="">
			<p><input id="in" type="text" name="name"></p>
			<input id="submit" type="submit" value="enter">
			</form>
			<div class="console"></div>
		</section>
		<section id="right">
			<div class="console"></div>
		</section>
	</div>

	<footer>
		<p>Do grania przyda Ci się nowoczesna przeglądarka z włączonym Javascriptem. 		
		2012 <mark>by</mark> <a href="http://wiruje-astrolabium.tk" target="_blank">Hakkon</a>. Wszystkie prawa odwrócone. <span id="watch-intro">[intro]</span></p>
		
	</footer>

</div>

</body>
</html>