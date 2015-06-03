function log(action, timestamp){
	var temp = localStorage.getItem("logActions");
		temp = temp + timestamp + "," + action + ";";
	localStorage["logActions"] = temp;	
}

function saveLog(){
	$.post(
			"php/logData.php?",
			{	
			Actions:localStorage.getItem("logActions")
			},
			function(data){
				window.location=("/SystemNeu/mainpage.html");
			}
		);				
}