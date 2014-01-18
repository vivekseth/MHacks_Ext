var SMALL_TICK_INT = 500

var tracking = false;
var hostname = null;
var start_time = null;
var end_time = null;

var blockedSites = [
"http://www.facebook.com"
];

function isBlockedSite(url) {
	for (var i = 0; i < blockedSites.length; i++) {
		if (getHostName(url) == getHostName(blockedSites[i])) {
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

setInterval(function(){smallTickFunc();}, SMALL_TICK_INT);
var smallTickFunc = function(){
	chrome.tabs.getSelected(null, function(tab) {
	  tabUrl = tab.url;
	  if (!tracking && isBlockedSite(tabUrl)) {
	  	tracking = true;
	  	hostname = getHostName(tabUrl);
	  	start_time = new Date();
	  	console.log("get back to work!")
	  }
	  else if (tracking && !isBlockedSite(tabUrl)) {
	  	tracking = false;
	  	end_time = new Date();
	  	console.log(end_time - start_time);

	  	addLog(hostname, start_time, end_time);

	  	hostname = null;
	  	end_time = null;
	  	start_time = null;
	  }
	});
}