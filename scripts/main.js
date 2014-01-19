app.addedPopup = false;

function isBlockedSite(url) {
	for (var i = 0; i < app.blocked_sites.length; i++) {
		var host1 = getHostName(url);
		var host2 = getHostName(app.blocked_sites[i]);
		if (host1.match(host2) || host2.match(host1)) {
			return true;
		}
	}
	return false;
}
function getHostName(url) {
	var parser = document.createElement('a');
	parser.href = url;
	var hostName = parser.hostname;
	//var hostName = window.location.host;
	return hostName;
}
app.small_ticker = setInterval(function(){smallTickFunc();}, app.SMALL_TICK_INT);
var smallTickFunc = function(){
	chrome.tabs.getSelected(null, function(tab) {
	  console.log(tab);
	  tabUrl = tab.url;
	  if (!app.log.tracking && isBlockedSite(tabUrl)) {
	  	enteredBlockedSite()
	  }
	  else if (app.log.tracking && !isBlockedSite(tabUrl)) {
	  	leftBlockedSite();
	  }
	});
}
function enteredBlockedSite() {
	app.log.tracking = true;
  	app.log.hostname = getHostName(tabUrl);
  	app.log.start_time = new Date();
  	app.big_ticker = setInterval(function(){bigTickFunc();}, 1000);
}
function leftBlockedSite() {
	clearInterval(app.big_ticker);
	app.log.tracking = false;
  	app.log.end_time = new Date();
  	console.log(app.log.end_time - app.log.start_time);
  	addLog(app.log.hostname, app.log.end_time, app.log.start_time);
  	app.log.hostname = null;
  	app.log.end_time = null;
  	app.log.start_time = null;
  	app.addedPopup = false;
}
function bigTickFunc() {
	console.log(app.BIG_TICK_INT)
	var minutes = app.BIG_TICK_INT/(1000 * 60);
	//if (minutes < 0) return;
	//chrome.tabs.executeScript(null, {file: "popup.js"});
	if (!app.addedPopup) {
		//chrome.tabs.executeScript({code: "function centerElement(e){e.style.position=\"fixed\";e.style.top=\"50%\";e.style.left=\"50%\";var t=e.clientWidth;var n=e.clientWidth;e.style.marginTop=-n/2+\"px\";e.style.marginLeft=-t/2+\"px\"}function addPopup(e,t,n){var r='<div id=\"__shadow\"><div id=\"__popup\"></div></div><style>#__popup {width: '+t+\"px;height: \"+n+\"px;background-color:#fff}#__shadow {position:absolute;width: 100%;height: 100%;background-color: rgba(0, 0, 0, 0.2);top:0px;}</style>\";var i=document.createElement(\"span\");i.innerHTML=r;document.body.appendChild(i.firstChild);document.body.appendChild(i.firstChild);document.getElementById(\"__popup\").innerHTML=e;centerElement(document.getElementById(\"__popup\"))}addPopup(\"hello world<div>hello world</div>\",500,500)"});
		chrome.tabs.executeScript(null, {file: "scripts/popup.js"});
		app.addedPopup = true;
	}
}


