function centerElement(el) {
	el.style.position = "fixed";
	el.style.top = "50%"
	el.style.left = "50%"
	var width = el.clientWidth;
	var height = el.clientWidth;
	el.style.marginTop = - height/2 + "px";
	el.style.marginLeft = - width/2 + "px";
}
function addPopup(html) {
	var basic_popup = "<div id=\"__shadow\"><div id=\"__popup\"></div></div><style>#__popup {width: 300px;height: 300px;background-color:#fff}#__shadow {position:absolute;width: 100%;height: 100%;background-color: rgba(0, 0, 0, 0.2);top:0px;}</style>";
	var temp = document.createElement("span");
	temp.innerHTML = basic_popup;
	document.body.appendChild(temp.firstChild);                              
	document.body.appendChild(temp.firstChild);
	document.getElementById("__popup").innerHTML = html;
	centerElement(document.getElementById("__popup"));
}
addPopup("<h1>Hello World</h1>")