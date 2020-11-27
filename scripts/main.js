var mainMenu = {

  gameMode: "yee",
  state: "",
  init: function() {
    Sound.init();
    Images.init();
    selectGameMode.init();
  },

  classic: function() {

    mainMenu.gameMode = 'Classic';

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

  sandBox: function() {

    mainMenu.gameMode = 'SandBox';

    //first add the gameBoard container ==================================
    var body = document.getElementById('body');
    if(body != null) body.innerHTML = gameBoardInject;

    //now we add the classic tetris html =================================
    var gameBoard = document.getElementById('tableRow');
    if(gameBoard != null) gameBoard.innerHTML = sandBoxInject;


    createPieces.clearPieces();
    selectSize.init();
  },

  update: function(button) {


    //play the Sound
    Sound.play("menuFX");


    state = button;
    if(state == "goBackToGameModeSelect") selectGameMode.init();
    if(state == "selectGameMode") selectGameMode.init();
    if(state == "sizeSelect") selectSize.init();
    if(state == "createPieces") createPieces.init();
    if(state == "inGameOptions") inGameOptions.init();
    if(state == "play") tetris.init(selectSize.width + 2, selectSize.height + 1);
    if(state == "about") about.init();




    /*
    // change the color of the menu items ======================================================
    var list = document.getElementById("menuItems");
    if(list == null) return;
    var des = list.getElementsByTagName('*');
    for(var z = 0; z < des.length; z++) {
      if(des[z].id == state) des[z].style.backgroundColor =  "rgb(116, 179, 157)";
      else des[z].style.backgroundColor = "rgb(169, 214, 196)";
    }
    */
  }
};


window.onload = function() {
    mainMenu.init(10, 10);

};