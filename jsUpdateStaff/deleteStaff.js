	var text="";

	function clear(){
		$('#name').empty();
		$('#confirm').empty();
	}	
	
	function confirm(){
		var name = text.trim();
		$('#delete').append('<div id = "confirm">');
		if (checkPersons(text) && text != ""){
			document.getElementById("confirm").innerHTML = "";
			$('#confirm').append('<div id = "confirmBtn" style = "margin-top:3%">Do you really want to delete ' + name + '?</br>' + 
								'<button id = "yesButton" data-role="button" class="ui-btn ui-btn-inline">Yes</button>' + 
								'<button id = "noButton" data-role="button" class="ui-btn ui-btn-inline">No</button></div>');
								// bind functionality
								$('#yesButton').bind('click', function(){
									deleteStaff(name);
								});
								$('#yesButton').button();

								$('#noButton').bind('click', clear);
								$('#noButton').button();				
		}else{
			$('#confirm').empty();
			$('#confirm').append('Staff member not found.');
		}
	}	
	
	function deleteStaff(name){
		$.post(
			"php/deleteStaff.php?",
			{	
			Name: name
			},
			function(data){
				clear();
				alert("Deletion successful.")
				getStaff();
			}			
		);		
	}
	