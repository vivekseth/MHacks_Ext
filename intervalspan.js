function intervalspan(minutes) 
{

var ms = minutes * 60000; 
var x = setInterval(function() {intervalNotify(interval)}, ms);

function stopInterval()
	{
		clearInterval(x);
	}
}
