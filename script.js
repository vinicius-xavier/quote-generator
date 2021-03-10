const twitterButton = document.querySelector("#tweet");
const spinner = document.querySelector("#spinner");

const newQuoteButton = document.querySelector("#new-quote");
newQuoteButton.addEventListener("click", getQuote);

const endpoint = "http://api.quotable.io/random";

async function getQuote() {
  spinner.classList.remove("hidden");
  newQuoteButton.disabled = true;

  try {
    const response = await fetch(endpoint);

    if (!response.ok) {
      throw Error(response.statusText);
    }
    const json = await response.json();
    displayQuote(json.content, json.author);
    setTweetButton(json.content, json.author);
  } catch (err) {
    alert("Failed to fetch new quote");
  } finally {
    newQuoteButton.disabled = false;
    spinner.classList.add("hidden");
  }
}

function displayQuote(quote, author) {
  const quoteText = document.querySelector("#quote-text");
  const quoteAuthor = document.querySelector("#quote-author");
  const formatAuthor = "- " + author;
  quoteText.textContent = quote;
  quoteAuthor.textContent = formatAuthor;
}

function setTweetButton(quote, author) {
  twitterButton.setAttribute(
    "href",
    `https://twitter.com/share?text=${quote} - ${author}`
  );
}
