    // show auto-complete values 
	var response;
	$(document).on( "pagebeforecreate", "#myPage", function() {
		getStaff();
	});
	
    $(document).on( "pageinit", "#myPage", function() {
		generateList();
		generateUpdateList();
    }); 
	
	$( document ).on( "pagecreate", function() {
		$('#buttonsAddStaff').append('<button id = "adoptBtn" data-role="button" class="ui-btn ui-btn-inline" style = "margin-top:3%;">Adopt</button>');
							// bind functionality
							$('#adoptBtn').bind('click', checkContent);
							$('#adoptBtn').button();						
		
		$( "#firstname" ).bind( "change", function(event, ui) {
			document.getElementById("confirmation").innerHTML="";
		});
		$( "#secondname" ).bind( "change", function(event, ui) {
			document.getElementById("confirmation").innerHTML="";
		});
		$( "#room" ).bind( "change", function(event, ui) {
			document.getElementById("confirmation").innerHTML="";
		});
		$( "#selectAff" ).bind( "change", function(event, ui) {
			document.getElementById("confirmation").innerHTML="";
		});
		$('#buttonsDeleteStaff').append('<button id = "deleteBtn" data-role="button" class="ui-btn ui-btn-inline">Delete staff member</button>');
			// bind functionality
			$('#deleteBtn').bind('click', confirm);
			$('#deleteBtn').button();		
							
	    $(document).on("click", "li", function () {
			text = $(this).text();
			$(this).closest("ul").prev("form").find("input").val(text); 
		});			
		
		$('#selectAff').on('change', function () {
		        val   = document.getElementById("selectAff").value;
		        
		        if (val === "Miscellaneous"){
		        	specifyAffiliation();
		        }else{
		        	$('#specifyMisc').remove();
		        }
		});
	});	
	
	function specifyAffiliation(){
		$('#chooseAff').append('<input type="text" name="name" id="specifyMisc" placeholder="Please specify" />');
	}
							
	var allNames = new Array();
	
	function checkPersons(name){
		var staff = allNames;
		var found = false;
		for (var i = 0; i < staff.length; i++){
			if (staff[i] === name){
				found = true;
			}
		}
		return found;
	}
	
	function getStaff(){
		$.ajax({
			type: "GET",
			url: "php/getData.php?",
			data: 'type=person'
		}).done(function(data) {
			data = JSON.parse(data);
			for (var i = 0; i < data.length; i++){
				allNames.push(data[i].Name);
			}
			$(function() {
				response = allNames;	
			});
		});	
	}
	
	function generateList(){
		$( ".autocomplete" ).on( "listviewbeforefilter", function ( e, data ) {        
			var $ul = $(this);                        // $ul refers to the shell unordered list under the input box
			var value = $( data.input ).val();        // this is value of what user entered in input box
			var dropdownContent = "" ;                // we use this value to collect the content of the dropdown
			$ul.html("") ;                            // clears value of set the html content of unordered list

				// on third character, trigger the drop-down
				if ( value && value.length > 2 ) {				
				  $('.autocomplete').show();       
				  $ul.html( "<li><div><span></span></div></li>" );
				  $ul.listview( "refresh" );
				  $.each(response, function( index, val ) {
					  dropdownContent += "<li>" + val + "</li>";
					$ul.html( dropdownContent );
				  });
					$ul.listview( "refresh" );
					$ul.trigger( "updatelayout");
				  }
		});		
		// click to select value of auto-complete
		$( document).on( "click", ".autocomplete li", function() {      
		  var selectedItem = $(this).html();
		  $(this).parent().parent().find('input').val(selectedItem);   
		  $('.autocomplete').hide();     
		});	
	}