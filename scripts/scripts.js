window.addEventListener('beforeunload', function (e) {
	if (upgradeProgress > 0) {//upload in progress
		if (confirm("abort upgrade?")) {
			// Cancel the event
			e.preventDefault();
			// Chrome requires returnValue to be set
			e.returnValue = '';
		}
	}
});

function processClick(uploadMethod) {

	var xhttp = new XMLHttpRequest();
	var method = "";
	var value = "";
	var baud = 0;
	
	if (uploadMethod == 1) {
		xhttp.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				document.getElementById("demo").innerHTML = this.responseText;
			}
		};
		xhttp.open("GET", "processweb.html", true);
		xhttp.send();
		return;
	} else if (uploadMethod == 2) {
		// xhttp.open("GET", "processserial.html", true);
		method = "ser";
	} else if (uploadMethod == 3) {
		// xhttp.open("GET", "processwifi.html", true);
		method = "wifi";
	} else if (uploadMethod == 4) {
		// xhttp.open("GET", "processbluetooth.html", true);
		method = "ble";
	} else if (uploadMethod == 5) {
		// xhttp.open("GET", "processethernet.html", true);
		method="ethernet";
	}
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("demo").innerHTML = this.responseText;
			downloadUpgrades();
		}
	};
	xhttp.open("GET", "upload.html?method=" + method + "&value=" + value + "&baud=" + baud, true);
	xhttp.send();
};

var method = "0"

function loadDoc() {
	var value = "0"
	var baud = "0"
	if (document.getElementById("url")) {
		method = "web";
		value = document.getElementById("url").value;
	} else if (document.getElementById("ser")) {
		method = "ser";
		// var e = document.getElementById("ser");
		// value = e.options[e.selectedIndex].value;
		// e = document.getElementById("baud");
		// baud = e.options[e.selectedIndex].value;
		e = 0;
		baud = 115200;
	} else if (document.getElementById("wifi")) {
		method = "wifi";
	} else if (document.getElementById("ethernet")) {
		method = "ethernet";
	} else if (document.getElementById("ble")) {
		method = "ble";
	}

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200){
			document.getElementById("demo").innerHTML = this.responseText;
			downloadUpgrades();
		}
	};
	xhttp.open("GET", "upload.html?method=" + method + "&value=" + value + "&baud=" + baud, true);
	xhttp.send();
}

var showProgressInterval = undefined;
var upgradeProgress = 0;
function downloadUpgrades() {

	if (showProgressInterval == undefined) {
		showProgressInterval = setInterval(showProgress, 1000);
		upgradeProgress = 0;

		// var xhttp = new XMLHttpRequest();
		// xhttp.onreadystatechange = function () {
		// 	if (this.readyState == 4 && this.status == 200) {
		// 		document.getElementById("demo").innerHTML =
		// 			this.responseText;
		// 	}
		// };
		// xhttp.open("GET", "downloadupgrades.html", true);
		// xhttp.send();
	}
};

function showProgress() {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			var myObj = JSON.parse(this.responseText);
			document.getElementById("percent").innerHTML = myObj.percent;
			document.getElementById("size").innerHTML = myObj.size;
			document.getElementById("files").innerHTML = myObj.files;
			var elem = document.getElementById("progbar");
			elem.style.width = myObj.percent + "%";
			var x = document.getElementById("statusupdate");
			var y = document.getElementById("progressb");
			var z = document.getElementById("percentupdate");
			if (myObj.percent >= 100) {
				x.style.display = "none";
				clearInterval(showProgressInterval);
				showProgressInterval = undefined;
				startInstallTimer();
			}

			if (myObj.percent > 0 && myObj.percent < 100) {
				upgradeProgress = myObj.percent;
				x.style.display = "block";
				y.style.display = "block";
				z.style.display = "block";
				document.getElementById("title").innerHTML = "Downloading firmware upgrades...";
			}

		}
	};
	xmlhttp.open("GET", "showprogress.html", true);
	xmlhttp.send();
}

function loadIndex() {

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("indexpage").innerHTML =
				this.responseText;
		}
	};
	xhttp.open("GET", "index.html", true);
	xhttp.send();
};

function cancelUpgrade() {
	clearInterval(showProgressInterval);
	showProgressInterval = undefined;
	if (upgradeProgress == 0) {
		loadIndex();
		return;
	}
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
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
			rebootSystem();
		}
		if (duration-- <= 0) {
			clearInterval(rebootTimerInterval)
			loadIndex();
		}

	}, 1000);
}

function rebootSystem() {

	xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("reboot").innerHTML =
				this.responseText;
		}
	};
	xhttp.open("GET", "rebootsystem.html", true);
	xhttp.send();
}


var startInstallInterval = undefined;
function startInstallTimer() {
	var percent = 0;
	var elem = document.getElementById("progbar");
	if (startInstallInterval != undefined) {
		return;
	}
	startInstallInterval = setInterval(function () {
		document.getElementById("percent").innerHTML = percent;
		elem.style.width = percent + "%";
		percent++;
		if (percent > 0) {
			document.getElementById("title").innerHTML = "Installing upgrades...";
		}
		if (percent >= 100) {
			clearInterval(startInstallInterval)
			upgradeComplete();
		}
	}, 700);
}


function upgradeComplete() {

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("demo").innerHTML =
				this.responseText;
		}
	};
	xhttp.open("GET", "upgradecomplete.html", true);
	xhttp.send();
};	