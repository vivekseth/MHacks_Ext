function buttonhandler(doc) { 
	
	var textbox = doc.getElementById("textbox");
	var temp = textbox.value;
	var listarr = temp.split('\n');
	var app = chrome.extension.getBackgroundPage().app;

	app.blocked_sites = listarr;
	console.log(listarr);
	var time_string = doc.getElementById("interval").value;
	var time_string_num = time_string.substring(0, time_string.indexOf(" "));
	var min = Number(time_string_num);
	app.BIG_TICK_INT = min * 60 * 1000;

	var interval = document.getElementById("interval");
	localStorage.setItem('interval', interval.value);

	window.close();
}

document.getElementById("saveButton").addEventListener("click", function(){
	buttonhandler(window.document);
}, false);

window.addEventListener("load", function load(event){
	console.log("hello world");

    var textbox = document.getElementById("textbox");
	var app = chrome.extension.getBackgroundPage().app;
	textbox.value = app.blocked_sites.join("\n");

	var minuteInt = localStorage.getItem('interval');
	if(!minuteInt){
		minuteInt = '5';
		localStorage.setItem('interval', minuteInt);
	}
    var interval = document.getElementById("interval");
	interval.value = minuteInt;
 

},false);