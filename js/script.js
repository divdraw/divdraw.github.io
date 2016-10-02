function getElem(id) {
	var elem;

	function getNode() {
		elem = document.getElementById(id);
		if (elem === null) {
			elem = document.getElementsByClassName(id);
			for (var i = 0; i < elem.length; i++) {
				elem[i].allStyle = getCss(elem[i]);
			}
		} else {
			elem.allStyle = getCss(elem);
		}
		return elem;
	}

	function getCss(obj) {
		return getComputedStyle(obj);
	}
	return getNode();
}

function getCoord() {
	canvas.cursor.x = event.clientX - canvas.paper.leftPosition();
	canvas.cursor.y = event.clientY - canvas.paper.topPosition();
}

function selectPan() {
	var pan = event.target;
	for (var i = 0; i < toolbar.elem.children.length; i++) {
		toolbar.elem.children[i].style.backgroundImage = "";
		toolbar.elem.children[i].style.backgroundPosition = "";
	}
	if (pan === toolbar.pans.round) {
		pan.style.backgroundImage = "url(../img/icons/round_pan_focus.png)";
		pan.style.backgroundPosition = "center";
		toolbar.activePan = "rd";
	} else if (pan === toolbar.pans.square) {
		pan.style.backgroundImage = "url(../img/icons/square_pan_focus.png)";
		pan.style.backgroundPosition = "center";
		toolbar.activePan = "sq";
	} else if (pan === toolbar.pans.clear) {
		pan.style.backgroundImage = "url(../img/icons/delete_pan_focus.png)";
		pan.style.backgroundPosition = "center";
		toolbar.activePan = "clear";
		canvas.paper.clear();
	}
}

function selectPanColor() {
	var color = event.target;
	for (var i = 0; i < color.parentElement.children.length; i++) {
		color.parentElement.children[i].style.borderRadius = "";
		color.parentElement.children[i].style.boxShadow = "";
	}
	color.style.borderRadius = "50%";
	color.style.boxShadow = "0px 0px 6px 4px #949494";
	if (color === toolbar.color.blue) {
		toolbar.color.activeColor = "#37abc8";
	}
	if (color === toolbar.color.red) {
		toolbar.color.activeColor = "#ff5555";
	}
	if (color === toolbar.color.green) {
		toolbar.color.activeColor = "#55ff99";
	}
}

function getCursor() {
	if (toolbar.activePan === "rd" && toolbar.color.activeColor === "#37abc8") {
		canvas.paper.elem.style.cursor = "url(../img/icons/round_pan_focus.png), pointer";
	}
	if (toolbar.activePan === "sq" && toolbar.color.activeColor === "#37abc8") {
		canvas.paper.elem.style.cursor = "url(../img/icons/square_pan_focus.png), pointer";
	}
	if (toolbar.activePan === "rd" && toolbar.color.activeColor === "#ff5555") {
		canvas.paper.elem.style.cursor = "url(../img/icons/color_rad.png), pointer";
	}
	if (toolbar.activePan === "sq" && toolbar.color.activeColor === "#ff5555") {
		canvas.paper.elem.style.cursor = "url(../img/icons/square_red.png), pointer";
	}
	if (toolbar.activePan === "rd" && toolbar.color.activeColor === "#55ff99") {
		canvas.paper.elem.style.cursor = "url(../img/icons/color_green.png), pointer";
	}
	if (toolbar.activePan === "sq" && toolbar.color.activeColor === "#55ff99") {
		canvas.paper.elem.style.cursor = "url(../img/icons/square_green.png), pointer";
	}
}

function controller() {
	getCursor();
	if (event.which === 1 && toolbar.activePan === "rd") {
		canvas.paper.elem.insertAdjacentHTML("beforeEnd", "<circle cx=" + ((canvas.cursor.x + 12.5) + "") + "  cy=" + ((canvas.cursor.y + 12.5) + "") + "  r=\"12.5\" fill=" + toolbar.color.activeColor + "></circle>");
	} else if (event.which === 1 && toolbar.activePan === "sq") {
		canvas.paper.elem.insertAdjacentHTML("beforeEnd", "<rect x=" + (canvas.cursor.x + "") + " y=" + (canvas.cursor.y + "") + " width=\"25\" height=\"25\" fill=" + toolbar.color.activeColor + "></rect>");
	}
	return;
}

function defaulrToolbarProperty() {
	toolbar.pans.round.style.backgroundImage = "url(../img/icons/round_pan_focus.png)";
	toolbar.pans.round.style.backgroundPosition = "center";
	toolbar.color.blue.style.borderRadius = "50%";
	toolbar.color.blue.style.boxShadow = "0px 0px 6px 4px #949494";
	canvas.paper.elem.style.cursor = "url(../img/icons/round_pan_focus.png), pointer";
}

var canvas = {
	paper: {
		elem: function() {
			return getElem("canvas");
		}(),
		width: function() {
			return this.elem.clientWidth;
		},
		height: function() {
			return this.elem.clientHeight;
		},
		leftPosition: function() {
			return this.elem.getBoundingClientRect().left;
		},
		topPosition: function() {
			return this.elem.getBoundingClientRect().top;
		},
		clear: function() {
			var workArea = this.elem.parentElement;
			workArea.removeChild(this.elem);
			// workArea.insertAdjacentHTML("beforeEnd", "<svg id='canvas' class='paint__canvas'></svg>");
			workArea.insertAdjacentHTML("beforeEnd", "<svg id=\"canvas\" class=\"paint__canvas\"></svg>");
			this.elem = document.getElementById("canvas");
			console.log(this.elem);
			canvas.listener();
		}
	},
	cursor: {},
	listener: function() {
		this.paper.elem.addEventListener("click", getCoord);
		this.paper.elem.addEventListener("click", controller);
		this.paper.elem.addEventListener("click", controller);
		this.paper.elem.addEventListener("mousedown", getCoord);
		this.paper.elem.addEventListener("mousedown", controller);
		this.paper.elem.addEventListener("mousemove", getCoord);
		this.paper.elem.addEventListener("mousemove", controller);
	},
}
var toolbar = {
	elem: function() {
		return getElem("pens");
	}(),
	pans: {
		round: function() {
			return getElem("round");
		}(),
		square: function() {
			return getElem("square");
		}(),
		clear: function() {
			return getElem("rst");
		}(),
	},
	colorPanel: function() {
		return getElem("colors");
	}(),
	activePan: "rd",
	color: {
		blue: function() {
			return getElem("colorBlue");
		}(),
		red: function() {
			return getElem("colorRed");
		}(),
		green: function() {
			return getElem("colorGreen");
		}(),
		activeColor: "#37abc8",
	},
	listener: function() {
		toolbar.elem.addEventListener("click", selectPan);
		toolbar.colorPanel.addEventListener("click", selectPanColor);
	}
}

defaulrToolbarProperty();
canvas.listener();
toolbar.listener();
