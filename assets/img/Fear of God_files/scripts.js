(function() {
  var __sections__ = {};
  (function() {
    for(var i = 0, s = document.getElementById('sections-script').getAttribute('data-sections').split(','); i < s.length; i++)
      __sections__[s[i]] = true;
  })();
  (function() {
  if (!__sections__["nike-ss19-trailer"] && !window.DesignMode) return;
  try {
    
	$(document).ready(function() {
      var player = videojs('videoPlayer');
      $('.fullScreenToggle').click(function() {
          player.requestFullscreen();
          player.load();
          player.controls(true);
          player.play();
          player.muted(false);
      });
      player.on('fullscreenchange', function() {
        if(document.fullscreenElement) {
            player.loop(false);
            player.controls(true);
            player.muted(false);
        } else {
			player.controls(false);
            player.loop(true);
            player.play();
            player.muted(true);
        }
      });
  	});

  } catch(e) { console.error(e); }
})();

})();
