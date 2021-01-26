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
      .then(data => {
        console.log('Success')
      })
      .catch(err => {
        console.log(err)
      })
  });

  const loadTweets = function() {
    // fetch tweets from http://localhost:8080/tweets
    // use jQuery to make a request to /tweets
    // receive array of tweets as JSON
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
});

