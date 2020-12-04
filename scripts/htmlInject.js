var selectGameModeInject =
"<div id='mainMenu'>" +
  "<p class='title' id='title'> Select Game Mode </p>" +
  "<ul id='menuItems'>" +
    "<li class='menuItem' id='classicMode' onclick='mainMenu.classic();'> Classic </li>" +
    "<li class='menuItem' id='sandBoxMode' onclick='mainMenu.sandBox();'> SandBox </li>" +
  "</ul>";
"</div>";

var gameBoardInject =
"<div id='tableContainer'>" +
  "<div id='tableRow'>" +
  "</div>" +
"</div>";

var tetrisPlayItems =
"<li class='menuItem' id='pausedMenu' onclick='tetris.pause();'> Pause: </li>";

var tetrisLeftBar =
"<ul id='menuItems'>" +
  tetrisPlayItems +
"</ul>" +
"<p id='nextPieceLabel' class='tetrisTitles'> Next Piece: </p>" +
"<canvas id='nextPiece' class='tetrisTitles'> </canvas>" +

"<p id='scoreLabel' class='tetrisTitles'> Score: </p>" +
"<p id='score' class='tetrisSide'> 0 </p> </br>" +

"<p id='levelLabel' class='tetrisTitles'> Level: </p>" + 
"<p id='level' class='tetrisSide'> 1 </p> </br>" +

"<p id='speedLabel' class='tetrisTitles'> Speed: </p>" + 
"<p id='speed' class='tetrisSide'> 1.9 </p>";
 
var tetrisRightBar = 
"<p class='title' id='title'> stuff </p>" + 
"<canvas id='tetrisCanvas'></canvas>" ;

var selectSizeInject = 
"<p class='title' id='title'> Select Size </p>" + 
"<canvas id='sizeSelectCanvas'></canvas>";

var tetrisPausedItems =
"<li class='menuItem' id='pausedMenu' onclick='tetris.unPause();'> Play: </li>" +
"<li class='menuItem' id='goBack' onclick='tetris.goBack();'> Main Menu: </li>";

var endGameInjectLeft = 
"<ul id='menuItems'>" +
  "<li class='menuItem' id='endGameBack' onclick='mainMenu.classic();'> Go Back </li>" +
"</ul>";

var pausedOverlay = 
"<div id='pausedOverlay'>" + 
  "<div id='optionsBox'>" + 

    "<button> test </button>" + 

  "</div>" + 
"</div>";


var endGameInjectRight = 
"<canvas id='tetrisCanvas'></canvas>" + 

"<div id='pausedOverlay'>" + 

  "<p class='title' id='title'> GAME OVER </p> </br>" + 

  "<p class='endGameTitle'> Score: </p>" +
  "<p id='endGameScore' class='endGameValue'> 0 </p> </br>" +

  "<p class='endGameTitle'> Level: </p>" +
  "<p id='endGameLevel' class='endGameValue'> 0 </p>" +

"</div>";