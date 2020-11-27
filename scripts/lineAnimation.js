function LineAnimation() {

  this.state = 0;
  this.cter = tetris.height - 2;
  this.block = false;
  this.maxFrames = 4;

  this.animate = function(inst) {


    //flash the colors
    for(var x = 1; x < tetris.width - 1; x++) { tetris.board[this.cter][x] = (this.state % 2 == 0) ? "#aabbcc" : 0; }
    tetris.drawBoard();

    if(this.state > this.maxFrames) {
      this.block = false;

      //play the sound
      Sound.play("clearRow");
      this.shift();
      this.check();
    }

    else {
      this.state++;
      var me = this;
      setTimeout(function() { me.animate(); }, 70);
    }
  };

  this.shift = function() {
    for(var x = 1; x < tetris.width - 1; x++) {
      for(var y = this.cter; y != 0; y--) {
        tetris.board[y][x] = (y > 1) ? tetris.board[y - 1][x] : 0;
      }
    }
    tetris.drawBoard();
  };

  this.check = function() {

    var flag = true;

    for(var x = 1; x < tetris.width - 1; x++) {
      if( tetris.board[this.cter][x] == 0)
        flag = false;
    }


    if(flag) {
      tetris.gameState = "animating";
      this.block = true;
      this.state = 0;
      this.animate();
      tetris.score++;
    }

    if(this.cter > 1 && !this.block) {
      this.cter--;
      this.check();
    }
    else if (this.cter == 1) tetris.gameState = "play";
  };

  this.init = function() {
    this.state = 0;
    this.cter = tetris.height - 2;
    this.block = false;
    this.check();
  }
}
