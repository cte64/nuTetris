
var mainMenu = {

  state: "init",
  init: function() {
    this.update("sizeSelect");
  },

  sizeSelect: function() {
    currentObj = new SelectSize();
  },

  update: function(button) {

    state = button;

    if(button == "sizeSelect") this.sizeSelect();

    // change the color of the menu items ======================================================
    var list = document.getElementById("menuItems");
    var des = list.getElementsByTagName('*');
    for(var z = 0; z < des.length; z++) {
      if(des[z].id == state) des[z].style.backgroundColor =  "rgb(116, 179, 157)";
      else des[z].style.backgroundColor = "rgb(169, 214, 196)";
    }
  }

};


function gameLoop() {
    requestAnimationFrame(gameLoop);
    currentObj.selectGameScreen();
}

function initGame() {
    mainMenu.init();
    gameLoop();
}

window.onload = initGame;
