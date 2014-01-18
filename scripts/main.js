function isBlockedSite(url) {
	for (var i = 0; i < app.blocked_sites.length; i++) {
		if (getHostName(url) == getHostName(app.blocked_sites[i])) {
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
app.small_ticker = setInterval(function(){smallTickFunc();}, SMALL_TICK_INT);
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
  	app.big_ticker = setInterval(function(){bigTickFunc();}, BIG_TICK_INT);
}
function leftBlockedSite() {
	clearInterval(bigTick);
	app.log.tracking = false;
  	app.log.end_time = new Date();
  	console.log(app.log.end_time - app.log.start_time);
  	addLog(app.log.hostname, app.log.end_time, app.log.start_time);
  	app.log.hostname = null;
  	app.log.end_time = null;
  	app.log.start_time = null;
}
function bigTickFunc() {
	var minutes = BIG_TICK_INT/(1000 * 60);
	if (minutes < 0) return;
	intervalNotify(minutes);
}


