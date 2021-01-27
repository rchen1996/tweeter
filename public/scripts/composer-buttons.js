$(document).ready(function() {
  // hide/show new tweet box
  $('#compose').click(function() {
    $('.new-tweet').slideToggle(300, function() {
      $('.new-tweet').addClass('new-tweet-show');
      $('#tweet-text').focus().select();
    });
  });

  // scroll to top & make form appear
  $('#to-top').click(function() {
    $('html, body').animate({ scrollTop: 0 }, 600);
    // check to see if form is already shown
    if (!$('.new-tweet').show()) {
      $('#compose').click();
    } else {
      $('#tweet-text').focus().select();
    }
  });

  // make to top button appear only when scrolled
  $(window).scroll(function() {
    // scrollTop = 0 means already at top of page, so truthy means not at top
    if ($(this).scrollTop()) {
      $('#to-top').fadeIn();
      $('#compose').fadeOut();
    } else {
      $('#to-top').fadeOut();
      $('#compose').fadeIn();
    }
  });
});