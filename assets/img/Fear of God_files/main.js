var frameIndex = 0;
var frames = $('.lookbook-wrapper .look');

$(document).ready(function() {
  initZoom();
  revealModal();

  $('body').on('click', '.image-viewer a.close', function(e) {
    closeViewer(e);
  });

  $('body').on('click', 'a.current.close', function(e) {
    e.preventDefault();
    closeViewer(e);
  });

  $('body').on('click', '.video-viewer a.close', function(e) {
    closeVideoViewer(e);
  });

  var ll = new LazyLoad({
      threshold: 0,
      callback_set: function(el) {
       frames = $('.lookbook-wrapper .look'); 
      }
  });

  $('.share-enable').on('click', function(e) {
    e.preventDefault();
    $('.share--product').toggleClass('open');
  });

  var shareUrl = window.location.host + window.location.pathname;
  $('.share-list-item--fb').on('click', function(e) {
    var fbTitle;
    var fbProductTitle = $(this).data('title');
    fbTitle = 'The ' + fbProductTitle + ' from @fearofgod Sixth Collection ';
    window.open('http://www.facebook.com/sharer.php?u=' + 'https%3A%2F%2F' + shareUrl + '&t=' + fbTitle, 'facebookMessage', 'width=600, height=300');
    e.preventDefault();
  });

  $('.share-list-item--tw').on('click', function(e) {
    var twText;
    var twProductTitle = $(this).data('title');
    twText = 'The ' + twProductTitle + ' from @fearofgod Sixth Collection ';
    window.open('http://twitter.com/share/?text=' + twText + '&url=https://' + shareUrl, 'twitterMessage', 'width=600, height=300');
    e.preventDefault();
  });  

});

function isTouchDevice() {
  try {
    document.createEvent("TouchEvent");
    return true;
  } catch (e) {
    return false;
  }
}

function closeViewer(e) {
  e.preventDefault();
  $.scrollLock( false );
  frameIndex = 0;
  $('body').removeClass('frame-open no-scroll');
  $('.image-viewer').removeClass('visible');
  setTimeout(function() {
    $('.image-viewer').remove();
  }, 500);
}

function openViewer(e) {
  e.preventDefault();
  $.scrollLock( true );
  var frameSrc = frames[frameIndex].dataset.attrFullsize;
  $('body').append('<div class="image-viewer"><a class="close" href="#">CLOSE</a><div class="lookbook-style-images"><div class="frame-container grid justify-center align-center"><div class="frame-wrapper frame"><div class="frameNav prevFrame"></div><div class="frameNav nextFrame"></div><div class="photo grid justify-center align-center"><img class="img-stilframe" src="' + frameSrc + '" /></div></div></div></div></div>');

  $('.image-viewer').imagesLoaded(function() {
    $('body').addClass('frame-open no-scroll');
    $('.image-viewer').addClass('visible');

    var trailerVid = $('#trailer-video')[0];
    if ($('#trailer-video').parents('.video-wrap').find('.audio-control').hasClass('on')) {
      trailerVid.muted = true;
      $('#trailer-video').parents('.video-wrap').find('.audio-control').removeClass('on');
    }

    $('.frameNav.prevFrame').on('click', function(e) {
      minusFrame(frameIndex);
    });

    $('.frameNav.nextFrame').on('click', function(e) {
      plusFrame(frameIndex);
    });

  });
}

function revealModal() {

  $('.reveal[data-reveal]').on('click', function(e) {

    e.preventDefault();
    $.scrollLock( true );
    $('body').toggleClass('frame-open no-scroll');

    var revealBox = $(this).attr('data-reveal');
    $(revealBox).toggleClass('open');

  });

  $('.reveal-modal').on('click', function(e) {

    e.preventDefault();
    $.scrollLock( false );
    $('body').removeClass('frame-open no-scroll');

    $('.reveal-modal').removeClass('open');

  });
}

function closeVideoViewer() {
  $('body').removeClass('video-open no-scroll');
//   $('#viewer-video video').get(0).pause();
}

$(document).on('keydown', function(e) {
  if(e.keyCode == 39 || e.keyCode == 40) {
    plusFrame(frameIndex);
  }
  if(e.keyCode == 37 || e.keyCode == 38) {
    minusFrame(frameIndex);
  }
});

function plusFrame(n) {
  if((n+1) < frames.length) {
    frameIndex = n+1;
    showFrame(frameIndex);
  } else {

  }
}

function minusFrame(n) {
  if(n > 0) {
    frameIndex = n - 1;
    showFrame(frameIndex);
  }
} 

function currentFrame(n) {
  showFrame(frameIndex = n);
}

function showFrame(n) {
  $('.photo .img-stilframe').attr('src', frames[n].dataset.attrFullsize);
}


$(document).on('keydown', function(e) {
  if(e.keyCode == 27) {
    if($('body.frame-open').length) {
      closeViewer(e);
    }
//     closeVideoViewer(e);
  }
});

var initZoom = function() {
  //if( !isTouchDevice() ) {
  if (isTouchDevice()) {
    $('body').addClass('is-touch-device');
  } else {
    $('body').addClass('not-touch-device');
  }

  $('.look[data-attr-fullsize]').on('click', function(e) {
    frameIndex = $('.lookbook-wrapper .look').index(this);
    openViewer(e);
  });

  $('[data-video]').on('click', function(e) {
    e.preventDefault();

    if (isTouchDevice()) {
      window.location.href = $(this).attr('data-video');
    } else {

      setTimeout(function() {
        $('#viewer-video video').get(0).play();
      }, 300);

      setTimeout(function() {
        $('body').addClass('video-open no-scroll');
        $('#viewer-video video')[0].onended = function() {
          closeVideoViewer();
        };
      }, 400);
    }

  });

  $('body').on('click', '.video-viewer', function(e) {
    // e.preventDefault();
    // closeVideoViewer();
  });

  $('body').on('click', '.attr-link a', function(e) {
    e.stopPropagation();
  });

  $('body').on('touchstart click', '.mobile-attr a', function(e) {
    e.stopPropagation();
    window.location.href = $(this).attr('href');
  });
  
}

$('video').each(function(){
    if ($(this).is(":in-viewport")) {
        $(this)[0].play();
      	$(this)[0].muted = false;
    } else {
        $(this)[0].pause();
    }
});