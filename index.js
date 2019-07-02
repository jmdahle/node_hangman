/*
* **index.js**: The file containing the logic for the course of the game, which depends on `Word.js` and:

  * Randomly selects a word and uses the `Word` constructor to store it

  * Prompts the user for each guess and keeps track of the user's remaining guesses
  */
Word = require('./Word.js');

possibleWords = ['parralel'];  // array of words to choose from
var currentWord = new Word();

/** Randomly selects a word and initializes it
 * 
 */
function selectWord () {
    if (possibleWords.length >0) {
    let idx = Math.floor(Math.random()*possibleWords.length);
    let selected = possibleWords[idx];
    currentWord.initialize(selected);
    possibleWords.splice(idx,1); // removes the word from the array
    } else {
        console.log ('All my words have been used!');
    }
}


numGuesses = 10; // starting numbner of guesses
guessedLetters = [];

if (numGuesses > 0) {
    // keep playing

    // ask for a letter

    // check the letter
    // is the letter a letter (not a number or symbol)

    // cases: 1 unsolved (repeat of a guess)
    // cases: 2 unsolved (reduce guesses by 1)
    // cases: 3 solved
    // cases: 4 out of guesses

} else {
    // you're done!

}


let testWord = process.argv[2];
if (testWord.length > 0) {
    myWord = new Word();
    myWord.initialize(testWord);
//    console.log(testWord, myWord);
    console.log(myWord.displayWord());
    console.log('b:', myWord.guessLetter('b'), myWord.displayWord());
    console.log('m:',  myWord.guessLetter('m'), myWord.displayWord());
    console.log('R:',  myWord.guessLetter('R'), myWord.displayWord());
    console.log('m:',  myWord.guessLetter('m'), myWord.displayWord());
}
 