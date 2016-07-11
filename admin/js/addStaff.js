function checkContent() {
	fn = $('#firstname').val().trim();
	sn = $('#secondname').val().trim();
	if (fn.length == 0) {
		alert("First name is missing");
	} else if (sn.length == 0) {
		alert("Second name is missing");
	} else if (isNaN(parseFloat($('#room').val()))) {
		alert("Room is not a number");
	} else {
		if (checkPersons(upperCaseCheck(sn) + "," + upperCaseCheck(fn))) {
			alert("Staff member already exists");
		} else {
			adoptStaff();
		}
	}
}

function adoptStaff() {
	if ($('#confirmation').is(':empty') == true) {
		firstName = document.getElementById("firstname").value;
		secondName = document.getElementById("secondname").value;
		room = document.getElementById("room").value;
		affiliation = document.getElementById("selectAff").value;
		if (affiliation === "Miscellaneous" && document.getElementById("specifyMisc").value.trim() != "") {
			affiliation = document.getElementById("specifyMisc").value;
		}

		$('#confirmation').append('<b>Would like to add the following staff member?</b>' +
				'<p id = "fn">First name: ' + firstName + '</p>' +
				'<p>Second name: ' + secondName + '</p>' +
				'<p>Affiliation: ' + affiliation + '</p>' +
				'<p>Room: ' + room + '</p>' +
				'<button id = "addBtn" data-role="button" class="ui-btn ui-btn-inline">Add new staff member</button>' +
				'<button id = "clearFormBtn" data-role="button" class="ui-btn ui-btn-inline">Clear form</button>');
		$('#addBtn').bind('click', function () {
			addStaff(firstName, secondName, room, affiliation);
		});
		$('#addBtn').button();
		$('#clearFormBtn').bind('click', clearForm);
		$('#clearFormBtn').button();
	}
}

function upperCaseCheck(name) {
	if (name[0] !== name[0].toUpperCase()) {
		name = name[0].toUpperCase() + name.substring(1, name.length);
	}
	return name;
}

function addStaff(fs, sn, room, aff) {
	fs = upperCaseCheck(fs);
	sn = upperCaseCheck(sn);
	$.post(
			"php/addStaff.php?",
			{
				FirstName: fs.trim(),
				LastName: sn.trim(),
				Room: room.trim(),
				Affiliation: aff.trim()
			},
			function (data) {
				alert("Added " + sn + "," + fs + " successfully. Refresh the page in order to adopt the changes in the display section.");
				getStaff();
				clearForm();
			}
	);
}

function clearForm() {
	$("#firstname").val("");
	$("#secondname").val("");
	$("#updatename").val("");
	$("#room").val("");
	$("#confirmation").empty();
}