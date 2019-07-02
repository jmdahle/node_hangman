/*
* **index.js**: The file containing the logic for the course of the game, which depends on `Word.js` and:

  * Randomly selects a word and uses the `Word` constructor to store it

  * Prompts the user for each guess and keeps track of the user's remaining guesses
  */
var Word = require('./Word.js');
var inquirer = require('inquirer');

possibleWords = ['parallel'];  // array of words to choose from
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

function playGame() {
    if (numGuesses > 0) {
        console.log(currentWord.displayWord());
        console.log(`You have ${numGuesses} guesses remaining.`)
        inquirer
            .prompt ([
                {
                    type: 'input',
                    name: 'letterGuess',
                    validate: function(x) {
                        if (/^[a-z]{1}$/i.test(x)) {
                            return true
                        } else {
                            return 'Must enter a single letter'
                        }
                    }
                }
            ])
            .then ( (r) => {
                let guessResult = currentWord.guessLetter(r.letterGuess);
                switch (guessResult) {
                    case 'correct':
                        console.log (`Your guess was ${guessResult}`);
                        break;
                    case 'duplicate':
                        console.log (`Your guess was ${guessResult}`);
                        break;
                    case 'incorrect':
                        console.log (`Your guess was ${guessResult}`);
                        numGuesses--;
                        break;
                    case 'solved':
                        console.log('You solved the puzzle!');
                        console.log(currentWord.displayWord());
                        break;
                    default:
                        console.log('unhandled result');
                        break;
                }
                playGame();
            });
    } else {
        // you're done!
        console.log('You lose!  You have no guesses remaining.');
    }    
}


selectWord();
playGame();

/*
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
 */