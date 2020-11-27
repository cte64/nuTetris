
var selectGameMode = {



  sandBoxMode: function() {
    var tableRow = document.getElementById('tableRow');
    if(tableRow != null) tableRow.innerHTML = sandBoxInject;
    selectSize.init();
  },

  init: function() {
    var body = document.getElementById('body');
    if(body != null) body.innerHTML = selectGameModeInject;
  }
};