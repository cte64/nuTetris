

/*
one
*/

var tetris = {

  block: {
    xPos: 0,
    yPos: 0,
    color: 0,
    newColor: 0,
    matrix: [],
    newMatrix: []
  },

  board: [],
  timeBtw: 0.5,
  gameState: "",
  score: 0,
  width: 10,
  height: 10,
  cName: "tetrisCanvas",

  init: function(width, height) {
    this.width = width;
    this.height = height;
    this.board = [];

    var htmlInject =
    "<h1 id='title'> SandBox Tetris </h1>" +
    "<div id='game'>" +
      "<canvas id='tetrisCanvas'></canvas>" +
    "</div>";

    document.getElementById("gameBox").innerHTML = htmlInject;
    var canvas = document.getElementById(this.cName);

    if (canvas.getContext) {
      var ctx = canvas.getContext("2d");
      ctx.canvas.width = (this.width - 2)*tileSize + (this.width - 1)*padding;
      ctx.canvas.height = (this.height- 2)*tileSize + (this.height - 1)*padding;
    }

    //initialize the board
    for(var y = 0; y<this.height; y++) {
      var row = [];
      for(var x = 0; x<this.width; x++) {
        if(x == 0 || x == this.width - 1  || y == 0 || y == this.height - 1) row.push('T');
        else row.push(' ');
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
    gameState = "play";

    setEventHandler.setKeyHandler( function(e) { tetris.moveBlock(e.key); } );
  },

  deleteAndShift: function() {

    //check if player has lost the game
    for(var x = 1; x < this.width - 1; x++) {
      if(this.board[1][x] != 0) {
        if(gameState == "play") {
          gameState = "gameOver";
          document.getElementById("gameBoard").innerHTML += gameOverHTML;
        }
      }
    }

    for(var z = this.height - 2; z != 0; z--) {
      while(true) {
        var flag = true;
        for(var x = 1; x < this.height - 1; x++) {
          if( this.board[z][x] == 0)
            flag = false;
        }

        if(flag) {
          this.score += 100;
          for(var x = 1; x < this.width - 1; x++) {
            for(var y = z; y != 0; y--) { this.board[y][x] = (y > 1) ? this.board[y - 1][x] : 0; }
          }
        }

        else
          break;
      }
    }
},

  copyBlockToBoard: function() {
    for(var y = this.block.yPos; y < this.block.yPos + BLOCKSIZE; y++) {
      for(var x = this.block.xPos; x < this.block.xPos + BLOCKSIZE; x++) {
        if(this.block.matrix[y - this.block.yPos][x - this.block.xPos] != ' ')
          this.board[y][x] = this.block.matrix[y - this.block.yPos][x - this.block.xPos];
      }
    }
  },

  overLap: function() {

    for(var y = this.block.yPos; y < this.block.yPos + BLOCKSIZE; y++) {
      for(var x = this.block.xPos; x < this.block.xPos + BLOCKSIZE; x++) {
          if( this.board[y][x] != 0 && this.block.matrix[y - this.block.yPos][x - this.block.xPos] != 0)
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

  moveBlock: function(moveTo) {

    //PAUSE ========================
    if(moveTo == "Escape") {

      if(gameState == "paused") {
        gameState = "play";
        var elem = document.getElementById("pausedMenu");
        document.getElementById("gameBoard").removeChild(elem);
      }
      else if (gameState == "play") {
        gameState = "paused";
        document.getElementById("gameBoard").innerHTML += pausedHTML;
      }
    }

    if(gameState != "play") {
      this.drawBoard();
      return;
    }

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
    var ctx;
    if (canvas.getContext) {
      ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }


    //draw the outlines
    var boardWidth = (this.width - 2)*tileSize + (this.width - 1)*padding;
    var boardHeight = (this.height - 2)*tileSize + (this.height - 1)*padding;
    ctx.beginPath();
    ctx.lineWidth = "1";
    ctx.strokeStyle = "black";
    ctx.rect(0, 0, boardWidth, boardHeight);
    ctx.stroke();

    //draw the board

    for(var y = 1; y < this.height - 1; y++) {
      for(var x = 1; x < this.width- 1; x++) {

        var xC = (x - 1)*tileSize + (x)*padding;
        var yC = (y - 1)*tileSize + (y)*padding;

        if( y >= this.block.yPos && y < this.block.yPos + BLOCKSIZE && x >= this.block.xPos && x < this.block.xPos + BLOCKSIZE) {
          var c = this.block.matrix[y - this.block.yPos][x - this.block.xPos];
          if(c != ' ') drawSquare2(xC, yC, tileSize, tileSize, this.cName, c);
          else if(this.board[y][x] != ' ') drawSquare2(xC, yC, tileSize, tileSize, this.cName, this.board[y][x].color);
        }
        else if(this.board[y][x] != ' ') drawSquare2(xC, yC, tileSize, tileSize, this.cName, this.board[y][x].color);
      }
    }

    /*
    for(var y = 1; y < this.height - 1; y++) {
      for(var x = 1; x < this.width- 1; x++) {

        var xC = (x - 1)*tileSize + (x)*padding;
        var yC = (y - 1)*tileSize + (y)*padding;

        if( y >= this.block.yPos && y < this.block.yPos + BLOCKSIZE && x >= this.block.xPos && x < this.block.xPos + BLOCKSIZE) {
          var c = this.block.matrix[y - this.block.yPos][x - this.block.xPos];
          if(c != ' ') drawSquare2(xC, yC, tileSize, tileSize, this.cName, c);
          else if(this.board[y][x] != ' ') drawSquare2(xC, yC, tileSize, tileSize, this.cName, this.board[y][x].color);
        }
        else if(this.board[y][x] != ' ') drawSquare2(xC, yC, tileSize, tileSize, this.cName, this.board[y][x].color);
      }
    }
    */

    /*
    //draw the next piece
    ctx.font = "20px Courier";
    ctx.fillStyle = "black";
    ctx.fillText("Next Piece:", playRegionWidth + 10, 30);

    for(var y = 0; y < BLOCKSIZE; y++) {
      for(var x = 0; x  < BLOCKSIZE; x++) {
        var c = this.block.newMatrix[y][x];
        var xC = x*(tileSize + padding);
        var yC = y*(tileSize + padding);
        if(c != ' ') drawSquare(xC + playRegionWidth + 35, yC + 30, tileSize, tileSize, c);
      }
    }

    //show the score
    ctx.font = "20px Courier";
    ctx.fillStyle = "black";
    ctx.fillText("Score: " + this.score, playRegionWidth + 10, 130);

    if(gameState == "paused") {
        var color = "rgba(200, 200, 200, 0.3)";
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }
    */
},

  createBlock: function() {
    this.block.matrix = this.block.newMatrix;
    this.block.color = this.block.newColor;

    var index = Math.floor( Math.random() * createPieces.pieces.length);
    this.block.newMatrix = createPieces.pieces[index].grid;
    this.block.newColor = createPieces.pieces[index].color;

    this.block.xPos = Math.floor(this.width/2 - BLOCKSIZE/2 - 1);
    this.block.yPos = 0;
  }

};
