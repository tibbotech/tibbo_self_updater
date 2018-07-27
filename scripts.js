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
	}
	xhttp.send();	
};
  
  
function loadDoc() {
var method  = ""
var value  = ""
if(document.getElementById("url")){
	method = "web";
    value = document.getElementById("url").value;
} else if(document.getElementById("ser")){
	method = "ser";
    var e = document.getElementById("ser");
    value = e.options[e.selectedIndex].value;
} else if(document.getElementById("wifi")){
	method = "wifi";
} else if(document.getElementById("ble")){
	method = "ble";
}
 
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
if (this.readyState == 4 && this.status == 200) 
	setInterval(loadStatus, 1000);		 
	};
	xhttp.open("GET", "upload.html?method=" + method + "&value=" + value, true);
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

