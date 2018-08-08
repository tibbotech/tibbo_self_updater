function processClick(uploadMethod){
    
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
	document.getElementById("demo").innerHTML = this.responseText;
    }
	};
	if (uploadMethod == 1) {
		xhttp.open("GET", "processweb.html", true);
	} else if (uploadMethod == 2) {	
		xhttp.open("GET", "processserial.html", true);
	} else if (uploadMethod == 3) {
		xhttp.open("GET", "processwifi.html", true);
	} else if (uploadMethod == 4) {
		xhttp.open("GET", "processbluetooth.html", true);
	} else if (uploadMethod == 5) {
		xhttp.open("GET", "processethernet.html", true);
	}
	xhttp.send();	
};
  
var intervalSetter
  
function loadDoc() {
var method  = "0"
var value  = "0"
var baud = "0"
if(document.getElementById("url")){
	method = "web";
    value = document.getElementById("url").value;
} else if(document.getElementById("ser")){
	method = "ser";
    var e = document.getElementById("ser");
    value = e.options[e.selectedIndex].value;
	e = document.getElementById("baud");
	baud = e.options[e.selectedIndex].value;
} else if(document.getElementById("wifi")){
	method = "wifi";
} else if(document.getElementById("ethernet")){
	method = "ethernet";
} else if(document.getElementById("ble")){
	method = "ble";
}
 
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
if (this.readyState == 4 && this.status == 200) 
	intervalSetter = setInterval(loadStatus, 1000);		 
	};
	xhttp.open("GET", "upload.html?method=" + method + "&value=" + value + "&baud=" + baud, true);
	xhttp.send();
}

function loadStatus(){
 
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
if (this.readyState == 4 && this.status == 200) {
	document.getElementById("demo").innerHTML =
		this.responseText;
    }
   };
	xhttp.open("GET", "status.html", true);
	xhttp.send();	
};

function loadIndex(){
 
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
if (this.readyState == 4 && this.status == 200) {
	document.getElementById("indexpage").innerHTML =
		this.responseText;
    }
   };
	xhttp.open("GET", "index.html", true);
	xhttp.send();	
};

function cancelUpgrade(){
	
	clearInterval(intervalSetter)
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		document.getElementById("demo").innerHTML =
			this.responseText;
		}
	   };
		xhttp.open("GET", "cancelupgrade.html", true);
		xhttp.send();	
};	