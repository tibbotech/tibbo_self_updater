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
	downloadUpgrades();
	};
	xhttp.open("GET", "upload.html?method=" + method + "&value=" + value + "&baud=" + baud, true);
	xhttp.send();
}

var progressTimerStarted=false
function downloadUpgrades(){
if (progressTimerStarted==false){
	showProgressInterval = setInterval(showProgress, 300);
	progressTimerStarted=true;
}
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
if (this.readyState == 4 && this.status == 200) {
	document.getElementById("demo").innerHTML =
		this.responseText;
    }
   };
	xhttp.open("GET", "downloadupgrades.html", true);
	xhttp.send();
};

function showProgress(){
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var myObj = JSON.parse(this.responseText);
			var percentage=parseInt(myObj.percent)+2 
			document.getElementById("percent").innerHTML = percentage;
			document.getElementById("size").innerHTML = myObj.size;
			document.getElementById("files").innerHTML = myObj.files;
			var elem = document.getElementById("progbar");
			elem.style.width = percentage + "%";
			if (percentage>=100){
				clearInterval(showProgressInterval);
				installUpgrades();
			}
			var x = document.getElementById("statusupdate");
			var y = document.getElementById("progressb");
			if (myObj.percent>0){
				x.style.display = "block";
				y.style.display = "block";
				document.getElementById("title").innerHTML = "Downloading Firmware Updates";
			}
				
		}
	};
	xmlhttp.open("GET", "showprogress.html", true);
	xmlhttp.send();
}

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
	
	clearInterval(showProgressInterval)
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		document.getElementById("demo").innerHTML =
			this.responseText;
		}
	   };
		xhttp.open("GET", "upgradecancelled.html", true);
		xhttp.send();	
};	

var rebootTimerInterval;

function startRebootTimer(duration, display) {
    rebootTimerInterval = setInterval(function () {
		display.textContent = duration;
		if (duration == 28) {
			progressTimerStarted=false;
			rebootSystem();
		}
		if (duration-- <= 0) {
			clearInterval(rebootTimerInterval)
			loadIndex();
		}
		
    }, 1000);
}

function rebootSystem(){
	
	xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("reboot").innerHTML =
      this.responseText;
    }
  };
  xhttp.open("GET", "rebootsystem.html", true);
  xhttp.send();
}


function startInstallTimer() {
	var percent=0;
	var elem = document.getElementById("progbar");
	startInstallInterval = setInterval(function () {
	document.getElementById("percent").innerHTML = percent;
	elem.style.width = percent + "%";
	percent++;
	if (percent >= 100) {
		clearInterval(startInstallInterval)
		upgradeComplete();
		}
    }, 700);
}

function installUpgrades(){
	
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		document.getElementById("demo").innerHTML =
			this.responseText;
		}
	   };
		xhttp.open("GET", "installupgrades.html", true);
		xhttp.send();	
};	

function upgradeComplete(){
	
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		document.getElementById("demo").innerHTML =
			this.responseText;
		}
	   };
		xhttp.open("GET", "upgradecomplete.html", true);
		xhttp.send();	
};	
