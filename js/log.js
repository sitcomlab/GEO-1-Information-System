function log(action, timestamp) {
	var temp = localStorage.getItem("logActions");
	temp = temp + timestamp + "," + action + ";";
	localStorage["logActions"] = temp;
}

function saveLog() {
	var logDataSet = localStorage.getItem("logActions");
	if (logDataSet.split(";").length > 2) {
		$.post(
				"php/logData.php?",
				{
					Actions: logDataSet
				},
				function (data) {
					localStorage["logActions"] = "";
					window.location = "mainpage.html";
				}
		);
	}
}