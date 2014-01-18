function startinterval(minutes) 
{

var ms = minutes * 60000; 
var x = setInterval(function() {intervalNotify(interval)}, ms);
endinterval(x);

}

function endinterval(x)
{
clearInterval(x);
}
