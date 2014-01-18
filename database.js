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
		if (!data) data = {};
		if (!data.logs) data.logs = [];
		data.logs.push(l);
		chrome.storage.local.set(data);
	})
}
function getLogs() {
	chrome.storage.local.get("logs", function(data){
		console.log(data)
	})
}


logDB.open = function() {
	var version = 1;
  	var request = indexedDB.open("logs", version);

  	request.onupgradeneeded = function(e) {
	    var db = e.target.result;
	    // A versionchange transaction is started automatically.
	    e.target.transaction.onerror = html5rocks.indexedDB.onerror;
	    if(db.objectStoreNames.contains("logs")) {
	      db.deleteObjectStore("logs");
	    }
	    var store = db.createObjectStore("logs",
	      {keyPath: "timeStamp"});
	};

	request.onsuccess = function(e) {
	  logDB.db = e.target.result;
	  logDB.getAllLogItems();
	};

	request.onerror = logDB.onerror;
}

logDB.addTodo = function(website, url, start_time, end_time) {
  var db = logDB.db;
  var trans = db.transaction(["logs"], "readwrite");
  var store = trans.objectStore("logs");
  var request = store.put(createLog(website, url, start_time, end_time));

  request.onsuccess = function(e) {
    // Re-render all the logs's
    logDB.getAllLogItems();
  };

  request.onerror = function(e) {
    console.log(e.value);
  };
};

logDB.getAllLogItems = function(callback) {
  var db = logDB.db;
  var trans = db.transaction(["logs"], "readwrite");
  var store = trans.objectStore("logs");

  // Get everything in the store;
  var keyRange = IDBKeyRange.lowerBound(0);
  var cursorRequest = store.openCursor(keyRange);

  cursorRequest.onsuccess = function(e) {
    var result = e.target.result;
    if(!!result == false)
      return;

    callback(result.value);
    result.continue();
  };

  cursorRequest.onerror = logDB.onerror;
};

logDB.onerror = function(err) {
	console.logs(err);
}