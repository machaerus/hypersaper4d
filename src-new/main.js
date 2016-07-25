var rev;			// ilość odsłoniętych pól
var flags;			// ilość postawionych flag
var mines;			// ilość min
var SIZE = 10;		// rozmiar planszy
var Space;			// plansza
var initiated = false;
var LEVEL = 5;		// poziom trudności (szansa na minę, %)

function print(str) {
	$("#console").prepend("<p>"+str+"</p>");
	$("#in").val("");
}

function cmd() {
	var str = $("#in").val();
	$("#console").prepend("<p>&rsaquo; "+str+"</p>");
	$("#in").val("");
	
	var args = str.split(' ');

	switch(args[0]) {
		case "help":
			print("GL/HF.");
			print("Wpisz 'jestemdebilem' aby uzyskać dodatkową pomoc.");
			print("<span style='color: yellow'>Uwaga: użycie polecenia check grozi przegraniem w grę.</span>");
			print("x, y, z, t to współrzędne całkowite z przedziału [0;9].");
			print("* info - wyświetl więcej informacji.");
			print("* check x y z t - odsłoń pole o zadanych współrzędnych;");
			print("* flag x y z t - oflaguj/zdejmij flagę z pola o zadanych współrzędnych;");
			print("&nbsp;&nbsp;np. 'cast y 2 t 5' wyświetli przekrój przy ustalonych y=2, t=5;");
			print("&nbsp;&nbsp;za x, y wstaw odpowiednie parametry liczbowe,");
			print("&nbsp;&nbsp;za X, Y wstaw wybrane nazwy wymiarów (x, y, z, t),");
			print("* cast X x Y y - wyświetl przekrój przez planszę dla dwóch zadanych wymiarów:");
			print("* disp x y z t - wyświetl informacje na temat pola o zadanych współrzędnych;");
			print("* init - inicjalizacja nowej planszy gry;");
			print("* help - wyświetl tę pomoc;");
			print("Dostępne komendy:");
			break;
		case "info":
			print("-><-");
			print("Copyleft 2014. Wszystkie prawa odwrócone.");
			print("Kontakt: mikolaj.kalasznikow@gmail.com.");
			print("Autor: Mikołaj Kałasznikow.");
			print("Grasz w grę HyperSaper4D.");
			break;
		case "halp":
			print("So, i herd u liek Die Phänomenologie des Geistes.");
			break;
		case "huj":
			print("So, i herd u liek Die Phänomenologie des Geistes.");
			break;
		case "chuj":
			print("So, i herd u liek Die Phänomenologie des Geistes.");
			break;
		case "HUJ":
			print("So, i herd u liek Die Phänomenologie des Geistes.");
			break;
		case "CHUJ":
			print("So, i herd u liek Die Phänomenologie des Geistes.");
			break;
		case "jestemdebilem":
			print("HEHEE AAAAAAAAAAAAA KUHWAAAAAAAA");
			print("NIE DLA PSA, DLA PANA TO");
			break;
		case "init":
			init();
			initiated = true;
			break;
		case "clear":
			clear();
			break;
		case "disp":
			if(initiated) {
				if(args[1] >= 0 && args[2] >= 0 && args[3] >= 0 && args[4] >= 0) {
					var coords = {
						x : args[1],
						y : args[2],
						z : args[3],
						t : args[4]
					};
					Space[coords.x][coords.y][coords.z][coords.t].disp();
				} else print("Nieprawidłowe argumenty wywołania.");
			} else {
				print("Plansza gry nie została jeszcze utworzona. Wpisz init, aby ją utworzyć,..");
			}
			break;
		case "flag":
			if(initiated) {
				if(args[1] >= 0 && args[2] >= 0 && args[3] >= 0 && args[4] >= 0) {
					var coords = {
						x : args[1],
						y : args[2],
						z : args[3],
						t : args[4]
					};
					Space[coords.x][coords.y][coords.z][coords.t].flag();
				} else print("Nieprawidłowe argumenty wywołania.");
			} else {
				print("Plansza gry nie została jeszcze utworzona. Wpisz init, aby ją utworzyć,..");
			}
			break;
		case "check":
			if(initiated) {
				if(args[1] >= 0 && args[2] >= 0 && args[3] >= 0 && args[4] >= 0) {
					var coords = {
						x : args[1],
						y : args[2],
						z : args[3],
						t : args[4]
					};
					Space[coords.x][coords.y][coords.z][coords.t].check();
				} else print("Nieprawidłowe argumenty wywołania.");
			} else {
				print("Plansza gry nie została jeszcze utworzona. Wpisz init, aby ją utworzyć,..");
			}
			break;
		case "cast":
			if(initiated) {
				if((args[1] === "x" || args[1] === "y" || args[1] === "z" || args[1] === "t") 
					&& args[2] >= 0 
					&& (args[3] === "x" || args[3] === "y" || args[3] === "z" || args[3] === "t")
					&& args[4] >= 0) {
					var d1 = args[1];
					var d2 = args[3];
					var v1 = args[2];
					var v2 = args[4];
					var castView = "";

					if(d1 === "x" && d2 === "y") {
						castView += "+-----------------------------&#8594; t<br>";
						for(var i = 0; i < SIZE; i++) {
							castView += "| ";
							for(var j = 0; j < SIZE; j++) {
								castView = castView + " " + Space[v1][v2][i][j].show();
							}
							castView = castView + "<br>";
						}
						castView += "&#8595; z<br>";
					}
					else if(d1 === "x" && d2 === "z") {
						castView += "+-----------------------------&#8594; t<br>";
						for(var i = 0; i < SIZE; i++) {
							castView += "| ";
							for(var j = 0; j < SIZE; j++) {
								castView = castView + " " + Space[v1][i][v2][j].show();
							}
							castView = castView + "<br>";
						}
						castView += "&#8595; y<br>";
					}
					else if(d1 === "x" && d2 === "t") {
						castView += "+-----------------------------&#8594; z<br>";
						for(var i = 0; i < SIZE; i++) {
							castView += "| ";
							for(var j = 0; j < SIZE; j++) {
								castView = castView + " " + Space[v1][i][j][v2].show();
							}
							castView = castView + "<br>";
						}
						castView += "&#8595; y<br>";
					}
					else if(d1 === "y" && d2 === "z") {
						castView += "+-----------------------------&#8594; t<br>";
						for(var i = 0; i < SIZE; i++) {
							castView += "| ";
							for(var j = 0; j < SIZE; j++) {
								castView = castView + " " + Space[i][v1][v2][j].show();
							}
							castView = castView + "<br>";
						}
						castView += "&#8595; x<br>";
					}
					else if(d1 === "y" && d2 === "t") {
						castView += "+-----------------------------&#8594; z<br>";
						for(var i = 0; i < SIZE; i++) {
							castView += "| ";
							for(var j = 0; j < SIZE; j++) {
								castView = castView + " " + Space[i][v1][j][v2].show();
							}
							castView = castView + "<br>";
						}
						castView += "&#8595; x<br>";
					}
					else if(d1 === "z" && d2 === "t") {
						castView += "+-----------------------------&#8594; y<br>";
						for(var i = 0; i < SIZE; i++) {
							castView += "| ";
							for(var j = 0; j < SIZE; j++) {
								castView = castView + " " + Space[i][j][v1][v2].show();
							}
							castView = castView + "<br>";
						}
						castView += "&#8595; x<br>";
					}
					else if(d1 === "y" && d2 === "x") {
						castView += "+-----------------------------&#8594; t<br>";
						for(var i = 0; i < SIZE; i++) {
							castView += "| ";
							for(var j = 0; j < SIZE; j++) {
								castView = castView + " " + Space[v2][v1][i][j].show();
							}
							castView = castView + "<br>";
						}
						castView += "&#8595; z<br>";
					}
					else if(d1 === "z" && d2 === "x") {
						castView += "+-----------------------------&#8594; t<br>";
						for(var i = 0; i < SIZE; i++) {
							castView += "| ";
							for(var j = 0; j < SIZE; j++) {
								castView = castView + " " + Space[v2][i][v1][j].show();
							}
							castView = castView + "<br>";
						}
						castView += "&#8595; y<br>";
					}
					else if(d1 === "t" && d2 === "x") {
						castView += "+-----------------------------&#8594; z<br>";
						for(var i = 0; i < SIZE; i++) {
							castView += "| ";
							for(var j = 0; j < SIZE; j++) {
								castView = castView + " " + Space[v2][i][j][v1].show();
							}
							castView = castView + "<br>";
						}
						castView += "&#8595; y<br>";
					}
					else if(d1 === "z" && d2 === "y") {
						castView += "+-----------------------------&#8594; t<br>";
						for(var i = 0; i < SIZE; i++) {
							castView += "| ";
							for(var j = 0; j < SIZE; j++) {
								castView = castView + " " + Space[i][v2][v1][j].show();
							}
							castView = castView + "<br>";
						}
						castView += "&#8595; x<br>";
					}
					else if(d1 === "t" && d2 === "y") {
						castView += "+-----------------------------&#8594; z<br>";
						for(var i = 0; i < SIZE; i++) {
							castView += "| ";
							for(var j = 0; j < SIZE; j++) {
								castView = castView + " " + Space[i][v2][j][v1].show();
							}
							castView = castView + "<br>";
						}
						castView += "&#8595; x<br>";
					}
					else if(d1 === "t" && d2 === "z") {
						castView += "+-----------------------------&#8594; y<br>";
						for(var i = 0; i < SIZE; i++) {
							castView += "| ";
							for(var j = 0; j < SIZE; j++) {
								castView = castView + " " + Space[i][j][v2][v1].show();
							}
							castView = castView + "<br>";
						}
						castView += "&#8595; x<br>";
					}
					// jak rzekłby Chalmers: WHOOOA!
					print(castView);
				} else print("Nieprawidłowe argumenty wywołania.");
			} else {
				print("Plansza gry nie została jeszcze utworzona. Wpisz init, aby ją utworzyć,..");
			}
			break;
		default:
			print("Niepoprawna komenda. Aby uzyskać pomoc, wpisz help.");
	};

	delete args;
}

function Field(x, y, z, t) {
	this.x = x;
	this.y = y;
	this.z = z;
	this.t = t;
	this.flagged = false;
	this.revealed = false;
	this.minesNear = 0;
	if(Math.floor((Math.random() * 100) + 1) < LEVEL) {	// szansa LEVEL% na minę
		this.mine = true;
		mines++;
	}
	this.neighbours = new Array();

	this.visit = function() {
		for(var i = -1; i <= 1; i++) {
			for(var j = -1; j <= 1; j++) {
				for(var k = -1; k <= 1; k++) {
					for(var l = -1; l <= 1; l++) {
						if(!(i == x && j == y && k == z && l == t)) {						// sprawdzmy, czy to nie punkt wyjściowy
							if(x+i >=0 && y+j >= 0 && z+k >= 0 && t+l >= 0) {				// sprawdzamy czy nie poza planszą
								if(x+i < SIZE && y+j < SIZE && z+k < SIZE && t+l < SIZE) {	// sprawdzamy czy nie poza planszą c.d.
									var n = Space[x+i][y+j][z+k][t+l];
									this.neighbours.push(n);
									if(n.mine) this.minesNear++;
								}
							}	
						}
					}
				}
			}
		}
	}

	this.show = function() {
		// return "("+this.x+", "+this.y+", "+this.z+", "+this.t+")";
		if(this.flagged) return "<span style='color: yellow'>&nbsp;F</span>";
		//else if(this.mine) return "<span style='color: red'>&nbsp;M</span>";
		else if(this.revealed) {
			var num = (this.minesNear > 9) ? ""+this.minesNear : "&nbsp;"+this.minesNear;
			var color = "";
			if(this.minesNear === 1)		color = "dodgerblue";
			else if(this.minesNear === 2)	color = "turquoise ";
			else if(this.minesNear === 3)	color = "darksalmon";
			else if(this.minesNear === 4)	color = "firebrick";
			else if(this.minesNear === 5)	color = "greenyellow";
			else if(this.minesNear === 6)	color = "sienna";
			else if(this.minesNear === 0)	color = "palegoldenrod";
			else 							color = "orange";
			var res = "<span style='color:" + color + "'>" + num + "</span>";
			return res;
		}
		else return "&nbsp;<span style='color: #666;'>?</span>";
	}

	this.flag = function() {
		if(this.flagged) {
			this.flagged = false;
			flags--;
			print("Z pola ("+this.x+", "+this.y+", "+this.z+", "+this.t+") zdjęto flagę.");
		} else {
			this.flagged = true;
			flags++;
			print("Pole ("+this.x+", "+this.y+", "+this.z+", "+this.t+") zostało oflagowane.");
		}
		stats();
	}

	this.disp = function() {
		if(this.revealed) print("Pole odkryte: tak.");
		else print("Pole odkryte: nie.");
		if(this.flagged) print("Pole oflagowane: tak.");
		else print("Pole oflagowane: nie.");
		print("Miny w sąsiedztwie: "+this.minesNear);
		print("Współrzędne pola: ("+this.x+", "+this.y+", "+this.z+", "+this.t+")");
	}

	this.check = function() {
		if(this.mine) {
			fail();
		} else {
			this.flagged = false;
			this.revealed = true;
			rev++;
			if(this.minesNear === 0) {
				for(n in this.neighbours) n.check();
			}
		}
		stats();
	}
}

function init() {
	print("Inicjalizacja przestrzeni...");
	Space = new Array();
	rev = 0;
	flags = 0;
	mines = 0;
	for(var i = 0; i < SIZE; i++) {
		var I = new Array();
		for(var j = 0; j < SIZE; j++) {
			var J = new Array();
			for(var k = 0; k < SIZE; k++) {
				var K = new Array();
				for(var l = 0; l < SIZE; l++) {
					var field = new Field(i, j, k, l);
					K.push(field);
				} J.push(K);
			} I.push(J);
		} Space.push(I);
	}
	print("Analiza zaminowania...");
	for(var i = 0; i < SIZE; i++) {
		for(var j = 0; j < SIZE; j++) {
			for(var k = 0; k < SIZE; k++) {
				for(var l = 0; l < SIZE; l++) {
					Space[i][j][k][l].visit();
				}
			}
		}
	}
	print("Inicjalizacja zakończona sukcesem.");
	stats();
}

function clear() {
	$("#console").html("");
	$("#in").val("");
}

function stats() {
	$("#stats").html(
		"Poziom trudności: " + LEVEL + "/&infin;"
		+ "<br>Zaminowane pola: " + mines 
		+ "<br>Postawione flagi: " + flags 
		+ "<br>Odsłonięte pola: " + rev
		+ "<br>Pozostało: " + (10000 - mines - rev)
		+ "<br><span id='score'>Wynik: " + ( rev !== 0 ? 0 : (rev)/(10000-mines) )  + "%</span>");
}

function fail() {
	print("Fail, polaczku. xD");
}

$(document).ready( function() {

	print("");
	print("****************************************************");
	print("****** I INNOWACYJNEJ GRZE EVER, JEBANA KURWO ******");
	print("********** WITAJ W NAJBARDZIEJ HARDKOROWEJ *********");
	print("******************  HYPERSAPER 4D  *******************");
	print("****************************************************");
	print("");

	$("#in").focus();
	$("body").click( function() {
		$("#in").focus();
	});
	// $("#in").focusout(
	// 	function() {
	// 		$(this).focus();
	// 	}
	// );

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