
var selectSizeInject =
"<h1 id='title'> SandBox Tetris </h1>" +
  "<div id='game'>" +
  "<canvas id='sizeSelectCanvas'></canvas>" +
"</div>";

var createPieceInject =

"<h1 id='title'> SandBox Tetris </h1>" +
"<div id='game'>" +

  "<div id='scrollBar'>" +
      "<div class='sideBar'> <img id='leftArrow' src='images/arrow.png' onclick='createPieces.scroll('left');'> </div>" +
      "<div id='middle'>" +
        "<canvas id='slideShow'> </canvas>" +
          "<div id='pieceChance'> Chance </div>" +
          "<div class='gridControlButton' id='deleteButton' onclick='createPieces.deletePiece();'> Delete </div>" +
        "</ul>" +
      "</div>" +
      "<div class='sideBar'> <img id='rightArrow' src='images/arrow.png' onclick='createPieces.scroll('right');'> </div>" +
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
              "<label> Color </label> <br>" +
              "<input type='text' id='colorInput' value='012345' class='formBox' spellcheck='false'>" +
            "</form>" +
          "</li>" +
          "<li class='inputForm'>" +
            "<form>" +
              "<label> % Chance </label> <br>" +
              "<input type='text' id='spawnChanceInput' class='formBox' spellcheck='false'>" +
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
