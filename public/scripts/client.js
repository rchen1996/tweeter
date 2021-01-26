/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  const createTweetElement = function(tweetObj) {
    let $tweet = `
    <article class="tweet">
      <header>
        <img src="${tweetObj.user.avatars}">
        <h4 class="user">${tweetObj.user.name}</h4>
        <p class="handle">${tweetObj.user.handle}</p>
      </header>
      <p class="tweet-content">${tweetObj.content.text}</p>
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
      $('#tweets-container').append($tweet);
    }
  };

  $('.tweet-form').submit(function(event) {
    console.log('Button clicked, performing ajax call...')
    event.preventDefault();
    const $tweetBox = $(this).find('#tweet-text');
    const tweetSerialized = $tweetBox.serialize();
    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: tweetSerialized
    })
      .then(function(data) {
        console.log('Success')
      })
  });
});

// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}