var DATABASE = 'local_database';
var LOG_TABLE = 'time_logs';

console.log("hello world")
var db = new ydn.db.Storage(DATABASE);

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