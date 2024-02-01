const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let quotes = [];


function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}
function  loadCompleted(){
    loader.hidden= true;
    quoteContainer.hidden = false;
}
//Display a random new quote
function newQuote(){
    loading();
// Math.random() is a function that returns a number b/w zero or one.We need to combine it with Math.floor as we don't want decimal value.
const newquote = quotes[Math.floor(Math.random() * quotes.length)];
    if(newquote.length > 50){
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = newquote.text;
    //Hide Loader
    loadCompleted();
}
// Getting quotes from api using an asynchronous fetch request..
// An asynchronous function can run at any time independantly and it wont stop browser from completing the loading of the page.
async function getQuotes() {
    loading();
    // const url ='https://type.fit/api/quotes';
    const url= 'https://anjithaanoop.github.io/quotesapi/bibleQuotes.json';
    // a try catch allows us to attempt to complete a rqst,if it doesn't work then we catch an error statement
    try{
        const response = await fetch(url);
        console.log(response);
        //this const will not be populated until we fetch data from our api.
        quotes = await response.json();
        //turning the response into a json object
        console.log(quotes);
        newQuote();
    }
    catch(error){

    }
}

//Tweet
function tweetQuote(){
    // A template string uses backticks
    // Template string allows us to pass in a variable.

    const twitterUrl =`https://twitter.com/intent/tweet?text=${quoteText.textContent}`;
    window.open(twitterUrl,'_blank');
}

//Event Listeners
// just pass in the function name.
newQuoteBtn.addEventListener('click',newQuote);
twitterBtn.addEventListener('click',tweetQuote);


//to run the getQuotes function as soon as the page loads
getQuotes();

