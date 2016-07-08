//After 120 seconds of inactivity a cover appears that darkens the screen. Includes the demand for touching the monitor. See last div.
var VergangeneZeit = 0; // in Sekunden
var myLayout;

$(document).ready(function () {

	InaktivitaetMessen();

	myLayout = $('body').layout({
		//	reference only - these options are NOT required because 'true' is the default
		closable: false, // pane can open & close
		north__size: 0.5,
		center__size: 0.06,
		south__size: 0.44,
		showDebugMessages: true // log and/or display messages from debugging & testing code
	});

	// if there is no state-cookie, then DISABLE state management initially
	var cookieExists = !$.isEmptyObject(myLayout.readCookie());
	if (!cookieExists)
		toggleStateManagement(true, false);

	// 'Reset State' button requires updated functionality in rc29.15+
	if ($.layout.revision && $.layout.revision >= 0.032915) {
		$('#btnReset').show();
	}

	$(document).bind("contextmenu", function (e) {
		return false;
	});
});

function InaktivitaetMessen()
{
	VergangeneZeit = VergangeneZeit + 1;
	window.setTimeout("InaktivitaetMessen()", 1000);
	if (VergangeneZeit > 150) {
		$(function () {
			if (localStorage.getItem("logActions") != "") {
				saveLog();
				VergangeneZeit = 0;
			} else {
				VergangeneZeit = 0;
			}
		});
	}
}

function InaktivitaetZuruecksetzen()
{
	VergangeneZeit = 0;
	return;
}

function toggleStateManagement(skipAlert, mode) {
	if (!$.layout.plugins.stateManagement)
		return;

	var options = myLayout.options.stateManagement, enabled = options.enabled; // current setting

	if ($.type(mode) === "boolean") {
		if (enabled === mode)
			return; // already correct
		enabled = options.enabled = mode
	} else
		enabled = options.enabled = !enabled; // toggle option

	if (!enabled) { // if disabling state management...
		myLayout.deleteCookie(); // ...clear cookie so will NOT be found on next refresh
		if (!skipAlert)
			alert('This layout will reload as the options specify \nwhen the page is refreshed.');
	} else if (!skipAlert)
		alert('This layout will save & restore its last state \nwhen the page is refreshed.');

	// update text on button
	var $Btn = $('#btnToggleState'), text = $Btn.html();
	if (enabled)
		$Btn.html(text.replace(/Enable/i, "Disable"));
	else
		$Btn.html(text.replace(/Disable/i, "Enable"));
}

function toggleLiveResizing() {
	$.each($.layout.config.borderPanes, function (i, pane) {
		var o = myLayout.options[ pane ];
		o.livePaneResizing = !o.livePaneResizing;
	});
}

function showNavigation(roomNumber, Name) {
	console.log(roomNumber);
	log('Click on show navigation', new Date());
	document.getElementById("support").style.display = "none";
	document.getElementById("textparts").innerHTML = "";
	document.getElementById("map").innerHTML = "";
	document.getElementById("photo").innerHTML = "";

	var floorNumber;
	var groundfloor;
	if (document.body.id === 'english') {
		groundfloor = 'Ground Floor';
	} else if (document.body.id === 'german') {
		groundfloor = 'Erdgeschoss';
	} else if (document.body.id === 'portuguese') {
		groundfloor = 'Térreo';
	}
	switch (roomNumber.substring(0, 1)) {
		case "0":
			if (document.body.id === 'english') {
				floorNumber = "Basement Floor";
			} else if (document.body.id === 'german') {
				floorNumber = "Untergeschoss";
			} else if (document.body.id === 'portuguese') {
				floorNumber = "Subsolo";
			}
			break;
		case "1":
			if (roomNumber.length > 2) {
				if (document.body.id === 'english') {
					floorNumber = "First Floor";
				} else if (document.body.id === 'german') {
					floorNumber = "Erstes Obergeschoss";
				} else if (document.body.id === 'portuguese') {
					floorNumber = "Primeiro andar";
				}
			} else {
				floorNumber = groundfloor;
			}
			break;
		case "2":
			if (roomNumber.length > 2) {
				if (document.body.id === 'english') {
					floorNumber = "Second Floor";
				} else if (document.body.id === 'german') {
					floorNumber = "Zweites Obergeschoss";
				} else if (document.body.id === 'portuguese') {
					floorNumber = "Segundo andar";
				}
			} else {
				floorNumber = groundfloor;
			}
			break;
		case "3":
			if (roomNumber.length > 2) {
				if (document.body.id === 'english') {
					floorNumber = "Third Floor";
				} else if (document.body.id === 'german') {
					floorNumber = "Drittes Obergeschoss";
				} else if (document.body.id === 'portuguese') {
					floorNumber = "Terceiro andar";
				}
			} else {
				floorNumber = groundfloor;
			}
			break;
		case "4":
			if (roomNumber.length > 2) {
				if (document.body.id === 'english') {
					floorNumber = "Fourth Floor";
				} else if (document.body.id === 'german') {
					floorNumber = "Untergeschoss";
				} else if (document.body.id === 'portuguese') {
					floorNumber = "Quarto andar";
				}
			} else {
				floorNumber = groundfloor;
			}
			break;
		case "5":
			if (roomNumber.length > 2) {
				if (document.body.id === 'english') {
					floorNumber = "Fifth Floor";
				} else if (document.body.id === 'german') {
					floorNumber = "Fünftes Obergeschoss";
				} else if (document.body.id === 'portuguese') {
					floorNumber = "Quinto andar";
				}
			} else {
				floorNumber = groundfloor;
			}
			break;
		default:
			floorNumber = groundfloor;
	}

	var mapImage = document.createElement("img");
	mapImage.setAttribute("src", "Images/Maps_Photos/" + roomNumber + "Karte.jpg");
	mapImage.setAttribute("width", "90%");
	var floorTag = document.createElement("p");
	floorTag.setAttribute("id", "floor");
	var floorContent = document.createTextNode(floorNumber);
	floorTag.appendChild(floorContent);
	document.getElementById("map").appendChild(floorTag);
	document.getElementById("map").appendChild(mapImage);
	var liftImage = document.createElement("img");
	liftImage.setAttribute("src", "Images/Maps_Photos/lift.jpg");
	liftImage.setAttribute("width", "20%");
	document.getElementById("map").appendChild(liftImage);

	var photoImage = document.createElement("img");
	photoImage.setAttribute("src", "Images/Maps_Photos/" + roomNumber + "Foto.jpg");
	photoImage.setAttribute("width", "100%");
	document.getElementById("photo").appendChild(photoImage);

	var nameTagContent;
	if (document.body.id === 'english') {
		nameTagContent = localStorage.getItem("" + roomNumber + "_en");
	} else if (document.body.id === 'german') {
		nameTagContent = localStorage.getItem("" + roomNumber + "_de");
	} else if (document.body.id === 'portuguese') {
		nameTagContent = localStorage.getItem("" + roomNumber + "_por");
	}

	var descriptionPart = nameTagContent.split(",");
	for (var i = 0; i < descriptionPart.length; i++) {
		var text = document.createElement("p");
		text.setAttribute("id", "description");
		var textPart = document.createTextNode(descriptionPart[i]);
		text.appendChild(textPart);
		document.getElementById("photo").appendChild(text);
		var text2 = document.createElement("p");
		text2.setAttribute("id", "description");
		var textPart = document.createTextNode(descriptionPart[i]);
		text2.appendChild(textPart);
		document.getElementById("textparts").appendChild(text2);
	}
	document.getElementById("mapPhotoTab").style.display = "block";

}

function showSupport() {
	document.getElementById("mapPhotoTab").style.display = "none";
	document.getElementById("map").innerHTML = "";
	document.getElementById("photo").innerHTML = "";
	document.getElementById("nameContent").innerHTML = "";
	document.getElementById("support").style.display = "block";
}

function photoClick() {
	document.getElementById("textparts").style = "none";
	log('Switch to Photo', new Date());
}

function mapClick() {
	document.getElementById("textparts").style = "block";
	log('Switch to Map', new Date());
}

function changeLanguage(language) {
	switch (language) {
		case "German":
			window.location = ("mainpage.html");
			log('Chose German_language', new Date());
			break;
		case "Portuguese":
			window.location = ("mainpage_por.html");
			log('Chose Portuguese_language', new Date());
			break;
		case "English":
			window.location = ("mainpage_en.html");
			log('Chose English_language', new Date());
			break;
		default:
			window.location = ("mainpage.html");
	}
}

$("#photoTab").click(function () {
	document.getElementById("textparts").innerHTML = "";
});

function loadWindow() {
	log('Click Home', new Date());
	window.location.reload();
}
	