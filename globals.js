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

function relativeCoords(e) {
  var canvas = document.getElementById("sizeSelectCanvas");
  var rect = canvas.getBoundingClientRect();
  var xPos = e.clientX - rect.left;
  var yPos = e.clientY - rect.top;
  if(xPos < 0) xPos = 0;
  if(yPos < 0) yPos = 0;
  return {x: xPos, y: yPos};
}
