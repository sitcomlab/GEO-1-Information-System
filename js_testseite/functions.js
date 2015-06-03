function InaktivitaetMessen()
{
	VergangeneZeit = VergangeneZeit + 1;
	window.setTimeout("InaktivitaetMessen()", 1000);
	if (VergangeneZeit > 90) {
		$(function() {
				if (localStorage.getItem("logActions") != "") {
					console.log(localStorage.getItem("logActions"));
					saveLog();
					localStorage["logActions"] = "";
				}	
		});
	}
}
	
function showNavigation(roomNumber,Name){
			log('Click on show navigation',new Date());

			document.getElementById("support").style.display = "none";
			document.getElementById("textparts").innerHTML="";
			document.getElementById("map").innerHTML="";
			document.getElementById("photo").innerHTML="";

			var floorNumber; 
			switch (roomNumber.substring(0, 1)){
				case "0":
					floorNumber = "Basement Floor";
					break;
				case "1":
					if (roomNumber.length > 2){
						floorNumber = "First Floor";
					}
					else{
						floorNumber = "Ground Floor";
					}
					break;
				case "2":
					if (roomNumber.length > 2){
						floorNumber = "Second Floor";
					}
					else{
						floorNumber = "Ground Floor";
					}
					break;
				case "3":
					if (roomNumber.length > 2){
						floorNumber = "Third Floor";
					}
					else{
						floorNumber = "Ground Floor";
					}
					break;
				case "4":
					if (roomNumber.length > 2){
						floorNumber = "Fourth Floor";
					}
					else{
						floorNumber = "Ground Floor";
					}
					break;		
				case "5":
					if (roomNumber.length > 2){
						floorNumber = "Fifth Floor";
					}
					else{
						floorNumber = "Ground Floor";
					}	
					break;
				default: floorNumber = "Ground Floor";	
			}
			
			var mapImage = document.createElement("img");
				mapImage.setAttribute("src","Images/Maps_Photos/" + roomNumber + "Karte.jpg");
				mapImage.setAttribute("width","100%");
			var floorTag = document.createElement("p");
				floorTag.setAttribute("id","floor");
				var floorContent = document.createTextNode(floorNumber);
				floorTag.appendChild(floorContent);
			document.getElementById("map").appendChild(floorTag);	
			document.getElementById("map").appendChild(mapImage);
			var liftImage = document.createElement("img");
				liftImage.setAttribute("src","Images/Maps_Photos/lift.jpg");
				liftImage.setAttribute("width","20%");
			document.getElementById("map").appendChild(liftImage);
			
			var photoImage = document.createElement("img");
				photoImage.setAttribute("src","Images/Maps_Photos/" + roomNumber + "Foto.jpg");
				photoImage.setAttribute("width","100%");
			document.getElementById("photo").appendChild(photoImage);
			
			var nameTagContent = localStorage.getItem(""+roomNumber+"_en");
				var descriptionPart = nameTagContent.split(",");
				for ( var i = 0; i < descriptionPart.length; i++){
						var text = 	document.createElement("p");
							text.setAttribute("id","description");
							var textPart = document.createTextNode(descriptionPart[i]);
							text.appendChild(textPart);
						document.getElementById("photo").appendChild(text);						
						var text2 = document.createElement("p");
							text2.setAttribute("id","description");
							var textPart = document.createTextNode(descriptionPart[i]);
							text2.appendChild(textPart);
						document.getElementById("textparts").appendChild(text2);						
				}
			document.getElementById("mapPhotoTab").style.display = "block";
			
	}
	
function showSupport(){
			document.getElementById("mapPhotoTab").style.display = "none";
			document.getElementById("map").innerHTML="";
			document.getElementById("photo").innerHTML="";
			document.getElementById("nameContent").innerHTML="";
			document.getElementById("support").style.display = "block";
	}
	
function photoClick(){
	document.getElementById("textparts").style="none";
	log('Switch to Photo',new Date());
}

function mapClick(){
	document.getElementById("textparts").style="block";
	log('Switch to Map',new Date());
}

function changeLanguage(language){
	switch(language){
		case "German":
			window.location=("/SystemNeu/mainpage_de.html");
			log('Chose German_language',new Date());
			break;
		case "Portuguese":
			window.location=("/SystemNeu/mainpage_po");
			log('Chose Portuguese_language',new Date());
	}
}
	
$("#photoTab").click(function(){
	document.getElementById("textparts").innerHTML="";
		});	
	