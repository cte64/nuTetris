
var mainMenu = {

  state: "init",
  init: function() {
    this.update("createPieces");
  },

  update: function(button) {

    state = button;
    if(button == "sizeSelect") selectSize.init();
    if(button == "createPieces") createPieces.init();
    if(button == "play") tetris.init(selectSize.width, selectSize.height);


    // change the color of the menu items ======================================================
    var list = document.getElementById("menuItems");
    var des = list.getElementsByTagName('*');
    for(var z = 0; z < des.length; z++) {
      if(des[z].id == state) des[z].style.backgroundColor =  "rgb(116, 179, 157)";
      else des[z].style.backgroundColor = "rgb(169, 214, 196)";
    }
  }

};

function initGame() {
    mainMenu.init(10, 10);
}

window.onload = initGame;
