//Author: Markus Konkol	

//map or photo is shown randomly from the beginning. Some will start with a map, others with a photo	
	$(document).on("pagebeforecreate",function(event){
		var photoText;
		var mapText;
		if (document.body.id === 'english'){
			photoText = 'Photo';
			mapText = 'Map'
		}
		else if (document.body.id === 'german'){
			photoText = 'Foto';
			mapText = 'Karte'
		}
		else if (document.body.id === 'portuguese'){
			photoText = 'Foto';
			mapText = 'Mapa'
		}
		var random = Math.random();
				if ( random < 0.5){
				var mynavbar =	'<div data-role="navbar">'
								+	'<ul id = "mapPhotoTab" style="display:none;">'
								+		'<li><a id ="photoTab" class="ui-btn-active" href="#photo" data-toggle="tab" onclick="photoClick()">'+photoText+'</a></li>'							
								+		'<li><a id="mapTab" href="#map" data-toggle="tab" onclick="mapClick()">'+mapText+'</a></li>'
								+	'</ul>'
								+'</div>';	
				$(".maintenance_tabs").append(mynavbar).trigger('create');
				log('starts with photo',new Date());
				}
				else{
				var mynavbar =	'<div data-role="navbar">'
								+	'<ul id = "mapPhotoTab" style="display:none;">'
								+		'<li><a id="mapTab" class="ui-btn-active" href="#map" data-toggle="tab" onclick="mapClick()">'+mapText+'</a></li>'
								+		'<li><a id ="photoTab" href="#photo" data-toggle="tab" onclick="photoClick()">'+photoText+'</a></li>'							
								+	'</ul>'
								+'</div>';	
				$(".maintenance_tabs").append(mynavbar).trigger('create');
				log('starts with map',new Date());
				}
	});

$( document ).on( "pagecreate", function() {
$('#map').addClass('ui-btn-active');

	var basement = new Array();
	var firstFloor = new Array();
	var secondFloor = new Array();
	var thirdFloor = new Array();
	var fourthFloor = new Array();
	var fifthFloor = new Array();
	var sixthFloor = new Array();
	var special = new Array();
	var wholeStaff = null;
	var allStaffAE = new Array;
	var allStaffFJ = new Array;	
	var allStaffKO = new Array;
	var allStaffPT = new Array;	
	var allStaffUZ = new Array;
	var allStaffAEUE = new Array;
	var ifgi = new Array();
	var ifg = new Array();
	var ifloek = new Array();
	var ifddg = new Array();
	var gc = new Array();
	var ifp = new Array();
	var misc = new Array();
	
		$.post(
				"php/processDescription.php?",
				{	
				},
				function(data){
					var blocks = data.split(";");
					for ( var i = 0; i < blocks.length-3; i+=4 ){
						localStorage[""+blocks[i].trim()+"_en"] = blocks[i+2].trim();
						localStorage[""+blocks[i].trim()+"_de"] = blocks[i+1].trim();
						localStorage[""+blocks[i].trim()+"_por"] = blocks[i+3].trim();
					}
				}
		);

		$.ajax({
				type: "GET",
				url: "php/getData.php?",
				data: 'type=room'
		}).done(function(data){
			rooms = JSON.parse(data);
			rooms = combineRooms(rooms);
			sortRoom(rooms);	
		});		
		
		$.ajax({
				type: "GET",
				url: "php/getData.php?",
				data: 'type=person'
		}).done(function(data){
			wholeStaff = JSON.parse(data);
			sortStaff(wholeStaff);	
		});	

		$.ajax({
				type: "GET",
				url: "php/getData.php?",
				data: 'type=institute'
		}).done(function(data){
			affiliation = JSON.parse(data);
			sortAffiliation(affiliation);	
		});			
		
		function combineRooms(allRooms){
			for ( var i = 0; i < allRooms.length-1; i++){
				tempRoom = allRooms[i].Room;
				tempName = allRooms[i].Name;
				var j = i;
				while (allRooms[j+1].Room == tempRoom){
					tempName = tempName + ", " + allRooms[j+1].Name;
					allRooms[j+1].Room = "";
					j++;
				}
				allRooms[i].Name = tempName;
				i = j;
			}
			
			return allRooms;
		}
		
		function sortRoom(obj){
			for ( var i = 0; i < obj.length; i ++ ){
					if ( obj[i].Room.substring(0,1)==="0" ){
						basement.push(obj[i]);
					}
					else if ( parseInt(obj[i].Room) > 0 && parseInt(obj[i].Room) < 100){
						firstFloor.push(obj[i]);
					}
					else if ( parseInt(obj[i].Room) > 99 && parseInt(obj[i].Room) < 200){
						secondFloor.push(obj[i]);
					}			
					else if ( parseInt(obj[i].Room) > 199 && parseInt(obj[i].Room) < 300){
						thirdFloor.push(obj[i]);;
					}	
					else if ( parseInt(obj[i].Room) > 299 && parseInt(obj[i].Room) < 400){
						fourthFloor.push(obj[i]);;
					}
					else if ( parseInt(obj[i].Room) > 399 && parseInt(obj[i].Room) < 500){
						fifthFloor.push(obj[i]);;
					}				
					else if ( parseInt(obj[i].Room) > 499 && parseInt(obj[i].Room) < 600){
						sixthFloor.push(obj[i]);;
					}
					if(obj[i].Name == "First aid room (Erste Hilfe)" 
									|| obj[i].Name =="StudLab 125" || obj[i].Name =="StudLab 126" || obj[i].Name =="StudLab 130" 
									|| obj[i].Name =="Front-Office" || obj[i].Name == "Zentrum Digitaler Medien (ZDM)"
									|| obj[i].Name == "Seminar 242" || obj[i].Name == "Seminar 323" || obj[i].Name == "Seminar 401" || obj[i].Name == "Seminar 513"
									|| obj[i].Name == "Library hall"){
							special.push(obj[i]);;
						}
			}			
		}

		function sortAffiliation(affiliation){
			for (var i = 0; i < affiliation.length; i++){
				if (affiliation[i].Affiliation === "Institute for Geoinformatics"){
					ifgi.push(affiliation[i]);
				}
				else if (affiliation[i].Affiliation === "Institute for Geography"){
					ifg.push(affiliation[i]);
				}
				else if (affiliation[i].Affiliation === "Institute for Landscape Ecology"){
					ifloek.push(affiliation[i]);
				}
				else if (affiliation[i].Affiliation === "Fossil botany"){
					ifp.push(affiliation[i]);
				}
				else if (affiliation[i].Affiliation === "Institute for Didactics of Geography"){
					ifddg.push(affiliation[i]);
				}	
				else if (affiliation[i].Affiliation === "Geographic commission"){
					gc.push(affiliation[i]);
				}	
				else {
					misc.push(affiliation[i]);
				}								
			}
		}
		
		function sortStaff(allStaff){
			for (var i = 0; i < allStaff.length; i++){
					if (allStaff[i].Name.substring(0,1)==="A" || allStaff[i].Name.substring(0,1)==="a" || allStaff[i].Name.substring(0,1)==="B" || allStaff[i].Name.substring(0,1)==="b" || 
						allStaff[i].Name.substring(0,1)==="C" || allStaff[i].Name.substring(0,1)==="c" || allStaff[i].Name.substring(0,1)==="D" || allStaff[i].Name.substring(0,1)==="d" ||
						allStaff[i].Name.substring(0,1)==="E" || allStaff[i].Name.substring(0,1)==="e"){
						allStaffAE.push(allStaff[i]);						
					}
					else if (allStaff[i].Name.substring(0,1)==="F" || allStaff[i].Name.substring(0,1)==="f" || allStaff[i].Name.substring(0,1)==="G" || allStaff[i].Name.substring(0,1)==="g" || 
						allStaff[i].Name.substring(0,1)==="H"  || allStaff[i].Name.substring(0,1)==="h" || allStaff[i].Name.substring(0,1)==="I" || allStaff[i].Name.substring(0,1)==="i" ||
						allStaff[i].Name.substring(0,1)==="J" || allStaff[i].Name.substring(0,1)==="j"){
						allStaffFJ.push(allStaff[i]);
					}
					else if (allStaff[i].Name.substring(0,1)==="K" || allStaff[i].Name.substring(0,1)==="k" || allStaff[i].Name.substring(0,1)==="L" || allStaff[i].Name.substring(0,1)==="l" || 
						allStaff[i].Name.substring(0,1)==="M" || allStaff[i].Name.substring(0,1)==="m" || allStaff[i].Name.substring(0,1)==="N" || allStaff[i].Name.substring(0,1)==="n" ||
						allStaff[i].Name.substring(0,1)==="O" || allStaff[i].Name.substring(0,1)==="o"){
						allStaffKO.push(allStaff[i]);
					}
					else if (allStaff[i].Name.substring(0,1)==="P" || allStaff[i].Name.substring(0,1)==="p" || allStaff[i].Name.substring(0,1)==="Q" || allStaff[i].Name.substring(0,1)==="q" || 
						allStaff[i].Name.substring(0,1)==="R" || allStaff[i].Name.substring(0,1)==="r" || allStaff[i].Name.substring(0,1)==="S" || allStaff[i].Name.substring(0,1)==="s" ||
						allStaff[i].Name.substring(0,1)==="T" || allStaff[i].Name.substring(0,1)==="t"){
						allStaffPT.push(allStaff[i]);
					}
					else if (allStaff[i].Name.substring(0,1)==="U" || allStaff[i].Name.substring(0,1)==="u" || allStaff[i].Name.substring(0,1)==="V" || allStaff[i].Name.substring(0,1)==="v" || 
						allStaff[i].Name.substring(0,1)==="W" || allStaff[i].Name.substring(0,1)==="w" || allStaff[i].Name.substring(0,1)==="X" || allStaff[i].Name.substring(0,1)==="x" ||
						allStaff[i].Name.substring(0,1)==="Y" || allStaff[i].Name.substring(0,1)==="y" || allStaff[i].Name.substring(0,1)==="Z" || allStaff[i].Name.substring(0,1)==="z"){
						allStaffUZ.push(allStaff[i]);
					}	
					else if (allStaff[i].Name.substring(0,1)==="AE" || allStaff[i].Name.substring(0,1)==="ae" || allStaff[i].Name.substring(0,1)==="OE" || allStaff[i].Name.substring(0,1)==="oe" || 
						allStaff[i].Name.substring(0,1)==="UE" || allStaff[i].Name.substring(0,1)==="ue"){
						allStaffAEUE.push(allStaff[i]) = storePeopleU_Z + staffMember;
					}	
			}
		}
		
		function sortInstituteByName(institute){
			institute.sort(function(a, b) {
			    var textA = a.Name.toUpperCase();
			    var textB = b.Name.toUpperCase();
			    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
			});
			return institute;
		}
		
		function createEmployeeList(staff,logAction){		
				log(logAction,new Date());
				document.getElementById("people").innerHTML="";			
				
				if (staff.length < 1){
						if (document.body.id === 'german'){
							content = "Keine Mitarbeiter verfügbar."
						}
						if (document.body.id === 'english'){
							content = "No staff available";
						}
						if (document.body.id === 'portuguese'){
							content = "No staff available";
						}
					$( "#people" ).append( content ).collapsibleset( "refresh" );
				}
				else{
						for (var  i = 0; i < staff.length; i++ ) { 
								var affiliation = staff[i].Affiliation;
								var roomText;
								var buttonText = 'Show Navigation';
								var roomNumber;
								if (document.body.id === 'german'){
									roomText = 'Raum';
									affiliation = changeAffiliationLanguage('ger',affiliation);
									buttonText = 'Zur Wegbeschreibung';
								}
								else if (document.body.id === 'english'){
									roomText = 'Room';
								}
								else if (document.body.id === 'portuguese'){
									roomText = 'Sala';
									affiliation = changeAffiliationLanguage('por',affiliation);
									buttonText = 'Exibir navegação';
								}
								var content = "<div style = 'display:block;' data-role='collapsible' id='set" + i + "' class='A_E'><h3>" + staff[i].Name + 
											  "</h3><div><img style='width:60px; float:left; margin-right:20px; margin-bottom:10px;' src="+ 
											  "><p style='margin-bottom:5px;'>" + affiliation + ", "+roomText+" " + staff[i].Room + "</p>"+
											  "<button id=" + staff[i].Room + " class='ui-btn ui-btn-inline' style='margin-right: 30px; margin-bottom: 10px;' "+
											  "onclick=showNavigation('" + staff[i].Room + "')>"+buttonText+"</button></div></div>";							
								$( "#people" ).append( content ).collapsibleset( "refresh" );									
						}
					}	
		}

		function createRoomList(floor,logAction){
				log(logAction,new Date());
				document.getElementById("room").innerHTML="";
				var allRooms = floor;
								
					for ( var i = 0; i < allRooms.length; i++ ) {  
								var affiliation = allRooms[i].Affiliation;
								var buttonText = 'Show Navigation';						
								if (document.body.id === 'german'){
									affiliation = changeAffiliationLanguage('ger',affiliation);
									buttonText = 'Zur Wegbeschreibung';
								}
								else if (document.body.id === 'english'){
									roomText = 'Room';
								}
								if (document.body.id === 'portuguese'){
									affiliation = changeAffiliationLanguage('por',affiliation);
									buttonText = 'Exibir navegação';
								}
								var content = "<div style = 'display:block;' data-role='collapsible' id='set" + i + "' class='A_E'><h3>" + allRooms[i].Room + 
											  "</h3><div><p style='margin-bottom:5px;'>" + affiliation + "</p>"+"<p style='margin-bottom:5px;'>" + allRooms[i].Name + "</p>"+
											  "<button id="+allRooms[i].Room+" class='ui-btn ui-btn-inline' style='margin-right: 30px; margin-bottom: 10px;' "+
											  "onclick=showNavigation('"+allRooms[i].Room+"')>"+buttonText+"</button></div></div>";							
							$( "#room" ).append( content ).collapsibleset( "refresh" );									
					}
		}	
			
		function createInstituteList(institute,logAction){
				log(logAction,new Date())
				document.getElementById("instituteList").innerHTML="";
				var roomText = 'Room';
				var buttonText = 'Show Navigation';
				institute = sortInstituteByName(institute);
				
				for (var  i = 0; i < institute.length; i++ ) {  
								var affiliation = institute[i].Affiliation;
								var buttonText = 'Show Navigation';						
								if (document.body.id === 'german'){
									affiliation = changeAffiliationLanguage('ger',affiliation);
									buttonText = 'Zur Wegbeschreibung';
									roomText = 'Raum';
								}
								if (document.body.id === 'english'){
									roomText = 'Room';
								}
								if (document.body.id === 'portuguese'){
									affiliation = changeAffiliationLanguage('por',affiliation);
									buttonText = 'Exibir navegação';
									roomText = 'Sala';
								}
								var content = "<div style = 'display:block;' data-role='collapsible' id='set" + i + "' class='A_E'><h3>" + institute[i].Name + 
											  "</h3><div><img style='width:60px; float:left; margin-right:20px; margin-bottom:10px;' src="+ 
											  "><p style='margin-bottom:5px;'>" + affiliation + ", "+roomText+" " + institute[i].Room + "</p>"+
											  "<button id=" + institute[i].Room + " class='ui-btn ui-btn-inline' style='margin-right: 30px; margin-bottom: 10px;' "+
											  "onclick=showNavigation('"+ institute[i].Room +"')>"+buttonText+"</button></div></div>";							
							$( "#instituteList" ).append( content ).collapsibleset( "refresh" );									
					}
		}

		$("#A").click(function(){
				createEmployeeList(allStaffAE,'Search for people with A-E');
		});

		$("#F").click(function(){
				createEmployeeList(allStaffFJ,'Search for people with F-J');
		});

		$("#K").click(function(){
				createEmployeeList(allStaffKO,'Search for people with K-O');
		});

		$("#P").click(function(){
				createEmployeeList(allStaffPT,'Search for people with P-T');			
		});

		$("#U").click(function(){
				createEmployeeList(allStaffUZ,'Search for people with U-Z');
		});
					
		$("#AE").click(function(){
				createEmployeeList(allStaffAEUE,'Search for people with AE-UE');
		});
		
		$("#floor0").click(function(){
				createRoomList(basement,'Search for Floor 0');
		});
		
		$("#floor1").click(function(){
				createRoomList(firstFloor,'Search for Floor 1');
		});			
		
		$("#floor2").click(function(){
				createRoomList(secondFloor,'Search for Floor 2');
		});			
		
		$("#floor3").click(function(){
				createRoomList(thirdFloor,'Search for Floor 3');
		});
		
		$("#floor4").click(function(){
				createRoomList(fourthFloor,'Search for Floor 4');
		});
		
		$("#floor5").click(function(){
				createRoomList(fifthFloor,'Search for Floor 5');
		});
		
		$("#floor6").click(function(){
				createRoomList(sixthFloor,'Search for Floor 6');
		});
		
		//does not use function createRoomList since it has a different order of used slots (allRooms[...])
		$("#special").click(function(){
				log('Search for special rooms',new Date())
				document.getElementById("room").innerHTML="";
				var allRooms = special;
				var roomText = 'Room';
				
					for ( var i = 0; i < allRooms.length-1; i++ ) {  
								var roomNumber = allRooms[i].Name;
								var affiliation = allRooms[i].Affiliation;
								var buttonText = 'Show Navigation';						
								if (document.body.id === 'german'){
									roomText = 'Raum';
									affiliation = changeAffiliationLanguage('ger',affiliation);
									roomNumber = changeAffiliationLanguage('ger',roomNumber);
									buttonText = 'Zur Wegbeschreibung';
								}
								if (document.body.id === 'english'){
									roomText = 'Room';
								}
								if (document.body.id === 'portuguese'){
									roomText = 'Sala';
									affiliation = changeAffiliationLanguage('por',affiliation);
									roomNumber = changeAffiliationLanguage('por',roomNumber);
									buttonText = 'Exibir navegação';
								}
								var content = "<div style = 'display:block;' data-role='collapsible' id='set" + i + "' class='A_E'><h3>" + roomNumber + 
											  "</h3><div><p style='margin-bottom:5px;'> "+roomText+" " + allRooms[i].Room + "</p>"+"<p style='margin-bottom:5px;'></p>"+
											  "<button id="+allRooms[i].Room+" class='ui-btn ui-btn-inline' style='margin-right: 30px; margin-bottom: 10px;' "+
											  "onclick=showNavigation('"+allRooms[i].Room+"')>"+buttonText+"</button></div></div>";							
							$( "#room" ).append( content ).collapsibleset( "refresh" );									
					}
		});
				
		$("#ifgi").click(function(){
				createInstituteList(ifgi,'Search for ifgi');
				});
	
		$("#geogr").click(function(){
				createInstituteList(ifg,'Search for ifg');
		});
	
		$("#dgeogr").click(function(){
				createInstituteList(ifddg,'Search for ifdg');
		});	
		
		$("#loek").click(function(){
				createInstituteList(ifloek,'Search for loek');
		});
		
		$("#geopal").click(function(){
				createInstituteList(ifp,'Search for geopal');
		});	
		
		$("#misc").click(function(){
				createInstituteList(misc,'Search for misc');
		});			

		$("#geocomm").click(function(){
				createInstituteList(gc,'Search for geocomm');
		});

		function changeAffiliationLanguage(language,oldAffiliation){
				var newAffiliation;
				if (language === 'ger'){
					switch(oldAffiliation){
						case 'Institute for Geoinformatics':
							newAffiliation = 'Institut für Geoinformatik';
							break;
						case 'Institute for Geography':
							newAffiliation = 'Institut für Geographie';
							break;
						case 'Institute for Landscape Ecology':
							newAffiliation = 'Institut für Landschaftsökologie';
							break;
						case 'Geographic commission':
							newAffiliation = 'Geographische Kommission';
							break;
						case 'Fossil botany':
							newAffiliation = 'Institut für Geologie und Paläontologie';
							break;
						case 'Institute for Didactics of Geography':
							newAffiliation = 'Institut für Didaktik der Geographie';
							break;	
						case 'Common section':
							newAffiliation = 'Betriebseinheit';
							break;	
						case 'Common Section':
							newAffiliation = 'Betriebseinheit';
							break;									
						case 'Erasmus-Office':
							newAffiliation = 'Erasmus-Büro';
							break;
						case 'Library':
							newAffiliation = 'Bibliothek';
							break;	
						case 'Facility Management':
							newAffiliation = 'Hauswart';
							break;
						case 'Dean Chemistry':
							newAffiliation = 'Dekanat Chemie';
							break;
						case 'Dean':
							newAffiliation = 'Dekanat';
							break;
						case 'Library hall':
							newAffiliation = 'Bibliothek';
							break;
						case 'IVV Geosciences':
							newAffiliation = 'IVV Geowisschenschaften';
							break;
						case 'Student association':
							newAffiliation = 'Fachschaft';
							break;	
						case 'First aid room (Erste Hilfe)':
							newAffiliation = 'Erste Hilfe Raum';
							break;	
						case 'Institute for Geoinformatics Secretary':
							newAffiliation = 'Institut für Geoinformatik Sekretariat';
							break;	
						case 'Electronic Factory':
							newAffiliation = 'Elektronik-Werkstatt';
							break;								
						case 'Institute for Landscape Ecology and Geography':
							newAffiliation = 'Institut für Landschaftsökologie und Geographie';
							break;	
						case 'Meeting room large':
							newAffiliation = 'Meeting Raum groß';
							break;	
						case 'Meeting room small':
							newAffiliation = 'Meeting Raum klein';
							break;									
						default: 
							newAffiliation = oldAffiliation;
							break;	
					}						
				}
				else if (language === 'por'){
					switch(oldAffiliation){
						case 'Institute for Geoinformatics':
							newAffiliation = 'Instituto de Geoinformática';
							break;
						case 'Institute for Geography':
							newAffiliation = 'Instituto de Geografia';
							break;
						case 'Institute for Landscape Ecology':
							newAffiliation = 'Instituto de Ecologia';
							break;
						case 'Geographic commission':
							newAffiliation = 'Comissão Geográfica';
							break;
						case 'Fossil botany':
							newAffiliation = 'Botânica de Fósseis';
							break;
						case 'Institute for Didactics of Geography':
							newAffiliation = 'Insituto de Didática da Geografia';
							break;	
						case 'Common section':
							newAffiliation = 'Módulo de servico';
							break;	
						case 'Common Section':
							newAffiliation = 'Módulo de servico';
							break;									
						case 'Erasmus-Office':
							newAffiliation = 'Escritório Erasmus';
							break;
						case 'Library':
							newAffiliation = 'Biblioteca';
							break;	
						case 'Facility Management':
							newAffiliation = 'Gestão do Edifício';
							break;
						case 'Dean Chemistry':
							newAffiliation = 'Decano química';
							break;
						case 'Dean':
							newAffiliation = 'Decano';
							break;
						case 'Library hall':
							newAffiliation = 'Biblioteca';
							break;
						case 'IVV Geosciences':
							newAffiliation = 'IVV Geociências';
							break;
						case 'Student association':
							newAffiliation = 'Grêmio';
							break;	
						case 'First aid room (Erste Hilfe)':
							newAffiliation = 'Sala de primeiros socorros';
							break;	
						case 'Institute for Geoinformatics Secretary':
							newAffiliation = 'Secretaria do Insituto de Geoinformática';
							break;	
						case 'Electronic Factory':
							newAffiliation = 'Elektronik-Werkstatt';
							break;			
						case 'Institute for Landscape Ecology and Geography':
							newAffiliation = 'Instituto de Ecologia e Geografia';
							break;
						case 'Meeting room large':
							newAffiliation = 'Sala de reuniões grande';
							break;									
						case 'Meeting room small':
							newAffiliation = 'Sala de reuniões pequena';
							break;	
						default: 
							newAffiliation = oldAffiliation;
							break;	
					}
				}
				return newAffiliation;
		}			
	}); 