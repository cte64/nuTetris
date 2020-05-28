//General game variables
const tileSize = 20;
const padding = 1;
var currentObj;


function drawSquare(x, y, width, height, c) {

  var color = "white";
  if(c == 'M') color = "red";
  if(c == 'N') color = "blue";
  if(c == 'O') color = "green";
  if(c == 'P') color = "brown";
  if(c == 'Q') color = "orange";
  if(c == 'R') color = "magenta";
  if(c == 'S') color = "yellow";

  var canvas = document.getElementById("sizeSelectCanvas");
  if (canvas.getContext) {
    var ctx = canvas.getContext("2d");
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
  }
}


function drawSquare2(x, y, width, height, cName, c) {
  var canvas = document.getElementById(cName);
  if (canvas.getContext) {
    var ctx = canvas.getContext("2d");
    ctx.strokeStyle = c;
    ctx.fillStyle = c;
    ctx.fillRect(x, y, width, height);
  }
}


function relativeCoords(name, e) {
  var canvas = document.getElementById(name);
  if(!canvas) return {x: 0, y: 0};
  var rect = canvas.getBoundingClientRect();
  var xPos = e.clientX - rect.left;
  var yPos = e.clientY - rect.top;
  var inBound = true;
  if(xPos < 0) { xPos = 0; inBound = false; }
  if(yPos < 0) { yPos = 0; inBound = false; }
  if(xPos > rect.width) { xPos = rect.width; inBound = false; }
  if(yPos > rect.height) { xPos = rect.height; inBound = false; }
  return {x: xPos, y: yPos, bound: inBound};
}

function clamp(val, low, high) {
	if(val < low) val = low;
	if(val > high) val = high;
	return val;
}

var setEventHandler = {

  clickHandler: null,
  keyUpHandler: null,

  setClickHandler: function(newHandler) {
    window.removeEventListener('click', this.clickHandler);
    window.addEventListener('click', newHandler);
    this.clickHandler = newHandler;
  },

  setKeyHandler: function(newHandler) {
    window.removeEventListener('keyup', this.keyUpHandler);
    window.addEventListener('keyup', newHandler);
    this.keyUpHandler = newHandler;
  }
}
