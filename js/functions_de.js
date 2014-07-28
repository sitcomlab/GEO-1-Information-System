function InaktivitaetMessen()
{
	VergangeneZeit = VergangeneZeit + 1;
	window.setTimeout("InaktivitaetMessen()", 1000);
	if (VergangeneZeit > 90) {
		$(function() {
				if (localStorage.getItem("logActions") != "") {
					saveLog();
					localStorage["logActions"] = "";
				}	
		});
	}
}
	
function showNavigation(roomNumber,Name){
			log('Click on show navigation',new Date());

			document.getElementById("support").style.display = "none";
			document.getElementById("textparts_de").innerHTML="";
			document.getElementById("map").innerHTML="";
			document.getElementById("photo").innerHTML="";

			var floorNumber; 
			switch (roomNumber.substring(0, 1)){
				case "0":
					floorNumber = "Untergeschoss";
					break;
				case "1":
					if (roomNumber.length > 2){
						floorNumber = "Erstes Obergeschoss";
					}
					else{
						floorNumber = "Erdgeschoss";
					}
					break;
				case "2":
					if (roomNumber.length > 2){
						floorNumber = "Zweites Obergeschoss";
					}
					else{
						floorNumber = "Erdgeschoss";
					}
					break;
				case "3":
					if (roomNumber.length > 2){
						floorNumber = "Drittes Obergeschoss";
					}
					else{
						floorNumber = "Erdgeschoss";
					}
					break;
				case "4":
					if (roomNumber.length > 2){
						floorNumber = "Viertes Obergeschoss";
					}
					else{
						floorNumber = "Erdgeschoss";
					}
					break;		
				case "5":
					if (roomNumber.length > 2){
						floorNumber = "Fünftes Obergeschoss";
					}
					else{
						floorNumber = "Erdgeschoss";
					}	
					break;
				default: floorNumber = "Erdgeschoss";	
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
			
			var nameTagContent = localStorage.getItem(""+roomNumber+"_de");
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
						document.getElementById("textparts_de").appendChild(text2);						
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
	document.getElementById("textparts_de").style="none";
	log('Switch to Photo',new Date());
}

function mapClick(){
	document.getElementById("textparts_de").style="block";
	log('Switch to Map',new Date());
}

function changeLanguage(language){
	switch(language){
		case "Britain":
			window.location=("/mainpage.html");
			log('Chose English_language',new Date());
			break;
		case "Portuguese":
			window.location=("/mainpage_po.html");
			log('Chose Portuguese_language',new Date());
	}
}
	
$("#photoTab").click(function(){
	document.getElementById("textparts_de").innerHTML="";
		});	
	