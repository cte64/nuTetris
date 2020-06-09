
var mainMenu = {

  state: "",
  init: function() {
    var menu = document.getElementById('menu');
    if(menu != null) menu.innerHTML = menuSideBar;
    this.update("sizeSelect");




  },

  playable: false,

  update: function(button) {

    state = button;

    if(state == "sizeSelect") selectSize.init();
    if(state == "createPieces") createPieces.init();
    if(state == "inGameOptions") inGameOptions.init();
    if(state == "play") tetris.init(selectSize.width + 2, selectSize.height + 2);
    if(state == "about") about.init();

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
