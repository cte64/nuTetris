


var selectSize = {

  startMatrix: [],
  width: 10,
  height: 10,
  cName: "sizeSelectCanvas",


  update: function(move) {

    var coords = {x: 0, y: 0};
    if(move != null) coords = relativeCoords(this.cName, move);

    this.width = Math.floor( coords.x / (tileSize + padding));
    if(this.width < 15) this.width = 15;
    if(this.width > maxXblocks) this.width = maxXblocks;

    this.height = Math.floor( coords.y / (tileSize + padding));
    if(this.height < 25) this.height = 25;
    if(this.height > maxYblocks) this.height = maxYblocks;

    for(var y = 0; y < maxYblocks; y++) {
      for(var x = 0; x < maxXblocks; x++) {
        if(y <= this.height && x <= this.width) this.startMatrix[y][x] = true;
        else this.startMatrix[y][x] = false;
      }
    }

    var canvas = document.getElementById(this.cName);

    if(canvas) {
      var ctx;
      if (canvas.getContext) {
        ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }

      for(var y = 0; y < maxYblocks; y++) {
        for(var x = 0; x < maxXblocks; x++) {

          var xPos = (x * tileSize) + (x * padding ) + padding;
          var yPos = (y * tileSize) + (y * padding ) + padding;

          if(this.startMatrix[y][x]) drawSquare2(xPos, yPos, tileSize, tileSize, this.cName, "rgb(188, 209, 184)");
          else drawSquare2(xPos, yPos, tileSize, tileSize, this.cName, "white");
        }
      }
    }

    //update the select size label
    var sLabel = document .getElementById('sizeSelect');
    if(sLabel != null) sLabel.innerHTML = "Select Size <br> (" + this.width + "x" + this.height + ")";
  },

  init: function() {

    document.getElementById("gameBox").innerHTML = selectSizeInject;

    for(var y = 0; y<maxYblocks; y++) {
      var row = [];
      for(var x = 0; x<maxXblocks; x++) {
        row.push(false);
      }
      this.startMatrix.push(row);
    }

    var xPix = (maxXblocks - 2)*tileSize + (maxXblocks - 1)*padding;
    var yPix = (maxYblocks - 2)*tileSize + (maxYblocks - 1)*padding;

    var canvas = document.getElementById("sizeSelectCanvas");
    if (canvas.getContext) {
      var ctx = canvas.getContext("2d");
      ctx.canvas.width = xPix;
      ctx.canvas.height = yPix;
    }

    //resize the divs
    var gameBox = document.getElementById("gameBox");
    var game = document.getElementById("game");
    game.style.width = (xPix + 2*gameBoxPadding) + "px";
    game.style.height = (yPix + 2*gameBoxPadding) + "px";
    gameBox.style.width = (xPix + 2*gameBoxPadding) + "px";
    gameBox.style.height = (yPix + 2*gameBoxPadding) + "px";

    setEventHandler.setClickHandler( function(e) { selectSize.update(e); } );
    this.update(null);
  }
};
