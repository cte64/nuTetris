

var selectGameMode = {


  classicMode: function() {
    var tableRow = document.getElementById('tableRow');
    if(tableRow != null) tableRow.innerHTML = classicInject;
    selectSize.init();
    mainMenu.gameMode = 'Classic';
    createPieces.classicMode();
  },

  sandBoxMode: function() {
    var tableRow = document.getElementById('tableRow');
    if(tableRow != null) tableRow.innerHTML = sandBoxInject;
    selectSize.init();
  },

  init: function() {
    var body = document.getElementById('tableRow');
    body.innerHTML = selectGameModeInject;
  }
};
