	$(document).on("pagebeforecreate",function(event){
	
		var random = Math.random();
				if ( random < 0.5){
				var mynavbar =	'<div data-role="navbar">'
								+	'<ul id = "mapPhotoTab" style="display:none;">'
								+		'<li><a id ="photoTab" class="ui-btn-active" href="#photo" data-toggle="tab" onclick="photoClick()">Foto</a></li>'							
								+		'<li><a id="mapTab" href="#map" data-toggle="tab" onclick="mapClick()">Karte</a></li>'
								+	'</ul>'
								+'</div>';	
				$(".maintenance_tabs").append(mynavbar).trigger('create');}
				else{
				var mynavbar =	'<div data-role="navbar">'
								+	'<ul id = "mapPhotoTab" style="display:none;">'
								+		'<li><a id="mapTab" class="ui-btn-active" href="#map" data-toggle="tab" onclick="mapClick()">Karte</a></li>'
								+		'<li><a id ="photoTab" href="#photo" data-toggle="tab" onclick="photoClick()">Foto</a></li>'							
								+	'</ul>'
								+'</div>';	
				$(".maintenance_tabs").append(mynavbar).trigger('create');}
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
									|| data[i+1] =="Common section FrontOffice" || data[i+1] == "Zentrum Digitaler Medien (ZDM)"
									|| data[i+1] == "Seminar 242" || data[i+1] == "Seminar 323" || data[i+1] == "Seminar 401" || data[i+1] == "Seminar 513"){
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
				
				var test = document.createTextNode("Räume 001 - 099");
					document.getElementById("floor0").appendChild(test);			
				var test = document.createTextNode("Räume 1 - 99");
					document.getElementById("floor1").appendChild(test);
				var test = document.createTextNode("Räume 100 - 199");
					document.getElementById("floor2").appendChild(test);	
				var test = document.createTextNode("Räume 200 - 299");
					document.getElementById("floor3").appendChild(test);
				var test = document.createTextNode("Räume 300 - 399");
					document.getElementById("floor4").appendChild(test);
				var test = document.createTextNode("Räume 400 - 499");
					document.getElementById("floor5").appendChild(test);
				var test = document.createTextNode("Räume 500 - 599");
					document.getElementById("floor6").appendChild(test);
				var test = document.createTextNode("Spezielle Räume");
					document.getElementById("special").appendChild(test);					
			}			
		);
		
		$.post(
			"php/processDescription.php?",
			{	
			},
				function(data){
					var blocks = data.split(";");
					for ( var i = 0; i < blocks.length-2; i+=3 ){
						localStorage[""+blocks[i].trim()+"_de"] = blocks[i+1].trim();
					}
				}
		);
			
			/*var ifgi = "SELECT DISTINCT ?member ?name ?depict WHERE { <http://data.uni-muenster.de/context/cris/organization/5425> <http://xmlns.com/foaf/0.1/member> ?member . ?member <http://xmlns.com/foaf/0.1/name> ?name . ?member <http://xmlns.com/foaf/0.1/depiction> ?depict . } Order by ?name";
			var loek = "SELECT DISTINCT ?member ?name ?depict WHERE { <http://data.uni-muenster.de/context/cris/organization/5414> <http://xmlns.com/foaf/0.1/member> ?member . ?member <http://xmlns.com/foaf/0.1/name> ?name . ?member <http://xmlns.com/foaf/0.1/depiction> ?depict . } Order by ?name";
			var geogr = "SELECT DISTINCT ?member ?name ?depict WHERE { <http://data.uni-muenster.de/context/cris/organization/5421> <http://xmlns.com/foaf/0.1/member> ?member . ?member <http://xmlns.com/foaf/0.1/name> ?name . ?member <http://xmlns.com/foaf/0.1/depiction> ?depict . } Order by ?name";
			var dgeogr = "SELECT DISTINCT ?member ?name ?depict WHERE { <http://data.uni-muenster.de/context/cris/organization/5407> <http://xmlns.com/foaf/0.1/member> ?member . ?member <http://xmlns.com/foaf/0.1/name> ?name .?member <http://xmlns.com/foaf/0.1/depiction> ?depict . } Order by ?name";
			var geopal = "SELECT DISTINCT ?member ?name ?depict WHERE { <http://data.uni-muenster.de/context/cris/organization/5396> <http://xmlns.com/foaf/0.1/member> ?member . ?member <http://xmlns.com/foaf/0.1/name> ?name .?member <http://xmlns.com/foaf/0.1/depiction> ?depict . } Order by ?name";
			*/
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
								//console.log(localStorage.getItem(""+name+""));
									/*
									if( member.indexOf ( "csa" ) != -1) { } 
									else{								
										if ( i!= 0 ) {							
											var staffMember = ',{"member": "' + member + '", "name": "' + name + '", "affiliation": "' + affiliation + '", "depict": "' + depict + '", "room": "' + room + '"}';	
										}
										else{
											var staffMember = '{"member": "' + member + '", "name": "' + name + '", "affiliation": "' + affiliation + '", "depict": "' + depict + '", "room": "' + room + '"}';
										}
											storeAllPeople = storeAllPeople + staffMember;
										
									}
									*/
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
															storeAllPeople = storeAllPeople + staffMember;												}
													}
													storeAllPeople = storeAllPeople + ']}';
													localStorage["storeAllPeople"] = storeAllPeople;
													
													sort();
												})							
							}
					});	
					

			$("#A").click(function(){
				log('Search for people with A-E',new Date())
					document.getElementById("people").innerHTML="";
					var peopleContentA_E = localStorage.getItem("peopleA_E");			
					var allPeoplestaff = JSON.parse(peopleContentA_E);
					var allPeoplestaff = JSON.parse(peopleContentA_E);
					var abcde_length = allPeoplestaff.employees.length;				
						for (var  i = 0; i < abcde_length; i++ ) {  
						
									var content = "<div style = 'display:block;' data-role='collapsible' id='set" + i + "' class='A_E'><h3>" + allPeoplestaff.employees[i].name + 
												  "</h3><div><img style='width:60px; float:left; margin-right:20px; margin-bottom:10px;' src="+allPeoplestaff.employees[i].depict+ 
												  "><p style='margin-bottom:5px;'>" + allPeoplestaff.employees[i].affiliation + ", Raum " + allPeoplestaff.employees[i].room + "</p>"+
												  "<button id=" + allPeoplestaff.employees[i].room + " class='ui-btn ui-btn-inline' style='margin-right: 30px; margin-bottom: 10px;' "+
												  "onclick=showNavigation(this.id)>Zur Wegbeschreibung</button></div></div>";							
								$( "#people" ).append( content ).collapsibleset( "refresh" );									
						}
			});
	
			$("#F").click(function(){
			
					log('Search for people with F-J',new Date())
					document.getElementById("people").innerHTML="";
					var peopleContentF_J = localStorage.getItem("peopleF_J");				
					var allPeoplestaff = JSON.parse(peopleContentF_J);
					var fghij_length = allPeoplestaff.employees.length;
									
						for ( var i = 0; i < fghij_length; i++ ) {  
									var content = "<div style = 'display:block;' data-role='collapsible' id='set" + i + "' class='A_E'><h3>" + allPeoplestaff.employees[i].name + 
												  "</h3><div><img style='width:60px; float:left; margin-right:20px; margin-bottom:10px;' src="+allPeoplestaff.employees[i].depict+ 
												  "/><p style='margin-bottom:5px;'>" + allPeoplestaff.employees[i].affiliation + ", Raum " + allPeoplestaff.employees[i].room + "</p>"+
												  "<button id=" + allPeoplestaff.employees[i].room + " class='ui-btn ui-btn-inline' style='margin-right: 30px; margin-bottom: 10px;' "+
												  "onclick=showNavigation(this.id)>Zur Wegbeschreibung</button></div></div>";							
								$( "#people" ).append( content ).collapsibleset( "refresh" );									
						}
			});
	
			$("#K").click(function(){
					log('Search for people with K-O',new Date())
					document.getElementById("people").innerHTML="";
					var peopleContentK_O = localStorage.getItem("peopleK_O");
					var allPeoplestaff = JSON.parse(peopleContentK_O);
					var klmno_length = allPeoplestaff.employees.length;
									
						for ( var i = 0; i < klmno_length; i++ ) {  
								var content = "<div style = 'display:block;' data-role='collapsible' id='set" + i + "' class='A_E'><h3>" + allPeoplestaff.employees[i].name + 
												  "</h3><div><img style='width:60px; float:left; margin-right:20px; margin-bottom:10px;' src="+allPeoplestaff.employees[i].depict+ 
												  "/><p style='margin-bottom:5px;'>" + allPeoplestaff.employees[i].affiliation + ", Raum " + allPeoplestaff.employees[i].room + "</p>"+
												  "<button id=" + allPeoplestaff.employees[i].room + " class='ui-btn ui-btn-inline' style='margin-right: 30px; margin-bottom: 10px;' "+
												  "onclick=showNavigation(this.id)>Zur Wegbeschreibung</button></div></div>";							
								$( "#people" ).append( content ).collapsibleset( "refresh" );									
						}
			});
	
			$("#P").click(function(){
					log('Search for people with P-T',new Date())
					document.getElementById("people").innerHTML="";
					var peopleContentP_T = localStorage.getItem("peopleP_T");				
					var allPeoplestaff = JSON.parse(peopleContentP_T);
					var pqrst_length = allPeoplestaff.employees.length;
	
						for ( var i = 0; i < pqrst_length; i++ ) {  
									var content = "<div style = 'display:block;' data-role='collapsible' id='set" + i + "' class='A_E'><h3>" + allPeoplestaff.employees[i].name + 
												  "</h3><div><img style='width:60px; float:left; margin-right:20px; margin-bottom:10px;' src="+allPeoplestaff.employees[i].depict+ 
												  "/><p style='margin-bottom:5px;'>" + allPeoplestaff.employees[i].affiliation + ", Raum " + allPeoplestaff.employees[i].room + "</p>"+
												  "<button id=" + allPeoplestaff.employees[i].room + " class='ui-btn ui-btn-inline' style='margin-right: 30px; margin-bottom: 10px;' "+
												  "onclick=showNavigation(this.id)>Zur Wegbeschreibung</button></div></div>";							
								$( "#people" ).append( content ).collapsibleset( "refresh" );									
						}
			});
	
			$("#U").click(function(){
					log('Search for people with U-Z',new Date())
					document.getElementById("people").innerHTML="";
					var peopleContentU_Z = localStorage.getItem("peopleU_Z");			
					var allPeoplestaff = JSON.parse(peopleContentU_Z);
					var uvwxyz_length = allPeoplestaff.employees.length;
									
						for ( var i = 0; i < uvwxyz_length; i++ ) {  
									var content = "<div style = 'display:block;' data-role='collapsible' id='set" + i + "' class='A_E'><h3>" + allPeoplestaff.employees[i].name + 
												  "</h3><div><img style='width:60px; float:left; margin-right:20px; margin-bottom:10px;' src="+allPeoplestaff.employees[i].depict+ 
												  "/><p style='margin-bottom:5px;'>" + allPeoplestaff.employees[i].affiliation + ", Raum " + allPeoplestaff.employees[i].room + "</p>"+
												  "<button id=" + allPeoplestaff.employees[i].room + " class='ui-btn ui-btn-inline' style='margin-right: 30px; margin-bottom: 10px;' "+
												  "onclick=showNavigation(this.id)>Zur Wegbeschreibung</button></div></div>";							
								$( "#people" ).append( content ).collapsibleset( "refresh" );									
						}
			});
						
			$("#AE").click(function(){
					log('Search for people with AE-UE',new Date())
					document.getElementById("people").innerHTML="";
					var peopleContentAE_UE = localStorage.getItem("peopleAE_UE");			
					var allPeoplestaff = JSON.parse(peopleContentAE_UE);
					var aeoeue_length = allPeoplestaff.employees.length;
	
						for ( var i = 0; i < aeoeue_length; i++ ) {  
									var content = "<div style = 'display:block;' data-role='collapsible' id='set" + i + "' class='A_E'><h3>" + allPeoplestaff.employees[i].name + 
												  "</h3><div><img style='width:60px; float:left; margin-right:20px; margin-bottom:10px;' src="+allPeoplestaff.employees[i].depict+ 
												  "/><p style='margin-bottom:5px;'>" + allPeoplestaff.employees[i].affiliation + ", Raum " + allPeoplestaff.employees[i].room + "</p>"+
												  "<button id=" + allPeoplestaff.employees[i].room + " class='ui-btn ui-btn-inline' style='margin-right: 30px; margin-bottom: 10px;' "+
												  "onclick=showNavigation(this.id)>Zur Wegbeschreibung</button></div></div>";							
								$( "#people" ).append( content ).collapsibleset( "refresh" );									
						}
			});
			
			$("#floor0").click(function(){
					log('Search for Floor 0',new Date())
					document.getElementById("room").innerHTML="";
					var allRooms = localStorage.getItem("floor0");
					allRooms = allRooms.split(";");
									
						for ( var i = 0; i < allRooms.length; i+=3 ) {  
									var content = "<div style = 'display:block;' data-role='collapsible' id='set" + i + "' class='A_E'><h3>" + allRooms[i] + 
												  "</h3><div><p style='margin-bottom:5px;'>" + allRooms[i+1] + "</p>"+"<p style='margin-bottom:5px;'>" + allRooms[i+2] + "</p>"+
												  "<button id="+allRooms[i]+" class='ui-btn ui-btn-inline' style='margin-right: 30px; margin-bottom: 10px;' "+
												  "onclick=showNavigation(this.id)>Zur Wegbeschreibung</button></div></div>";							
								$( "#room" ).append( content ).collapsibleset( "refresh" );									
						}
			});
			
			$("#floor1").click(function(){
					log('Search for Floor 1',new Date())
					document.getElementById("room").innerHTML="";
					var allRooms = localStorage.getItem("floor1");
					allRooms = allRooms.split(";");
									
						for ( var i = 0; i < allRooms.length; i+=3 ) {  
									var content = "<div style = 'display:block;' data-role='collapsible' id='set" + i + "' class='A_E'><h3>" + allRooms[i] + 
												  "</h3><div><p style='margin-bottom:5px;'>" + allRooms[i+1] + "</p>"+"<p style='margin-bottom:5px;'>" + allRooms[i+2] + "</p>"+
												  "<button id="+allRooms[i]+" class='ui-btn ui-btn-inline' style='margin-right: 30px; margin-bottom: 10px;' "+
												  "onclick=showNavigation(this.id)>Zur Wegbeschreibung</button></div></div>";							
								$( "#room" ).append( content ).collapsibleset( "refresh" );									
						}
			});			
			
			$("#floor2").click(function(){
					log('Search for Floor 2',new Date())
					document.getElementById("room").innerHTML="";
					var allRooms = localStorage.getItem("floor2");
					allRooms = allRooms.split(";");			
						for ( var i = 0; i < allRooms.length; i+=3 ) {  
									var content = "<div style = 'display:block;' data-role='collapsible' id='set" + i + "' class='A_E'><h3>" + allRooms[i] + 
												  "</h3><div><p style='margin-bottom:5px;'>" + allRooms[i+1] + "</p>"+"<p style='margin-bottom:5px;'>" + allRooms[i+2] + "</p>"+
												  "<button id="+allRooms[i]+" class='ui-btn ui-btn-inline' style='margin-right: 30px; margin-bottom: 10px;' "+
												  "onclick=showNavigation(this.id)>Zur Wegbeschreibung</button></div></div>";							
								$( "#room" ).append( content ).collapsibleset( "refresh" );									
						}
			});			
			
			$("#floor3").click(function(){
					log('Search for Floor 3',new Date())
					document.getElementById("room").innerHTML="";
					var allRooms = localStorage.getItem("floor3");
					allRooms = allRooms.split(";");
									
						for ( var i = 0; i < allRooms.length; i+=3 ) {  
									var content = "<div style = 'display:block;' data-role='collapsible' id='set" + i + "' class='A_E'><h3>" + allRooms[i] + 
												  "</h3><div><p style='margin-bottom:5px;'>" + allRooms[i+1] + "</p>"+"<p style='margin-bottom:5px;'>" + allRooms[i+2] + "</p>"+
												  "<button id="+allRooms[i]+" class='ui-btn ui-btn-inline' style='margin-right: 30px; margin-bottom: 10px;' "+
												  "onclick=showNavigation(this.id)>Zur Wegbeschreibung</button></div></div>";							
								$( "#room" ).append( content ).collapsibleset( "refresh" );									
						}
			});
			
			$("#floor4").click(function(){
					log('Search for Floor 4',new Date())
					document.getElementById("room").innerHTML="";
					var allRooms = localStorage.getItem("floor4");
					allRooms = allRooms.split(";");
									
						for ( var i = 0; i < allRooms.length; i+=3 ) {  
									var content = "<div style = 'display:block;' data-role='collapsible' id='set" + i + "' class='A_E'><h3>" + allRooms[i] + 
												  "</h3><div><p style='margin-bottom:5px;'>" + allRooms[i+1] + "</p>"+"<p style='margin-bottom:5px;'>" + allRooms[i+2] + "</p>"+
												  "<button id="+allRooms[i]+" class='ui-btn ui-btn-inline' style='margin-right: 30px; margin-bottom: 10px;' "+
												  "onclick=showNavigation(this.id)>Zur Wegbeschreibung</button></div></div>";							
								$( "#room" ).append( content ).collapsibleset( "refresh" );									
						}
			});
			
			$("#floor5").click(function(){
					log('Search for Floor 5',new Date())
					document.getElementById("room").innerHTML="";
					var allRooms = localStorage.getItem("floor5");
					allRooms = allRooms.split(";");
									
						for ( var i = 0; i < allRooms.length; i+=3 ) {  
									var content = "<div style = 'display:block;' data-role='collapsible' id='set" + i + "' class='A_E'><h3>" + allRooms[i] + 
												  "</h3><div><p style='margin-bottom:5px;'>" + allRooms[i+1] + "</p>"+"<p style='margin-bottom:5px;'>" + allRooms[i+2] + "</p>"+
												  "<button id="+allRooms[i]+" class='ui-btn ui-btn-inline' style='margin-right: 30px; margin-bottom: 10px;' "+
												  "onclick=showNavigation(this.id)>Zur Wegbeschreibung</button></div></div>";							
								$( "#room" ).append( content ).collapsibleset( "refresh" );									
						}
			});
			
			$("#floor6").click(function(){
					log('Search for Floor 6',new Date())
					document.getElementById("room").innerHTML="";
					var allRooms = localStorage.getItem("floor6");
					allRooms = allRooms.split(";");
									
						for ( var i = 0; i < allRooms.length; i+=3 ) {  
									var content = "<div style = 'display:block;' data-role='collapsible' id='set" + i + "' class='A_E'><h3>" + allRooms[i] + 
												  "</h3><div><p style='margin-bottom:5px;'>" + allRooms[i+1] + "</p>"+"<p style='margin-bottom:5px;'>" + allRooms[i+2] + "</p>"+
												  "<button id="+allRooms[i]+" class='ui-btn ui-btn-inline' style='margin-right: 30px; margin-bottom: 10px;' "+
												  "onclick=showNavigation(this.id)>Zur Wegbeschreibung</button></div></div>";							
								$( "#room" ).append( content ).collapsibleset( "refresh" );									
						}
			});
			
			$("#special").click(function(){
					log('Search for special rooms',new Date())
					document.getElementById("room").innerHTML="";
					var allRooms = localStorage.getItem("special");
					allRooms = allRooms.split(";");
									
						for ( var i = 0; i < allRooms.length; i+=3 ) {  
									var content = "<div style = 'display:block;' data-role='collapsible' id='set" + i + "' class='A_E'><h3>" + allRooms[i+1] + 
												  "</h3><div><p style='margin-bottom:5px;'> Raum " + allRooms[i] + "</p>"+"<p style='margin-bottom:5px;'>" + allRooms[i+2] + "</p>"+
												  "<button id="+allRooms[i]+" class='ui-btn ui-btn-inline' style='margin-right: 30px; margin-bottom: 10px;' "+
												  "onclick=showNavigation(this.id)>Zur Wegbeschreibung</button></div></div>";							
								$( "#room" ).append( content ).collapsibleset( "refresh" );									
						}
			});
				
			$("#ifgi").click(function(){
					log('Search for IfGI',new Date())
					document.getElementById("instituteList").innerHTML="";
					var peopleContentIFGI = localStorage.getItem("storeifgi");	
					var allPeoplestaff = JSON.parse(peopleContentIFGI);
					var ifgi_length = allPeoplestaff.employees.length;
					
					for (var  i = 0; i < ifgi_length; i++ ) {  
						
									var content = "<div style = 'display:block;' data-role='collapsible' id='set" + i + "' class='A_E'><h3>" + allPeoplestaff.employees[i].name + 
												  "</h3><div><img style='width:60px; float:left; margin-right:20px; margin-bottom:10px;' src="+allPeoplestaff.employees[i].depict+ 
												  "><p style='margin-bottom:5px;'>" + allPeoplestaff.employees[i].affiliation + ", Room " + allPeoplestaff.employees[i].room + "</p>"+
												  "<button id=" + allPeoplestaff.employees[i].room + " class='ui-btn ui-btn-inline' style='margin-right: 30px; margin-bottom: 10px;' "+
												  "onclick=showNavigation(this.id)>Zur Wegbeschreibung</button></div></div>";							
								$( "#instituteList" ).append( content ).collapsibleset( "refresh" );									
						}
					});
		
			$("#geogr").click(function(){
					log('Search for IfG',new Date())
					document.getElementById("instituteList").innerHTML="";
					var peopleContentIFG = localStorage.getItem("storeifg");
					var allPeoplestaff = JSON.parse(peopleContentIFG);
					var ifgi_length = allPeoplestaff.employees.length;
					
					for (var  i = 0; i < ifgi_length; i++ ) {  
						
									var content = "<div style = 'display:block;' data-role='collapsible' id='set" + i + "' class='A_E'><h3>" + allPeoplestaff.employees[i].name + 
												  "</h3><div><img style='width:60px; float:left; margin-right:20px; margin-bottom:10px;' src="+allPeoplestaff.employees[i].depict+ 
												  "><p style='margin-bottom:5px;'>" + allPeoplestaff.employees[i].affiliation + ", Room " + allPeoplestaff.employees[i].room + "</p>"+
												  "<button id=" + allPeoplestaff.employees[i].room + " class='ui-btn ui-btn-inline' style='margin-right: 30px; margin-bottom: 10px;' "+
												  "onclick=showNavigation(this.id)>Zur Wegbeschreibung</button></div></div>";							
								$( "#instituteList" ).append( content ).collapsibleset( "refresh" );									
						}
			});
		
			$("#dgeogr").click(function(){
					log('Search for IfDG',new Date())
					document.getElementById("instituteList").innerHTML="";
					var peopleContentIFG = localStorage.getItem("storeifdg");
					var allPeoplestaff = JSON.parse(peopleContentIFG);
					var ifgi_length = allPeoplestaff.employees.length;
					
					for (var  i = 0; i < ifgi_length; i++ ) {  
						
									var content = "<div style = 'display:block;' data-role='collapsible' id='set" + i + "' class='A_E'><h3>" + allPeoplestaff.employees[i].name + 
												  "</h3><div><img style='width:60px; float:left; margin-right:20px; margin-bottom:10px;' src="+allPeoplestaff.employees[i].depict+ 
												  "><p style='margin-bottom:5px;'>" + allPeoplestaff.employees[i].affiliation + ", Room " + allPeoplestaff.employees[i].room + "</p>"+
												  "<button id=" + allPeoplestaff.employees[i].room + " class='ui-btn ui-btn-inline' style='margin-right: 30px; margin-bottom: 10px;' "+
												  "onclick=showNavigation(this.id)>Zur Wegbeschreibung</button></div></div>";							
								$( "#instituteList" ).append( content ).collapsibleset( "refresh" );									
						}
			});	
			
			$("#loek").click(function(){
					log('Search for LOEK',new Date())
					document.getElementById("instituteList").innerHTML="";
					var peopleContentLOEK = localStorage.getItem("storeloek");
					var allPeoplestaff = JSON.parse(peopleContentLOEK);
					var ifgi_length = allPeoplestaff.employees.length;
					
					for (var  i = 0; i < ifgi_length; i++ ) {  
						
									var content = "<div style = 'display:block;' data-role='collapsible' id='set" + i + "' class='A_E'><h3>" + allPeoplestaff.employees[i].name + 
												  "</h3><div><img style='width:60px; float:left; margin-right:20px; margin-bottom:10px;' src="+allPeoplestaff.employees[i].depict+ 
												  "><p style='margin-bottom:5px;'>" + allPeoplestaff.employees[i].affiliation + ", Room " + allPeoplestaff.employees[i].room + "</p>"+
												  "<button id=" + allPeoplestaff.employees[i].room + " class='ui-btn ui-btn-inline' style='margin-right: 30px; margin-bottom: 10px;' "+
												  "onclick=showNavigation(this.id)>Zur Wegbeschreibung</button></div></div>";							
								$( "#instituteList" ).append( content ).collapsibleset( "refresh" );									
						}
			});
			
			$("#geopal").click(function(){
					log('Search for GeoPal',new Date())
					document.getElementById("instituteList").innerHTML="";
					var peopleContentGEOPAL = localStorage.getItem("storegeopal");
					var allPeoplestaff = JSON.parse(peopleContentGEOPAL);
					var ifgi_length = allPeoplestaff.employees.length;
					
					for (var  i = 0; i < ifgi_length; i++ ) {  
						
									var content = "<div style = 'display:block;' data-role='collapsible' id='set" + i + "' class='A_E'><h3>" + allPeoplestaff.employees[i].name + 
												  "</h3><div><img style='width:60px; float:left; margin-right:20px; margin-bottom:10px;' src="+allPeoplestaff.employees[i].depict+ 
												  "><p style='margin-bottom:5px;'>" + allPeoplestaff.employees[i].affiliation + ", Room " + allPeoplestaff.employees[i].room + "</p>"+
												  "<button id=" + allPeoplestaff.employees[i].room + " class='ui-btn ui-btn-inline' style='margin-right: 30px; margin-bottom: 10px;' "+
												  "onclick=showNavigation(this.id)>Zur Wegbeschreibung</button></div></div>";							
								$( "#instituteList" ).append( content ).collapsibleset( "refresh" );									
						}
			});	
			
			$("#misc").click(function(){
					log('Search for MISC',new Date())
					document.getElementById("instituteList").innerHTML="";
					var peopleContentMISC = localStorage.getItem("storemisc");
					var allPeoplestaff = JSON.parse(peopleContentMISC);
					var ifgi_length = allPeoplestaff.employees.length;
					
					for (var  i = 0; i < ifgi_length; i++ ) {  
						
									var content = "<div style = 'display:block;' data-role='collapsible' id='set" + i + "' class='A_E'><h3>" + allPeoplestaff.employees[i].name + 
												  "</h3><div><img style='width:60px; float:left; margin-right:20px; margin-bottom:10px;' src="+allPeoplestaff.employees[i].depict+ 
												  "><p style='margin-bottom:5px;'>" + allPeoplestaff.employees[i].affiliation + ", Room " + allPeoplestaff.employees[i].room + "</p>"+
												  "<button id=" + allPeoplestaff.employees[i].room + " class='ui-btn ui-btn-inline' style='margin-right: 30px; margin-bottom: 10px;' "+
												  "onclick=showNavigation(this.id)>Zur Wegbeschreibung</button></div></div>";							
								$( "#instituteList" ).append( content ).collapsibleset( "refresh" );									
						}
			});				
			
			$("#geocomm").click(function(){
					log('Search for GeoComm',new Date())
					document.getElementById("instituteList").innerHTML="";
					var peopleContentGEOCOMM = localStorage.getItem("storegeocomm");
					var allPeoplestaff = JSON.parse(peopleContentGEOCOMM);
					var ifgi_length = allPeoplestaff.employees.length;
					
					for (var  i = 0; i < ifgi_length; i++ ) {  
						
									var content = "<div style = 'display:block;' data-role='collapsible' id='set" + i + "' class='A_E'><h3>" + allPeoplestaff.employees[i].name + 
												  "</h3><div><img style='width:60px; float:left; margin-right:20px; margin-bottom:10px;' src="+allPeoplestaff.employees[i].depict+ 
												  "><p style='margin-bottom:5px;'>" + allPeoplestaff.employees[i].affiliation + ", Room " + allPeoplestaff.employees[i].room + "</p>"+
												  "<button id=" + allPeoplestaff.employees[i].room + " class='ui-btn ui-btn-inline' style='margin-right: 30px; margin-bottom: 10px;' "+
												  "onclick=showNavigation(this.id)>Show Navigation</button></div></div>";							
								$( "#instituteList" ).append( content ).collapsibleset( "refresh" );									
						}
			});				
	}); 