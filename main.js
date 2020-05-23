


var mainMenu = {

  state: "init",
  update: function(button) {

    state = button;

    // change the color of the menu items ======================================================
    var list = document.getElementById("menuItems");
    var des = list.getElementsByTagName('*');
    for(var z = 0; z < des.length; z++) {
      if(des[z].id == state) des[z].style.backgroundColor =  "rgb(116, 179, 157)";
      else des[z].style.backgroundColor = "rgb(169, 214, 196)";
    }


  }
};
