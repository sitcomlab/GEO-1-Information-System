function log(action, timestamp){
	var temp = localStorage.getItem("logActions");
		temp = temp + timestamp + "," + action + ";";
	localStorage["logActions"] = temp;	
	console.log(temp);
}

function saveLog(){
	$.post(
			"php/logData.php?",
			{	
			Actions:localStorage.getItem("logActions")
			},
			function(data){
				window.location=("/mainpage.html");
			}
		);				
}