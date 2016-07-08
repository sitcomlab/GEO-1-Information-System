
function showNavigation(roomNumber, Name) {
	document.getElementById("text").innerHTML = "";
	document.getElementById("mapImage").innerHTML = "";

	var mapImage = document.createElement("img");
	mapImage.setAttribute("src", "../Images/Maps_Photos/" + roomNumber + "Karte.jpg");
	mapImage.setAttribute("width", "30%");

	document.getElementById("mapImage").appendChild(mapImage);

	var nameTagContent;

	nameTagContent = localStorage.getItem("" + roomNumber + "_de");

	var descriptionPart = nameTagContent.split(",");
	for (var i = 0; i < descriptionPart.length; i++) {
		var text2 = document.createElement("p");
		text2.setAttribute("id", "description");
		var textPart = document.createTextNode(descriptionPart[i]);
		text2.appendChild(textPart);
		document.getElementById("text").appendChild(text2);
	}

}
