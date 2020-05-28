

var createPieces = {


  numTiles: 6,
  cName: "gridSelector",
  sName: "slideShow",
  grid: [],
  color: "blue",
  spawnChance: 1,
  pieces: [],
  scrollIndex: 0,

  draw: function() {
    for(var y = 0; y < this.numTiles; y++) {
      for(var x = 0; x < this.numTiles; x++) {
        var xPos = x*(tileSize + padding) + padding;
        var yPos = y*(tileSize + padding) + padding;
        var colorL = "white";
        if(this.grid[y][x]) colorL = this.color;
        drawSquare2(xPos, yPos, tileSize, tileSize, this.cName, colorL);
      }
    }
  },

  drawSlideShow: function() {


    var width = this.numTiles*(tileSize + padding) + padding;

    var canvas = document.getElementById(this.sName);
    if (canvas.getContext) {
      var ctx = canvas.getContext("2d");
      ctx.canvas.width = width;
      ctx.canvas.height = width;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    var currentPiece = this.pieces[this.scrollIndex];
    console.log(this.scrollIndex);

    for(var y = 0; y < this.numTiles; y++) {
      for(var x = 0; x < this.numTiles; x++) {
        var xPos = x*(tileSize + padding) + padding;
        var yPos = y*(tileSize + padding) + padding;
        var colorL = "white";
        if(currentPiece.grid[y][x]) colorL = this.color;
        drawSquare2(xPos, yPos, tileSize, tileSize, this.sName, colorL);
      }
    }
  },

  update: function(arg) {

    var coords = relativeCoords(this.cName, arg);
    if(!coords.bound) return;

    var xTile = Math.floor( coords.x / (tileSize + padding) );
    var yTile = Math.floor( coords.y / (tileSize + padding) );

    if(this.grid[yTile][xTile]) this.grid[yTile][xTile] = 0;
    else if(!this.grid[yTile][xTile]) this.grid[yTile][xTile] = 1;
    this.draw();
  },

  init: function() {

    var canvas = document.getElementById(this.cName);
    if (canvas.getContext) {
      var ctx = canvas.getContext("2d");
      var width = this.numTiles*(tileSize + padding) + padding;
      ctx.canvas.width = width;
      ctx.canvas.height = width;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    for(var y = 0; y < this.numTiles; y++) {
      var row = [];
      for(var x = 0; x < this.numTiles; x++) { row.push(0); }
      this.grid.push(row);
    }

    this.color = "#aaaaaa";

    this.draw();
    setEventHandler.setClickHandler( function(e) { createPieces.update(e); } );
    setEventHandler.setKeyHandler( function(e) { createPieces.colorChange(); } );
  },

  addPiece: function() {

    var obj = { numTiles: this.numTiles, grid: newGrid, color: this.color, spawnChance: this.spawnChance };
    this.pieces.push(obj);
    this.drawSlideShow();



    for(var a = 0; a < this.pieces.length; a++) {
      console.log(this.pieces[a].grid);
    }
  },

  resetPiece: function() {
    for(var y = 0; y < this.numTiles; y++) {
      for(var x = 0; x < this.numTiles; x++) {
        this.grid[y][x] = 0;
      }
    }


    this.draw();
    this.color = "012345";
    this.colorChange();
  },

  colorChange: function() {
    var colorInput = document.getElementById("colorInput");
    var value = colorInput.value.toUpperCase();
    var validChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];


    //reject incorrectly formatted inputs
    if(value.length < 6) return;
    if(value.length > 6) value = value.substr(0, 6);

    for(var x = 0; x < value.length; x++) {
      if(!validChars.includes(value[x]))
        return;
    }

    this.color = "#" + value;
    colorInput.value = value;
    this.draw();
  },

  scroll: function(direction) {
    if(direction == "left") this.scrollIndex--;
    if(direction == "right") this.scrollIndex++;
    this.scrollIndex = clamp(this.scrollIndex, 0, this.pieces.length - 1);
    this.drawSlideShow();
  }

};
