/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  const escape = function(tweetContent) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(tweetContent));
    return div.innerHTML;
  };

  const createTweetElement = function(tweetObj) {
    const $tweet = `
    <article class="tweet">
      <header>
        <img src="${tweetObj.user.avatars}">
        <h4 class="user">${tweetObj.user.name}</h4>
        <p class="handle">${tweetObj.user.handle}</p>
      </header>
      <p class="tweet-content">${escape(tweetObj.content.text)}</p>
      <footer>
        <p class="timestamp">${tweetObj['created_at']}</p>
        <div class="icons">
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </div>
      </footer>
    </article>
    `;
    return $tweet;
  };

  const renderTweets = function(arrTweetObjs) {
    for (let tweetObj of arrTweetObjs) {
      const tweet = createTweetElement(tweetObj);
      $('#tweets-container').prepend(tweet);
    }
  };

  const loadTweets = function() {
    $.ajax({
      method: 'GET',
      url: '/tweets'
    })
      .done(result => renderTweets(result))
      .fail(err => console.log(err));
  };

  loadTweets();

  $('.tweet-form').submit(function(event) {
    event.preventDefault();
    // first validate for empty/long tweets
    const $tweetBox = $(this).find('#tweet-text');
    const $counter = $(this).find('.counter');
    const emptyMsg = $(this).siblings('.empty-tweet-err');
    const longMsg = $(this).siblings('.long-tweet-err');
    if ($tweetBox.val() === "") {
      $(longMsg).slideUp(10);
      $(emptyMsg).slideDown(200);
    } else if ($tweetBox.val().length > 140) {
      $(emptyMsg).slideUp(10);
      $(longMsg).slideDown(200);
    } else {
      const tweetSerialized = $tweetBox.serialize();
      $.ajax({
        method: 'POST',
        url: '/tweets',
        data: tweetSerialized
      })
        .done(result => {
          loadTweets();
          $tweetBox.val('');
          $counter.val(140);
          $(emptyMsg).slideUp(100);
          $(longMsg).slideUp(100);
        })
        .fail(err => console.log(err));
    }
  });
});

