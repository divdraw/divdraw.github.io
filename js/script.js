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
		pan.style.backgroundImage = "url(../paint/img/icons/round_pan_focus.png)";
		pan.style.backgroundPosition = "center";
		canvas.pan = "rd";
	} else if (pan === toolbar.pans.square) {
		pan.style.backgroundImage = "url(../paint/img/icons/square_pan_focus.png)";
		pan.style.backgroundPosition = "center";
		canvas.pan = "sq";
	} else if (pan === toolbar.pans.clear) {
		pan.style.backgroundImage = "url(../paint/img/icons/delete_pan_focus.png)";
		pan.style.backgroundPosition = "center";
		canvas.pan = "clear";
	}
}

function controller() {
	if (event.which === 1 && canvas.pan !== "clear") {
		var point = document.createElement("div");
		point.style.top = canvas.cursor.y + "px";
		point.style.left = canvas.cursor.x + "px";
		point.setAttribute("class", canvas.pan);
		canvas.paper.elem.insertAdjacentElement("afterBegin", point);
		console.dir(point);
	} else if (canvas.pan === "clear") {
		canvas.paper.clear();
	}
	return;
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
			for (var i = 0; i < this.elem.children.length; i++) {
				this.elem.removeChild(this.elem.children[i]);
			}
		}
	},
	cursor: {

	},
	pan: {

	}
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
	}
}
canvas.paper.elem.addEventListener("click", getCoord);
canvas.paper.elem.addEventListener("click", controller);
canvas.paper.elem.addEventListener("mousedown", getCoord);
canvas.paper.elem.addEventListener("mousedown", controller);
canvas.paper.elem.addEventListener("mousemove", getCoord);
canvas.paper.elem.addEventListener("mousemove", controller);
toolbar.elem.addEventListener("click", selectPan);
