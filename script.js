"use strict";

const containerQuote = document.getElementById("quote-container");
const labelQuote = document.getElementById("quote-text");
const labelSource = document.getElementById("source-text");
const buttonNewQuote = document.getElementById("new-quote");
const buttonTwitter = document.getElementById("twitter-button");
const imageLoading = document.getElementById("loader");

const apiURL = "https://stoic-server.herokuapp.com/random";
let quoteObject = [];

const twitterCharacterLimit = 280;

const showLoadingSpinner = function () {
  imageLoading.hidden = false;
  containerQuote.hidden = true;
};

const hideLoadingSpinner = function () {
  imageLoading.hidden = true;
  containerQuote.hidden = false;
};

async function getQuoteFromAPI() {
  showLoadingSpinner();

  const response = await fetch(apiURL);
  quoteObject = await response.json();
  try {
    displayQuote(quoteObject);
  } catch {
    // TODO: catch block
  }

  hideLoadingSpinner();
}

const displayQuote = function (quoteObject) {
  const [quote] = quoteObject;

  if (quote.body.length > twitterCharacterLimit) buttonTwitter.hidden = true;
  else buttonTwitter.hidden = false;

  labelQuote.textContent = quote.body;
  labelSource.textContent = `${quote.author}, ${quote.quotesource}`;
};

function tweetQuote() {
  const twitterURL = `https://twitter.com/intent/tweet?text=${labelQuote.textContent} — ${labelSource.textContent}`;
  window.open(twitterURL, "_blank");
}

// Adding Event Listeners
document.addEventListener("DOMContentLoaded", getQuoteFromAPI);
buttonNewQuote.addEventListener("click", getQuoteFromAPI);
buttonTwitter.addEventListener("click", tweetQuote);
