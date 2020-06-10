
var selectSizeInject =
"<h1 id='title'> SandBox Tetris </h1>" +
  "<div id='game'>" +
  "<canvas id='sizeSelectCanvas'></canvas>" +
"</div>";

var slideShowMiddle =
"<canvas id='slideShow'> </canvas>" +
"<div class='gridControlButton' id='deleteButton' onclick='createPieces.deletePiece();'> Delete </div>";


var tetrisPlayItems =
"<li class='menuItem' id='pausedMenu' onclick='tetris.pause();'> Pause: </li>";

var tetrisPausedItems =
"<li class='menuItem' id='pausedMenu' onclick='tetris.unPause();'> Play: </li>" +
"<li class='menuItem' id='goBack' onclick='tetris.goBack();'> Main Menu: </li>";

var tetrisSideBar =
"<ul id='menuItems'>" +
  tetrisPlayItems +
"</ul>" +
"<p id='nextPieceLabel' class='tetrisTitles'> Next Piece: </p>" +
"<canvas id='nextPiece' class='tetrisTitles'> </canvas>" +
"<p id='score' class='tetrisTitles'> Score: </p>" +
"<p id='Speed:' class='tetrisTitles'> Speed: </p>";

var menuSideBar =
"<ul id='menuItems'>" +
  "<li class='menuItem' id='sizeSelect' onclick='mainMenu.update(this.id);'> Select Size <br> (25 x 25) </li>" +
  "<li class='menuItem' id='inGameOptions' onclick='mainMenu.update(this.id);'> In-Game <br> Options </li>" +
  "<li class='menuItem' id='createPieces' onclick='mainMenu.update(this.id);'> Create Custom <br> Pieces </li>" +
  "<li class='lastItem' id='about' onclick='mainMenu.update(this.id);'> About </li>" +
"</ul>";

var createPieceInject =
"<h1 id='title'> SandBox Tetris </h1>" +
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

var tetrisInject =
"<h1 id='title'> SandBox Tetris </h1>" +
"<div id='game'>" +
  "<canvas id='tetrisCanvas'></canvas>" +
"</div>";

var aboutInject = "";
