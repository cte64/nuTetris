

var selectGameMode = {


  makeTable: function() {
    var body = document.getElementById('body');
    body.innerHTML = tableInject;
  },

  classicMode: function() {
    this.makeTable();

    var menu = document.getElementById('menu');
    if(menu != null) menu.innerHTML = menuSideBarClassic;

    var gameBox = document.getElementById('gameBox');
    selectSize.init();

    var title = document.getElementById('title');
    title.innerHTML = 'Classic Tetris';

    createPieces.classicMode();
  },

  progressiveMode: function() {
    console.log("prog");
  },

  sandBoxMode: function() {
    this.makeTable();

    var menu = document.getElementById('menu');
    if(menu != null) menu.innerHTML = menuSideBarSandBox;

    var gameBox = document.getElementById('gameBox');
    selectSize.init();
  },

  init: function() {
    var body = document.getElementById('body');
    body.innerHTML = selectGameModeInject;
  }
};
