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
	
	$.post(
			"php/processRooms.php?",
		{	
		},
			function(data){
					data = data.split(";");
					var basement = "";
					var firstFloor = "";
					var secondFloor = "";
					var thirdFloor = "";
					var fourthFloor = "";
					var fifthFloor = "";
					var sixthFloor = "";
					var special = "";

					for ( var i = 0; i < data.length; i += 3 ){
							if ( data[i].substring(0,1)==="0" ){
								basement = basement + data[i] + ";" + data[i+1] + ";" + data[i+2] + ";";
								//console.log(basement);
							}
							else if ( parseInt(data[i]) > 0 && parseInt(data[i]) < 100){
								firstFloor = firstFloor + data[i] + ";" + data[i+1] + ";" + data[i+2] + ";";
							}
							else if ( parseInt(data[i]) > 99 && parseInt(data[i]) < 200){
								secondFloor = secondFloor + data[i] + ";" + data[i+1] + ";" + data[i+2] + ";";
							}			
							else if ( parseInt(data[i]) > 199 && parseInt(data[i]) < 300){
								thirdFloor = thirdFloor + data[i] + ";" + data[i+1] + ";" + data[i+2] + ";";
							}	
							else if ( parseInt(data[i]) > 299 && parseInt(data[i]) < 400){
								fourthFloor = fourthFloor + data[i] + ";" + data[i+1] + ";" + data[i+2] + ";";
							}
							else if ( parseInt(data[i]) > 399 && parseInt(data[i]) < 500){
								fifthFloor = fifthFloor + data[i] + ";" + data[i+1] + ";" + data[i+2] + ";";
							}				
							else if ( parseInt(data[i]) > 499 && parseInt(data[i]) < 600){
								sixthFloor = sixthFloor + data[i] + ";" + data[i+1] + ";" + data[i+2] + ";";
							}
							if(data[i+1] == "First aid room (Erste Hilfe)" 
											|| data[i+1] =="StudLab 125" || data[i+1] =="StudLab 126" || data[i+1] =="StudLab 130" 
											|| data[i+1] =="Front-Office" || data[i+1] == "Zentrum Digitaler Medien (ZDM)"
											|| data[i+1] == "Seminar 242" || data[i+1] == "Seminar 323" || data[i+1] == "Seminar 401" || data[i+1] == "Seminar 513"
											|| data[i+1] == "Library hall"){
									special = special + data[i] + ";" + data[i+1] + ";" + data[i+2] + ";";
								}
					}

					localStorage["floor0"] = basement.substr(0,basement.length-1);
					localStorage["floor1"] = firstFloor.substr(0,firstFloor.length-1);
					localStorage["floor2"] = secondFloor.substr(0,secondFloor.length-1);
					localStorage["floor3"] = thirdFloor.substr(0,thirdFloor.length-1);
					localStorage["floor4"] = fourthFloor.substr(0,fourthFloor.length-1);
					localStorage["floor5"] = fifthFloor.substr(0,fifthFloor.length-1);
					localStorage["floor6"] = sixthFloor.substr(0,sixthFloor.length-1);
					localStorage["special"] = special.substr(0,sixthFloor.length-1);
								
			}			
		);
		
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
						//console.log(blocks[i+3]);
					}
				}
		);
			//following queries get data from LODUM - since it is not working, it was taken out and not considered anymore
			/*var ifgi = "SELECT DISTINCT ?member ?name ?depict WHERE { <http://data.uni-muenster.de/context/cris/organization/5425> <http://xmlns.com/foaf/0.1/member> ?member . ?member <http://xmlns.com/foaf/0.1/name> ?name . ?member <http://xmlns.com/foaf/0.1/depiction> ?depict . } Order by ?name";
			var loek = "SELECT DISTINCT ?member ?name ?depict WHERE { <http://data.uni-muenster.de/context/cris/organization/5414> <http://xmlns.com/foaf/0.1/member> ?member . ?member <http://xmlns.com/foaf/0.1/name> ?name . ?member <http://xmlns.com/foaf/0.1/depiction> ?depict . } Order by ?name";
			var geogr = "SELECT DISTINCT ?member ?name ?depict WHERE { <http://data.uni-muenster.de/context/cris/organization/5421> <http://xmlns.com/foaf/0.1/member> ?member . ?member <http://xmlns.com/foaf/0.1/name> ?name . ?member <http://xmlns.com/foaf/0.1/depiction> ?depict . } Order by ?name";
			var dgeogr = "SELECT DISTINCT ?member ?name ?depict WHERE { <http://data.uni-muenster.de/context/cris/organization/5407> <http://xmlns.com/foaf/0.1/member> ?member . ?member <http://xmlns.com/foaf/0.1/name> ?name .?member <http://xmlns.com/foaf/0.1/depiction> ?depict . } Order by ?name";
			var geopal = "SELECT DISTINCT ?member ?name ?depict WHERE { <http://data.uni-muenster.de/context/cris/organization/5396> <http://xmlns.com/foaf/0.1/member> ?member . ?member <http://xmlns.com/foaf/0.1/name> ?name .?member <http://xmlns.com/foaf/0.1/depiction> ?depict . } Order by ?name";
			*/
			//Take photos from LODUM
			var allPeople = "SELECT DISTINCT ?member ?name ?depict ?roomnumber WHERE { { {<http://data.uni-muenster.de/context/cris/organization/5425> <http://xmlns.com/foaf/0.1/member> ?member . ?member <http://xmlns.com/foaf/0.1/name> ?name. ?member <http://xmlns.com/foaf/0.1/depiction> ?depict .?room <http://vocab.lodum.de/limap/hasOccupant> ?member. ?room <http://vocab.lodum.de/limap/hasRoomNumber> ?roomnumber} Union {<http://data.uni-muenster.de/context/cris/organization/5421> <http://xmlns.com/foaf/0.1/member> ?member . ?member <http://xmlns.com/foaf/0.1/name> ?name. ?member <http://xmlns.com/foaf/0.1/depiction> ?depict . ?room <http://vocab.lodum.de/limap/hasOccupant> ?member. ?room <http://vocab.lodum.de/limap/hasRoomNumber> ?roomnumber} Union {<http://data.uni-muenster.de/context/cris/organization/5407> <http://xmlns.com/foaf/0.1/member> ?member . ?member <http://xmlns.com/foaf/0.1/name> ?name. ?member <http://xmlns.com/foaf/0.1/depiction> ?depict .?room <http://vocab.lodum.de/limap/hasOccupant> ?member. ?room <http://vocab.lodum.de/limap/hasRoomNumber> ?roomnumber} Union {<http://data.uni-muenster.de/context/cris/organization/5414> <http://xmlns.com/foaf/0.1/member> ?member . ?member <http://xmlns.com/foaf/0.1/name> ?name. ?member <http://xmlns.com/foaf/0.1/depiction> ?depict . ?room <http://vocab.lodum.de/limap/hasOccupant> ?member. ?room <http://vocab.lodum.de/limap/hasRoomNumber> ?roomnumber}Union {<http://data.uni-muenster.de/context/cris/organization/5396> <http://xmlns.com/foaf/0.1/member> ?member . ?member <http://xmlns.com/foaf/0.1/name> ?name. ?member <http://xmlns.com/foaf/0.1/depiction> ?depict . ?room <http://vocab.lodum.de/limap/hasOccupant> ?member. ?room <http://vocab.lodum.de/limap/hasRoomNumber> ?roomnumber}Union {<http://data.uni-muenster.de/context/cris/organization/7619> <http://xmlns.com/foaf/0.1/member> ?member . ?member <http://xmlns.com/foaf/0.1/name> ?name. ?member <http://xmlns.com/foaf/0.1/depiction> ?depict . ?room <http://vocab.lodum.de/limap/hasOccupant> ?member. ?room <http://vocab.lodum.de/limap/hasRoomNumber> ?roomnumber}}}Order by ?name";		
			
			//SPARQL endpoint
            var endpointURL = "http://data.uni-muenster.de/sparql";
            var queryUrl = "http://jsonp.lodum.de/?endpoint=" + endpointURL;
            var persons = new Array();
            var texte = new Array();
				
				$.ajax({
						dataType: "jsonp",
						url: queryUrl,
						data: {
							query: allPeople
						},				
						success: function(json) {
							var bindings = json.results.bindings;
							var storeAllPeople = '{"employees": [';
							$.each(bindings, function(i) {
									
								var name = bindings[i].name.value;
									name = name.replace(" ", "");
								var	member = bindings[i].member.value;
								var depict = bindings[i].depict.value;
								var room = bindings[i].roomnumber.value;		
								var affiliation = localStorage.getItem(""+member+"");
								localStorage[""+name+""] = depict;
							})		

								$.post(
										"php/processPersons.php?",
										{	
										},
										function(data){
											var data2 = data.split(";");														
											for (var j = 0; j < data2.length-2; j+=3){
												if ( j == 0 ){
													var staffMember = '{"member": "", "name": "' + data2[j] + '", "affiliation": "' + data2[j+1] + '", "depict": "", "room": "' + data2[j+2] + '"}';
													storeAllPeople = storeAllPeople + staffMember;
												}
												else{
													var staffMember = ',{"member": "", "name": "' + data2[j] + '", "affiliation": "' + data2[j+1] + '", "depict": "", "room": "' + data2[j+2] + '"}';
													storeAllPeople = storeAllPeople + staffMember;
												}
											}
											storeAllPeople = storeAllPeople + ']}';
											localStorage["storeAllPeople"] = storeAllPeople;									
											sort();
										})							
							}
					});	
			
			function createEmployeeList(staff,logAction){
					log(logAction,new Date());
					document.getElementById("people").innerHTML="";
					var peopleContentA_E = localStorage.getItem(staff);			
					var allPeoplestaff = JSON.parse(peopleContentA_E);
					var abcde_length = allPeoplestaff.employees.length;				
					
					if (abcde_length < 1){
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
							for (var  i = 0; i < abcde_length; i++ ) {  
									var affiliation = allPeoplestaff.employees[i].affiliation;
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
									var content = "<div style = 'display:block;' data-role='collapsible' id='set" + i + "' class='A_E'><h3>" + allPeoplestaff.employees[i].name + 
												  "</h3><div><img style='width:60px; float:left; margin-right:20px; margin-bottom:10px;' src="+allPeoplestaff.employees[i].depict+ 
												  "><p style='margin-bottom:5px;'>" + affiliation + ", "+roomText+" " + allPeoplestaff.employees[i].room + "</p>"+
												  "<button id=" + allPeoplestaff.employees[i].room + " class='ui-btn ui-btn-inline' style='margin-right: 30px; margin-bottom: 10px;' "+
												  "onclick=showNavigation(this.id)>"+buttonText+"</button></div></div>";							
									$( "#people" ).append( content ).collapsibleset( "refresh" );									
							}
						}	
			}

			function createRoomList(floor,logAction){
					log(logAction,new Date())
					document.getElementById("room").innerHTML="";
					var allRooms = localStorage.getItem(floor);
					allRooms = allRooms.split(";");
									
						for ( var i = 0; i < allRooms.length; i+=3 ) {  
									var affiliation = allRooms[i+1];
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
									var content = "<div style = 'display:block;' data-role='collapsible' id='set" + i + "' class='A_E'><h3>" + allRooms[i] + 
												  "</h3><div><p style='margin-bottom:5px;'>" + affiliation + "</p>"+"<p style='margin-bottom:5px;'>" + allRooms[i+2] + "</p>"+
												  "<button id="+allRooms[i]+" class='ui-btn ui-btn-inline' style='margin-right: 30px; margin-bottom: 10px;' "+
												  "onclick=showNavigation(this.id)>"+buttonText+"</button></div></div>";							
								$( "#room" ).append( content ).collapsibleset( "refresh" );									
						}
			}	
			
			function createInstituteList(institute,logAction){
					log(logAction,new Date())
					document.getElementById("instituteList").innerHTML="";
					var peopleContentIFGI = localStorage.getItem(institute);	
					var allPeoplestaff = JSON.parse(peopleContentIFGI);
					var ifgi_length = allPeoplestaff.employees.length;
					var roomText = 'Room';
					var buttonText = 'Show Navigation'
					
					for (var  i = 0; i < ifgi_length; i++ ) {  
									var affiliation = allPeoplestaff.employees[i].affiliation;
									var buttonText = 'Show Navigation';						
									if (document.body.id === 'german'){
										affiliation = changeAffiliationLanguage('ger',affiliation);
										buttonText = 'Zur Wegbeschreibung';
										roomText = 'Raum'
									}
									if (document.body.id === 'english'){
										roomText = 'Room';
									}
									if (document.body.id === 'portuguese'){
										affiliation = changeAffiliationLanguage('por',affiliation);
										buttonText = 'Exibir navegação';
										roomText = 'Sala'
									}
									var content = "<div style = 'display:block;' data-role='collapsible' id='set" + i + "' class='A_E'><h3>" + allPeoplestaff.employees[i].name + 
												  "</h3><div><img style='width:60px; float:left; margin-right:20px; margin-bottom:10px;' src="+allPeoplestaff.employees[i].depict+ 
												  "><p style='margin-bottom:5px;'>" + affiliation + ", "+roomText+" " + allPeoplestaff.employees[i].room + "</p>"+
												  "<button id=" + allPeoplestaff.employees[i].room + " class='ui-btn ui-btn-inline' style='margin-right: 30px; margin-bottom: 10px;' "+
												  "onclick=showNavigation(this.id)>"+buttonText+"</button></div></div>";							
								$( "#instituteList" ).append( content ).collapsibleset( "refresh" );									
						}
			}

			$("#A").click(function(){
					createEmployeeList('peopleA_E','Search for people with A-E');
			});
	
			$("#F").click(function(){
					createEmployeeList('peopleF_J','Search for people with F-J');
			});
	
			$("#K").click(function(){
					createEmployeeList('peopleK_O','Search for people with K-O');
			});
	
			$("#P").click(function(){
					createEmployeeList('peopleP_T','Search for people with P-T');			
			});
	
			$("#U").click(function(){
					createEmployeeList('peopleU_Z','Search for people with U-Z');
			});
						
			$("#AE").click(function(){
					createEmployeeList('peopleAE_UE','Search for people with AE-UE');
			});
			
			$("#floor0").click(function(){
					createRoomList('floor0','Search for Floor 0');
			});
			
			$("#floor1").click(function(){
					createRoomList('floor1','Search for Floor 1');
			});			
			
			$("#floor2").click(function(){
					createRoomList('floor2','Search for Floor 2');
			});			
			
			$("#floor3").click(function(){
					createRoomList('floor3','Search for Floor 3');
			});
			
			$("#floor4").click(function(){
					createRoomList('floor4','Search for Floor 4');
			});
			
			$("#floor5").click(function(){
					createRoomList('floor5','Search for Floor 5');
			});
			
			$("#floor6").click(function(){
					createRoomList('floor6','Search for Floor 6');
			});
			
			//does not use function createRoomList since it has a different order of used slots (allRooms[...])
			$("#special").click(function(){
					log('Search for special rooms',new Date())
					document.getElementById("room").innerHTML="";
					var allRooms = localStorage.getItem("special");
					allRooms = allRooms.split(";");
					var roomText = 'Room';
					
						for ( var i = 0; i < allRooms.length-1; i+=3 ) {  
									var roomNumber = allRooms[i+1];
									var affiliation = allRooms[i+1];
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
												  "</h3><div><p style='margin-bottom:5px;'> "+roomText+" " + allRooms[i] + "</p>"+"<p style='margin-bottom:5px;'></p>"+
												  "<button id="+allRooms[i]+" class='ui-btn ui-btn-inline' style='margin-right: 30px; margin-bottom: 10px;' "+
												  "onclick=showNavigation(this.id)>"+buttonText+"</button></div></div>";							
								$( "#room" ).append( content ).collapsibleset( "refresh" );									
						}
			});
				
			$("#ifgi").click(function(){
					createInstituteList('storeifgi','Search for ifgi');
					});
		
			$("#geogr").click(function(){
					createInstituteList('storeifg','Search for ifg');
			});
		
			$("#dgeogr").click(function(){
					createInstituteList('storeifdg','Search for ifdg');
			});	
			
			$("#loek").click(function(){
					createInstituteList('storeloek','Search for loek');
			});
			
			$("#geopal").click(function(){
					createInstituteList('storegeopal','Search for geopal');
			});	
			
			$("#misc").click(function(){
					createInstituteList('storemisc','Search for misc');
			});			

			$("#geocomm").click(function(){
					createInstituteList('storegeocomm','Search for geocomm');
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