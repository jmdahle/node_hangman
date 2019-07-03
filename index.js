/*
* **index.js**: The file containing the logic for the course of the game, which depends on `Word.js` and:

  * Randomly selects a word and uses the `Word` constructor to store it

  * Prompts the user for each guess and keeps track of the user's remaining guesses
  */
var Word = require('./Word.js');
var inquirer = require('inquirer');

var numWins = 0;
var numLosses = 0;
const maxGuesses = 6; // starting number of guesses
var numGuesses = 0;
var gameSolved = false;
var guessedLetters = [];
var possibleWords = ['square', 'rhombus', 'hexagon', 'circle'];  // array of words to choose from
var currentWord = new Word();

selectWord();

/** Randomly selects a word and initializes it
 * 
 */
function selectWord () {
    if (possibleWords.length >0) {
        let idx = Math.floor(Math.random()*possibleWords.length);
        let selected = possibleWords[idx];
        currentWord.initialize(selected);
        possibleWords.splice(idx,1); 
        numGuesses = maxGuesses; // re-set guesses
        guessedLetters = []; // re-set guessed letters
        gameSolved = false; // re-set game state
        playGame();
    } else {
        console.log ('\nAll my words have been used!');
    }
}



function playGame() {
    if (numGuesses > 0 && !gameSolved) {
        console.log('----------\n');
        console.log(currentWord.displayWord());
        console.log('\n');
        console.log(`You have ${numGuesses} guesses remaining.`)
        inquirer
            .prompt ([
                {
                    type: 'input',
                    name: 'letterGuess',
                    message: 'Guess a letter',
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
                        console.log (`Your guess was a ${guessResult}`);
                        break;
                    case 'incorrect':
                        console.log (`Your guess was ${guessResult}`);
                        numGuesses--;
                        break;
                    case 'solved':
                        numWins++;
                        console.log('You solved the puzzle!');
                        console.log(currentWord.displayWord());
                        gameSolved = true;
                        break;
                    default:
                        console.log('unhandled result');
                        break;
                }
                playGame();
            });
    } else {
        // you're done!
        if (gameSolved) {
            console.log('You won!')
        } else {
            numLosses++;
            console.log('You lose!  You have no guesses remaining.');
        }
        endGame();
    }    
}

function endGame () {
    console.log (`You have ${numWins} wins and ${numLosses} losses.`);
    inquirer
    .prompt ([
        {
            type: 'confirm',
            message: 'Do you want to play again?',
            name: 'continueYN'
        }
    ])
    .then ( (r) => {
        if (r.continueYN) {
            selectWord();
        }
    });

}


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