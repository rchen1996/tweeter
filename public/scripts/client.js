/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  const escape = function(tweetContent) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(tweetContent));
    return div.innerHTML;
  }

  const createTweetElement = function(tweetObj) {
    let $tweet = `
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
      let $tweet = createTweetElement(tweetObj);
      $('#tweets-container').prepend($tweet);
    }
  };

  const loadTweets = function() {
    $.ajax({
      method: 'GET',
      url: '/tweets'
    })
      .done(result => {
        renderTweets(result);
      })
      .fail(err => {
        console.log(err);
      })
  };

  loadTweets();

  $('.tweet-form').submit(function(event) {
    event.preventDefault();
    // first validate for empty/long tweets - add/remove classes to change style
    const $tweetBox = $(this).find('#tweet-text');
    const $counter = $(this).find('.counter');
    const errorBox = $(this).siblings('.errors');
    const emptyMsg = $(this).siblings('.tweet-text');
    const longMsg = $(this).siblings('.long-tweet');
    if ($tweetBox.val() === "") {
      $(emptyMsg).slideDown(100, () => {
        
        // $(errorBox).removeClass('error-box'); 
        // $(emptyMsg).addClass('error-box');
        // $(longMsg).removeClass('show-error');
      })
    } else if ($tweetBox.val().length > 140) {
      $(longMsg).slideDown(100, () => {
        // $(errorBox).addClass('error-box'); 
        $(longMsg).removeClass('error-box');
        // $(emptyMsg).removeClass('show-error');
      })
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
        $(errorBox).slideUp(100, () => {
          $(emptyMsg).removeClass('show-error');
          $(longMsg).removeClass('show-error');
          $(errorBox).removeClass('error-box');
        })
      })
      .fail(err => {
        console.log(err)
      })
    }
  });
});

