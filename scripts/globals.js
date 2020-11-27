//General game variables
const tileSize = 18;
const padding = 0;
const sideBarWidth = 100;
const BLOCKSIZE = 5;
const maxXblocks = 28;
const maxYblocks = 30;
const gameBoxPadding = 10;
var currentObj;


var Sound = {

  audio: {},
  init: function() {

    //load up the sound files ===========================
    this.audio["two"] = new Audio("audio/two.wav");
    this.audio["menuFX"] = new Audio("audio/menuFX.wav");
    this.audio["hitTheFloor"] = new Audio("audio/hitTheFloor.wav");
    this.audio["clearRow"] = new Audio("audio/clearRow.wav");
  },

  play: function(file) {
    var audio = this.audio[file];
    if(audio == null) {
      console.log('Sound File "' + file + '" does not exist.');
    }
    else {
      audio.pause();
      audio.currentTime = 0;
      audio.play();
    }
  }
};

var Images = {


  img: null,

  init: function() {
    this.img = new Image();
    this.img.src = "images/overlay2.png";
  }
};

function drawSquare2(x, y, width, height, cName, c) {
  var canvas = document.getElementById(cName);
  if(canvas == null) return;

  if (canvas.getContext) {
    var ctx = canvas.getContext("2d");
    ctx.strokeStyle = c;
    ctx.fillStyle = c;
    ctx.fillRect(x, y, width, height);

    ctx.globalAlpha = 0.35;
    ctx.drawImage(Images.img, x, y, tileSize, tileSize);
    ctx.globalAlpha = 1.0;
  }
}

function drawSquare3(x, y, width, height, cName, c) {
  var canvas = document.getElementById(cName);
  if(canvas == null) return;

  if (canvas.getContext) {
    var ctx = canvas.getContext("2d");
    ctx.globalAlpha = 0.35;
    ctx.strokeStyle = c;
    ctx.fillStyle = c;
    ctx.fillRect(x, y, width, height);
    ctx.globalAlpha = 1.0;
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
  timerHandler: null,

  setTimerHandler: function(newTime, newHandler) {
    window.clearInterval(this.timerHandler);
    if(newHandler != null) this.timerHandler = window.setInterval(newHandler, newTime);
  },

  setClickHandler: function(newHandler) {
    window.removeEventListener('click', this.clickHandler);
    window.addEventListener('click', newHandler);
    this.clickHandler = newHandler;
  },

  setKeyHandler: function(newHandler) {
    window.removeEventListener('keydown', this.keyUpHandler);
    window.addEventListener('keydown', newHandler);
    this.keyUpHandler = newHandler;
  }
}

function numToColor(length) {
  var i = (length * 255 / 255);
  var r = Math.round(Math.sin(0.024 * i + 0) * 127 + 128);
  var g = Math.round(Math.sin(0.024 * i + 2) * 127 + 128);
  var b = Math.round(Math.sin(0.024 * i + 4) * 127 + 128);
  return 'rgb(' + r + ',' + g + ',' + b + ')';
}
