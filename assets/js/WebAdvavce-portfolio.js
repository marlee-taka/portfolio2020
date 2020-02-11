$(document).ready(function(){
  $("#nav-flip #ul-flip #flip1").click(function(){
    $("#panel1").slideToggle("slow");
  });
});


$(document).ready(function(){
  $("#modal").delay(1000).fadeIn(400);
  $("#modal-body").delay(2300).fadeIn(400);

  $("#close").click(function(close){
    myHideDialog();
    close.preventDefault();
  });
});

function myHideDialog(){
  $("#modal").fadeOut(400);
  $("#model-body").fadeOut(300);
}

















