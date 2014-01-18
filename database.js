function createLog(website, url, start_time, end_time) {
	return {
		"website" : website,
		"url" : url,
		"start_time" : start_time,
		"end_time" : end_time,
	}
}
function saveLog(l) {
	chrome.storage.local.get("logs", function(data){
		data.logs.push(l);
		chrome.storage.local.set(data);
	})
}
function getLogs() {
	chrome.storage.local.get("logs", function(value){
		console.log(value)
	})
}