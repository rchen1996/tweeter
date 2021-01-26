$(document).ready(function() {
  $('.tweet').hover(function(event) {
    const handle = $(this).find('.handle');
    $(handle).css({'display':'block'});
  }, function(event) {
    const handle = $(this).find('.handle');
    $(handle).css({'display':'none'});
  })
});