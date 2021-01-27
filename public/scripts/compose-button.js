$(document).ready(function() {
  $('#compose').click(function() {
    console.log('clicked');
    $('.new-tweet').slideToggle(300, function() {
      $('.new-tweet').addClass('new-tweet-show');
    });
  });
});