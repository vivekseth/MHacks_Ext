function createLog(hostname, start_time, end_time) {
	return {
		"hostname" : hostname,
		"start_time" : start_time,
		"end_time" : end_time,
	}
}
function indexedDBOk() {
    return "indexedDB" in window;
}
document.addEventListener("DOMContentLoaded", function() {
	var version = 4;
    if(!indexedDBOk) return;
    var openRequest = indexedDB.open("LogDB_2_2",version);
    openRequest.onupgradeneeded = function(e) {
        var thisDB = e.target.result;
        if(!thisDB.objectStoreNames.contains("logs")) {
            thisDB.createObjectStore("logs", {keyPath: "myKey", autoIncrement: true});
        }
    }
    openRequest.onsuccess = function(e) {
        console.log("running onsuccess");
        app.db = e.target.result;
    }
    openRequest.onerror = function(e) {
        console.logs(e);
    }
},false);

function addLog(hostname, start_time, end_time) { 
    var transaction = app.db.transaction(["logs"],"readwrite");
    var store = transaction.objectStore("logs");
 
    //Define a person
    var log = createLog(hostname, start_time, end_time);
 
    //Perform the add
    var request = store.add(log);
    request.onerror = function(e) {
        console.log("Error",e.target.error.name);
    }
    request.onsuccess = function(e) {
        console.log("Woot! Did it");
    }
}