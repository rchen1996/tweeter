$(document).ready(function() {
  $('textarea').on('input', function(event) {
    const count = $(this).val().length;
    // use jQuery to traverse DOM tree to update counter
    const counter = $(this).next().children()[1];
    counter.innerHTML = 140 - count;
    if (140 - count < 0) {
      $(counter).addClass('counter-negative');
    } else {
      $(counter).removeClass('counter-negative');
    }
  });
});