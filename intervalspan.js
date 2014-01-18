
var interval;

function intervalspan(minutes) 
{

var ms = minutes * 60000; 
interval = setInterval(function() {intervalNotify(interval)}, ms);

}

function stopInterval()
	{
		clearInterval(interval);
	}

