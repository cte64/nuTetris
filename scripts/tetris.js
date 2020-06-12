

/*
one
*/

/*
//check if player has lost the game
for(var x = 1; x < this.width - 1; x++) {
  if(this.board[1][x] != 0) {
    if(this.gameState == "play") {
      this.gameState = "gameOver";
      document.getElementById("gameBoard").innerHTML += gameOverHTML;
    }
  }
}
*/




var tetris = {

  block: {
    xPos: 0,
    yPos: 0,
    color: 0,
    newColor: 0,
    matrix: [],
    newMatrix: [],
    virtualX: 0,
    virtualY: 0,
    action: null
  },

  board: [],
  timeBtw: 0.5,
  gameState: "",
  score: 0,
  width: 10,
  height: 10,
  cName: "tetrisCanvas",

  init: function(width, height) {

    //update the page
    document.getElementById("gameBox").innerHTML = tetrisInject;

    //set the sideBar
    document.getElementById('menu').innerHTML = tetrisSideBar;

    this.width = width;
    this.height = height;
    this.board = [];

    var canvas = document.getElementById(this.cName);
    if (canvas.getContext) {
      var ctx = canvas.getContext("2d");
      ctx.canvas.width = (this.width - 2)*tileSize + (this.width - 1)*padding;
      ctx.canvas.height = (this.height- 2)*tileSize + (this.height - 1)*padding;
    }

    var np = document.getElementById('nextPiece');
    if(np.getContext) {
      var ctx = np.getContext('2d');
      ctx.canvas.width = (BLOCKSIZE * tileSize) + (BLOCKSIZE + 1)*padding;
      ctx.canvas.height = ctx.canvas.width;
    }

    //initialize the board
    for(var y = 0; y<this.height; y++) {
      var row = [];
      for(var x = 0; x<this.width; x++) {
        if(x == 0 || x == this.width - 1  || y == 0 || y == this.height - 1) row.push('T');
        else row.push(0);
      }
      this.board.push(row);
    }

    //initialize the block matrices
    this.block.matrix = [];
    this.block.newMatrix = [];

    for(var y = 0; y < BLOCKSIZE; y++) {
      var row = [];
      for(var x = 0; x < BLOCKSIZE; x++) { row.push(0); }
      this.block.matrix.push(row);
      this.block.newMatrix.push(row);
    }

    this.block.xPos = 1;
    this.block.yPos = 7;
    this.createBlock();
    this.createBlock();
    this.gameState = "play";

    //set the event listeners
    setEventHandler.setKeyHandler( function(e) { tetris.moveBlock(e.key); } );
    setEventHandler.setTimerHandler(700, function() {tetris.moveBlock("ArrowDown");})
  },

  clearPieces: function() {
    this.pieces.clear();
  },

  deleteAndShift: function() {


    this.block.action.init();
    /*

    for(var z = this.height - 2; z != 0; z--) {
      while(true) {
        var flag = true;
        for(var x = 1; x < this.width - 1; x++) {
          if( this.board[z][x] == 0)
            flag = false;
        }
        if(flag) {
          for(var x = 1; x < this.width - 1; x++) {
            for(var y = z; y != 0; y--) {
              this.board[y][x] = (y > 1) ? this.board[y - 1][x] : 0;
            }
          }
        }
        else break;
      }
    }
    */

  },

  copyBlockToBoard: function() {
    for(var y = this.block.yPos; y < this.block.yPos + BLOCKSIZE; y++) {
      for(var x = this.block.xPos; x < this.block.xPos + BLOCKSIZE; x++) {
        if(this.block.matrix[y - this.block.yPos][x - this.block.xPos] != 0)
          this.board[y][x] = this.block.matrix[y - this.block.yPos][x - this.block.xPos];
      }
    }
  },

  overLap: function() {
    for(var y = this.block.yPos; y < this.block.yPos + BLOCKSIZE; y++) {
      for(var x = this.block.xPos; x < this.block.xPos + BLOCKSIZE; x++) {

          var yInd = clamp(y, 0, this.board.length - 1);
          var xInd = clamp(x, 0, this.board[0].length - 1);

          if( this.board[yInd][xInd] != 0 &&this.block.matrix[yInd - this.block.yPos][xInd - this.block.xPos] != 0)
              return true;
        }
      }
      return false;
  },

  rotateMatrix: function() {

    for(var y = 0; y< BLOCKSIZE/2; y++) {
      var siz = BLOCKSIZE - 2*y;
      var perimeter = 4*siz - 4;

      for(var z = 0; z<siz - 1; z++) {
        var hold = this.block.matrix[y + 1][y];
        for(var x = 0; x < perimeter; x++) {
          var xIndex = 0;
          var yIndex = 0;

          if(0 <= x  && x <= siz - 1) {xIndex = x + y; yIndex = y; }
          if(siz - 1 < x  && x < 2*siz - 2) {xIndex = BLOCKSIZE - 1 - y; yIndex = x - siz + 1 + y; }
          if(2*siz - 2 <= x && x <= 3*siz - 3){xIndex = 3*siz - 3 - x + y; yIndex = BLOCKSIZE - 1 - y; }
          if(3*siz - 3 < x && x < 4*siz - 4){xIndex = y; yIndex = 4*siz - 4 - x + y; }

          var temp = this.block.matrix[yIndex][xIndex];
          this.block.matrix[yIndex][xIndex] = hold;
          hold = temp;
        }
      }
    }
},

  goBack: function() {
    this.unPause();
    setEventHandler.setTimerHandler(0, null);
    document.getElementById('menu').innerHTML = menuSideBar;
    mainMenu.update("sizeSelect");
    createPieces.pieces = [];
  },

  pause: function() {
    this.gameState = "paused";
    var newH = "<div id='pausedOverlay'> </div>";
    document.getElementById("tableContainer").innerHTML += newH;
    document.getElementById('menuItems').innerHTML = tetrisPausedItems;
  },

  unPause: function() {
    this.gameState = "play";
    var overlay = document.getElementById('pausedOverlay');
    if(overlay != null) document.getElementById("tableContainer").removeChild(overlay);
    document.getElementById('menuItems').innerHTML = tetrisPlayItems;
    var goBack = document.getElementById('goBack');
    if(goBack != null) document.getElementById('menuItems').removeChild(goBack);
  },

  moveBlock: function(moveTo) {

    //PAUSE ========================
    if(moveTo == "Escape") {
      if(this.gameState == "paused") this.unPause();
      else if (this.gameState == "play") this.pause();
    }

    if(this.gameState != "play") { return; }

    //LEFT =========================
    if(moveTo == "ArrowLeft") {
        this.block.xPos--;
        if( this.overLap() ) this.block.xPos++;
    }

    //RIGHT ========================
    if(moveTo == "ArrowRight") {
        this.block.xPos++;
        if( this.overLap() ) this.block.xPos--;
    }

    //DOWN =========================
    if(moveTo == "ArrowDown") {
        this.block.yPos++;
        if( this.overLap() ) {
            this.block.yPos--;
            this.copyBlockToBoard();
            this.deleteAndShift();
            this.createBlock();
        }
    }

    //ROTATE =======================
    if(moveTo == "ArrowUp") {
      this.rotateMatrix();
      if( this.overLap() ) {
        for(var x = 0; x<3; x++)
          this.rotateMatrix();
      }

      else { Sound.playSound("tick1"); }
    }

    //PUNCH DOWN ===================
    if(moveTo == " ") {
      while(true) {
        this.block.yPos++;
        if( this.overLap() ) {
          this.block.yPos--;
          this.copyBlockToBoard();
          this.deleteAndShift();
          this.createBlock();
          break;
        }
      }
    }

    this.drawBoard();
  },

  drawBoard: function() {

    //clear the board
    var canvas = document.getElementById(this.cName);
    if (canvas != null && canvas.getContext) {
      var ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    //draw the board
    for(var y = 1; y < this.height - 1; y++) {
      for(var x = 1; x < this.width- 1; x++) {

        var xC = (x - 1)*tileSize + (x)*padding;
        var yC = (y - 1)*tileSize + (y)*padding;

        if( y >= this.block.yPos && y < this.block.yPos + BLOCKSIZE && x >= this.block.xPos && x < this.block.xPos + BLOCKSIZE) {
          var c = this.block.matrix[y - this.block.yPos][x - this.block.xPos];
          if(c != 0) drawSquare2(xC, yC, tileSize, tileSize, this.cName, c);
          else if(this.board[y][x] != 0) drawSquare2(xC, yC, tileSize, tileSize, this.cName, this.board[y][x]);
        }
        else if(this.board[y][x] != 0) drawSquare2(xC, yC, tileSize, tileSize, this.cName, this.board[y][x]);
      }
    }

    //draw the next piece
    var nP = document.getElementById('nextPiece');
    if (nP != null && nP.getContext) {
      var npCtx = nP.getContext('2d');
      npCtx.clearRect(0, 0, nP.width, nP.height);
    }

    for(var y = 0; y < BLOCKSIZE; y++) {
      for(var x = 0; x  < BLOCKSIZE; x++) {
        var c = this.block.newMatrix[y][x];
        var xC = x*(tileSize + padding);
        var yC = y*(tileSize + padding);
        if(c != ' ') drawSquare2(xC, yC, tileSize, tileSize, 'nextPiece', c);
      }
    }



    //if the game is paused, make a semi-transparent overlay




},

  createBlock: function() {

    this.block.color = this.block.newColor;
    this.block.action = new LineAnimation();

    for(var y = 0; y < BLOCKSIZE; y++) {
      for(var x = 0; x < BLOCKSIZE; x++) {
        this.block.matrix[y][x] = this.block.newMatrix[y][x];
      }
    }

    var index = Math.floor( Math.random() * createPieces.pieces.length);
    this.block.newMatrix = createPieces.pieces[index].grid;
    this.block.newColor = createPieces.pieces[index].color;

    this.block.xPos = Math.floor(this.width/2 - BLOCKSIZE/2 - 1);
    this.block.yPos = 0;
  }

};
