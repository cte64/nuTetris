


class SelectSize {

  constructor() {

    this.startMatrix = [];
    this.maxWidth = 30;
    this.maxHeight = 30;
    this.width = 10;
    this.height = 10;

    for(var y = 0; y<this.maxHeight; y++) {
      var row = [];
      for(var x = 0; x<this.maxWidth; x++) {
        row.push(false);
      }
      this.startMatrix.push(row);
    }

    var xPix = (this.maxWidth - 2)*tileSize + (this.maxWidth - 1)*padding;
    var yPix = (this.maxHeight - 2)*tileSize + (this.maxHeight - 1)*padding;

    var canvas = document.getElementById("sizeSelectCanvas");
    if (canvas.getContext) {
      var ctx = canvas.getContext("2d");
      ctx.canvas.width = xPix;
      ctx.canvas.height = yPix;
    }

    //resize the divs
    var gameBox = document.getElementById("gameBox");
    var game = document.getElementById("game");
    game.style.width = (xPix + 20) + "px";
    game.style.height = (yPix + 20) + "px";
    gameBox.style.width = (xPix + 40) + "px";
    gameBox.style.height = (yPix + 40) + "px";


    //window.removeEventListener('mousemove', curentObj.eventHandler);
    window.addEventListener('mousemove', );

  }

  eventHandler(move) {
    var coords = relativeCoords(move);

    console.log(this.width);




    /*

    this.width = Math.floor( coords.x / (tileSize + padding));
    if(this.width < 15) this.width = 15;
    if(this.width > this.maxWidth) this.width = this.maxWidth;

    this.height = Math.floor( coords.y / (tileSize + padding));
    if(this.height < 20) this.height = 20;
    if(this.height > this.maxHeight) this.height = this.maxHeight;


    for(var y = 0; y < this.maxHeight; y++) {
      for(var x = 0; x < this.maxWidth; x++) {
        if(y <= this.height && x <= this.width) this.startMatrix[y][x] = true;
        else this.startMatrix[y][x] = false;
      }
    }
    */
  }

  selectGameScreen() {

    /*

    var canvas = document.getElementById("sizeSelectCanvas");
    var ctx;
    if (canvas.getContext) {
      ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    for(var y = 0; y < this.maxHeight; y++) {
      for(var x = 0; x < this.maxWidth; x++) {

        var xPos = (x * tileSize) + (x * padding ) + padding;
        var yPos = (y * tileSize) + (y * padding ) + padding;

        if(this.startMatrix[y][x]) drawSquare(xPos, yPos, tileSize, tileSize, 'O');
        else drawSquare(xPos, yPos, tileSize, tileSize, 'P');
      }
    }
    */
  }
}
