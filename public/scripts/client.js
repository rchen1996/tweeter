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
      .then(data => {
        renderTweets(data);
      })
      .catch(err => {
        console.log(err);
      })
  };

  loadTweets();

  $('.tweet-form').submit(function(event) {
    event.preventDefault();
    const $tweetBox = $(this).find('#tweet-text');
    const $counter = $(this).find('.counter');
    if ($tweetBox.val() === "") {
      alert('You cannot send an empty tweet!')
    } else if ($tweetBox.val().length > 140) {
      alert('Your message is too long!')
    } else {
      const tweetSerialized = $tweetBox.serialize();
      $.ajax({
        method: 'POST',
        url: '/tweets',
        data: tweetSerialized
      })
        .then(data => {
          loadTweets();
          $tweetBox.val('');
          $counter.val(140);
        })
        .catch(err => {
          console.log(err)
        })
    }
  });
});

