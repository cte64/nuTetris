

var selectGameModeInject =
"<div id='mainMenu'>" +
  "<p class='title' id='title'> Select Game Mode </p>" +
  "<ul id='menuItems'>" +
    "<li class='menuItem' id='classicMode' onclick='selectGameMode.classicMode();'> Classic </li>" +
    "<li class='menuItem' id='sandBoxMode' onclick='selectGameMode.sandBoxMode();'> SandBox </li>" +
  "</ul>";
"</div>";


var gameBoardInject =
"<div id='tableContainer'>" +
  "<div id='tableRow'>" +
  "</div>" +
"</div>";

var classicInject =
"<div id='leftBar'>" +
  "<ul id='menuItems'>" +
    "<li class='menuItem' id='goBackToGameModeSelect' onclick='mainMenu.update(this.id);'> < Back </li>" +
    "<li class='menuItem' id='sizeSelect' onclick='mainMenu.update(this.id);'> Select Size <br> (25 x 25) </li>" +
    "<li class='menuItem' id='play' onclick=\"mainMenu.update('play');\"> Play </li>" +
  "</ul>" +
"</div>" +

"<div id='rightBar'>" +
"</div>";

var tetrisPlayItems =
"<li class='menuItem' id='pausedMenu' onclick='tetris.pause();'> Pause: </li>";

var tetrisLeftBar =
"<ul id='menuItems'>" +
  tetrisPlayItems +
"</ul>" +
"<p id='nextPieceLabel' class='tetrisTitles'> Next Piece: </p>" +
"<canvas id='nextPiece' class='tetrisTitles'> </canvas>" +
"<p id='score' class='tetrisTitles'> Score: </p>" +
"<p id='speed' class='tetrisTitles'> Speed: </p>";
 

var tetrisRightBar =
"<p class ='title' id='title'> Tetris </p>" +
"<div id='outerGameBox'>" +
  "<canvas id='tetrisCanvas'></canvas>" +
"</div>";


var selectSizeInject =

"<div id='titleBox'>" + 
  "<p class ='title id='title'> Select Size </p>" +
"</div>" + 

"<div id='outerGameBox'>" +
  "<canvas id='sizeSelectCanvas'></canvas>" +
"</div>";

var slideShowMiddle =
"<canvas id='slideShow'> </canvas>" +
"<div class='gridControlButton' id='deleteButton' onclick='createPieces.deletePiece();'> Delete </div>";

var tetrisPausedItems =
"<li class='menuItem' id='pausedMenu' onclick='tetris.unPause();'> Play: </li>" +
"<li class='menuItem' id='goBack' onclick='tetris.goBack();'> Main Menu: </li>";





//THE GOOD STUFF HERE ^ =====================================================================================

var sandBoxInject =
"<div id='leftBar'>" +
  "<ul id='menuItems'>" +
    "<li class='menuItem' id='goBackToGameModeSelect' onclick='mainMenu.update(this.id);'> < Back </li>" +
    "<li class='menuItem' id='sizeSelect' onclick='mainMenu.update(this.id);'> Select Size <br> (25 x 25) </li>" +
    "<li class='menuItem' id='inGameOptions' onclick='mainMenu.update(this.id);'> In-Game <br> Options </li>" +
    "<li class='menuItem' id='createPieces' onclick='mainMenu.update(this.id);'> Create Custom <br> Pieces </li>" +
    "<li class='lastItem' id='about' onclick='mainMenu.update(this.id);'> About </li>" +
  "</ul>" +
"</div>" +

"<div id='rightBar'>" +
"</div>";






















var createPieceInject =
"<p class='title' id='title'> SandBox Tetris </p>" +
"<div id='game'>" +

  "<div id='scrollBar'>" +
      "<div class='sideBar' id='leftSideBar'> <img id='leftArrow' src='images/arrow.png' onclick='createPieces.scroll(0);'> </div>" +
      "<div id='middle'>" +
      "</div>" +
      "<div class='sideBar' id='rightSideBar'> <img id='rightArrow' src='images/arrow.png' onclick='createPieces.scroll(1);'> </div>" +
  "</div>" +

  "<div class='tableContainer' id='gridControls'>" +
    "<div class='tableRow'>" +
      "<div id='leftSide'>" +
        "<canvas id='gridSelector'> </canvas>" +
      "</div>" +
      "<div id='rightSide'>" +
        "<ul id='gridList'>" +
          "<li class='gridControlButton' onclick='createPieces.addPiece();'> Add Piece </li>" +
          "<li class='gridControlButton' onclick='createPieces.resetPiece();'> Reset Piece  </li>" +
          "<li class='inputForm'>" +
            "<form>" +
              "<label id='colorLabel'> Color </label> <br>" +
              "<input id='colorPicker' type='range' min='1' max='255' value='0' oninput='createPieces.colorChange(this.value)'> " +
            "</form>" +
          "</li>" +
        "<ul>" +
      "</div>" +
    "</div>" +
  "</div>" +
"</div>";

var inGameOptionsInject = "";



var aboutInject = "";
