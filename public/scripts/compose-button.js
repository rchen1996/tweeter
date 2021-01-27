$(document).ready(function() {
  $('#compose').click(function() {
    $('.new-tweet').slideToggle(300, function() {
      $('.new-tweet').addClass('new-tweet-show');
    });
  });
});