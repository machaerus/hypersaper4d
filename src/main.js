var uncov;	// ilość odsłoniętych pól
var flags;	//ilość postawionych flag
var n = 7;

// wygrana <=> uncov + flags = n^4

function print(str) {
	$("#left .console").prepend("<p>> "+str+"</p>");
	$("#in").val("");
}

function printi(str) {	// kursywa
	$("#left .console").prepend("<p class='i'>> "+str+"</p>");
	$("#in").val("");
}

function printx(str) {	// przekreślenie
	$("#left .console").prepend("<p class='x'>> "+str+"</p>");
	$("#in").val("");
}

function printr(str) {  // prawa konsola
	$("#right .console").prepend("<p>> "+str+"</p>");
	$("#in").val("");
}


function init() {
	$.ajax({
		url: "functions/init.php",
		type: "POST",
		data: "n=" + n,
		success: function(text) {
			printr(text);
		},
		error: function() {
			alert('Chuj! Nie działa.');
		},
		cache: false,
		async: false
	});	
	print("Inicjalizacja zakończona pomyślnie. Graj se. xD");	
}

function exit() {
	$.ajax({
		url: "functions/exit.php",
		type: "POST",
		success: function() {
			print("Chuj, przegrałeś.");
		},
		error: function() {
			alert('Chuj! Nie działa.');
		},
		cache: false,
		async: false
	});	
}

function disp(coords) {
	$.ajax({
		url: "functions/disp.php",
		type: "POST",
		data: "x=" + coords.x + "&y=" + coords.y + "&z=" + coords.z + "&v=" + coords.v,
		success: function(text) {
			var res = text.split(' ');		
			printr("");
			printr("Odkryte sąsiednie układy: " + res[4]);
			printr("Flagi w sasiedztwie: " + res[3]);
			printr("Miny w sąsiedztwie: " + res[2]);
				if(res[1] == 1) cond = "tak"; else cond = "nie";
			printr("Układ odkryty: " + cond);
				if(res[0] == 1) cond = "tak"; else cond = "nie";
			printr("Układ oflagowany: " + cond);
			printr("Analiza układu ("+coords.x+", "+coords.y+", "+coords.z+", "+coords.v+")");
		},
		error: function() {
			alert('Chuj! Nie działa.');
		},
		cache: false,
		async: false
	});	
}

function flag(coords) {
	$.ajax({
		url: "functions/flag.php",
		type: "POST",
		data: "x=" + coords.x + "&y=" + coords.y + "&z=" + coords.z + "&v=" + coords.v,
		success: function(text) {
			printr(text);
		},
		error: function() {
			alert('Chuj! Nie działa.');
		},
		cache: false,
		async: false
	});		
}

function check(coords) {
	$.ajax({
		url: "functions/check.php",
		type: "POST",
		data: "x=" + coords.x + "&y=" + coords.y + "&z=" + coords.z + "&v=" + coords.v,
		success: function(text) {
			var res = parseInt(text);
			printr(text);

			switch(res) {
				case 2:
					printr("Pole ("+coords.x+", "+coords.y+", "+coords.z+", "+coords.v+") jest już odkryte.");
					break;
				case 1:
					printr("Pole ("+coords.x+", "+coords.y+", "+coords.z+", "+coords.v+") jest puste. Ciesz się życiem.");
					break;
				case 0:
					exit();
					break;
				default:
					printr("Błąd systemu.");
			}; 
		},
		error: function() {
			alert('Chuj! Nie działa.');
		},
		cache: false,
		async: false
	});		
}


//----------------------



function cmd() {
	var str = $("#in").val();
	$("#left .console").prepend("<p class='user'>> "+str+"</p>");
	$("#in").val("");
	
	var args = new Array();
	args = str.split(' ');
	
	switch(args[0]) {
		case "help":
			printi("w miejsce x y z v wpisz oddzielone spacjami współrzędne całkowite z zakresu [0;6].");
			printi("exit - zakończ grę.");
			printi("check x y z v - sprawdź pole,");
			printi("flag x y z v - oflaguj pole/zdejmij flagę,");
			printi("disp x y z v - wyświetl pole,");
			printi("init - stwórz nową planszę,");
			break;
		case "init":
			print("Inicjalizacja przestrzeni. Proszę czekać...");
			init();
			break;
		case "disp":
			if(args[1] >= 0 && args[2] >= 0 && args[3] >= 0 && args[4] >= 0) {
				var coords = {
					x : args[1],
					y : args[2],
					z : args[3],
					v : args[4]
				};
				disp(coords);
			} else print("Nieprawidłowe argumenty wywołania.");
			break;
		case "flag":
			if(args[1] >= 0 && args[2] >= 0 && args[3] >= 0 && args[4] >= 0) {
				var coords = {
					x : args[1],
					y : args[2],
					z : args[3],
					v : args[4]
				};
				flag(coords);
			} else print("Nieprawidłowe argumenty wywołania.");
			break;
		case "check":
			if(args[1] >= 0 && args[2] >= 0 && args[3] >= 0 && args[4] >= 0) {
				var coords = {
					x : args[1],
					y : args[2],
					z : args[3],
					v : args[4]
				};
				check(coords);
			} else print("Nieprawidłowe argumenty wywołania.");
			break;
		case "exit":
			$("#left .console").html("");
			$("#right .console").html("");
			exit();
			break;
		default:
			;
	};
	
	delete args;
}



$(document).ready( function() {
	
	print("****************************************************");
	print("****** I INNOWACYJNEJ GRZE EVER, JEBANA KURWO ******");
	print("********** WITAJ W NAJBARDZIEJ HARDKOROWEJ *********");
	print("*****************  HYPERSAPPER 4D  *******************");
	print("****************************************************");
	print("");
	print("Wpisz 'help' jeśli potrzebujesz pomocy biedaku.");
	print("Wpisz 'init' by rozpocząć.");
	
	$("#in").focus();
	
	$("#intro-text").typewriter();
	
	$("#skip").click(
		function() {	
			$("#intro").css('display', 'none');
			$("#intro").css('opacity', '0');
			$("#game").css('display', 'block');
			$("#game").animate({opacity: 1}, 700);
			
			$("#in").focus();		
		}
	);
	
	$("#watch-intro").click(
		function() {	
			$("#game").css('display', 'none');
			$("#game").css('opacity', '0');
			$("#intro").css('display', 'block');
			$("#intro").animate({opacity: 1}, 700);		
		}
	);
	
});

