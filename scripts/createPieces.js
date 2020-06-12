

var createPieces = {


  cName: "gridSelector",
  sName: "slideShow",
  grid: [],
  color: "blue",
  pieces: [],
  scrollIndex: 0,

  draw: function() {
    for(var y = 0; y < BLOCKSIZE; y++) {
      for(var x = 0; x < BLOCKSIZE; x++) {
        var xPos = x*(tileSize + padding) + padding;
        var yPos = y*(tileSize + padding) + padding;
        var colorL = "white";
        if(this.grid[y][x]) colorL = this.color;
        drawSquare2(xPos, yPos, tileSize, tileSize, this.cName, colorL);
      }
    }
  },

  drawSlideShow: function() {


    var width = BLOCKSIZE*(tileSize + padding) + padding;

    var canvas = document.getElementById(this.sName);
    if (canvas != null && canvas.getContext) {
      var ctx = canvas.getContext("2d");
      ctx.canvas.width = width;
      ctx.canvas.height = width;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    var currentPiece = this.pieces[this.scrollIndex];
    if(currentPiece == undefined) return;


    for(var y = 0; y < BLOCKSIZE; y++) {
      for(var x = 0; x < BLOCKSIZE; x++) {

        var xPos = x*(tileSize + padding) + padding;
        var yPos = y*(tileSize + padding) + padding;
        var colorL = "white";
        if(currentPiece.grid[y][x]) colorL = currentPiece.color;
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

    //update the page
    document.getElementById("gameBox").innerHTML = createPieceInject;

    var canvas = document.getElementById(this.cName);
    if (canvas.getContext) {
      var ctx = canvas.getContext("2d");
      var width = BLOCKSIZE*(tileSize + padding) + padding;
      ctx.canvas.width = width;
      ctx.canvas.height = width;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    for(var y = 0; y < BLOCKSIZE; y++) {
      var row = [];
      for(var x = 0; x < BLOCKSIZE; x++) { row.push(0); }
      this.grid.push(row);
    }

    this.color = numToColor( document.getElementById('colorPicker').value );

    this.draw();
    this.drawSlideShow();

    setEventHandler.setClickHandler( function(e) { createPieces.update(e); } );
    setEventHandler.setKeyHandler( function(e) { createPieces.colorChange(); } );
  },

  Piece: function(ref) {

    this.color = ref.color;
    this.grid = [];

    //later I will figure out a better way of doing this
    for(var y = 0; y < BLOCKSIZE; y++) {
      var temp = [];
      for(var x = 0; x < BLOCKSIZE; x++) {
        if(ref.grid[y][x]) temp.push(this.color);
        else temp.push(0);
      }
      this.grid.push(temp);
    }
  },

  addPiece: function() {
    var obj = new this.Piece(this);
    this.pieces.push(obj);
    this.scrollIndex = this.pieces.length - 1;

    //make the play option available
    var play = document.getElementById('play');
    if(play == null) {
      var newPlay =   '<li class="menuItem" id="play" onclick="mainMenu.update(this.id);"> Play </li>';
      document.getElementById('menuItems').innerHTML += newPlay;
    }

    //add the delete fields
    var middle = document.getElementById('middle');
    middle.innerHTML = slideShowMiddle;

    //uddate the board
    this.drawSlideShow();
    this.resetPiece();
  },

  deletePiece: function() {
    this.pieces.splice(this.scrollIndex, 1);
    var newIndex = this.scrollIndex;
    newIndex = clamp(newIndex, 0, this.pieces.length - 1);
    this.scrollIndex = newIndex;
    this.drawSlideShow();

    //remove the option to play
    var play = document.getElementById('play');
    if(this.pieces.length == 0 && play != null) document.getElementById('menuItems').removeChild(play);

    //delete the html from the middle
    var middle = document.getElementById('middle');
    if(this.pieces.length == 0 && middle.innerHTML != '') middle.innerHTML = '';
  },

  resetPiece: function() {
    for(var y = 0; y < BLOCKSIZE; y++) {
      for(var x = 0; x < BLOCKSIZE; x++) {
        if(y > 0 && y < 4) this.grid[y][x] = "#bb0000";
        else this.grid[y][x] = 0;
      }
    }

    this.draw();
    this.colorChange( document.getElementById('colorPicker').value );
  },

  colorChange: function(value) {
    this.color = numToColor(value);
    this.draw();
  },

  scroll: function(direction) {
    if(direction == 0) this.scrollIndex--;
    if(direction == 1) this.scrollIndex++;
    this.scrollIndex = clamp(this.scrollIndex, 0, this.pieces.length - 1);
    this.drawSlideShow();
  }

};
