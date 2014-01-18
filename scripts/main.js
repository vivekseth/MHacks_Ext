function isBlockedSite(url) {
	for (var i = 0; i < app.blocked_sites.length; i++) {
		var host1 = getHostName(url);
		var host2 = getHostName(app.blocked_sites[i]);
		if (host1 == host2) {
			return true;
		}
	}
	return false;
}
function getHostName(url) {
	var parser = document.createElement('a');
	parser.href = url
	var hostName = parser.hostname;
	return hostName;
}
app.small_ticker = setInterval(function(){smallTickFunc();}, app.SMALL_TICK_INT);
var smallTickFunc = function(){
	chrome.tabs.getSelected(null, function(tab) {
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
  	app.big_ticker = setInterval(function(){bigTickFunc();}, app.BIG_TICK_INT);
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
}
function bigTickFunc() {
	var minutes = app.BIG_TICK_INT/(1000 * 60);
	if (minutes < 0) return;
	chrome.tabs.executeScript(null, {file: "popup.js"});
}


