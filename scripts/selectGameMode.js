

var selectGameMode = {


  classicMode: function() {

    mainMenu.gameMode = 'Classic';

    console.log(mainMenu.gameMode);

    //first add the gameBoard container ==================================
    var body = document.getElementById('body');
    if(body != null) body.innerHTML = gameBoardInject;

    //now we add the classic tetris html =================================
    var gameBoard = document.getElementById('tableRow');
    if(gameBoard != null) gameBoard.innerHTML = classicInject;

    //Now Initialize the game ============================================
    selectSize.init();
    createPieces.classicMode();
  },

  sandBoxMode: function() {
    var tableRow = document.getElementById('tableRow');
    if(tableRow != null) tableRow.innerHTML = sandBoxInject;
    selectSize.init();
  },

  init: function() {
    var body = document.getElementById('body');
    if(body != null) body.innerHTML = selectGameModeInject;
  }
};
