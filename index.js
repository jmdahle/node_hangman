
var Word = require('./Word.js');
var inquirer = require('inquirer');
var possibleWords = require('./Dictionary.js');  // array of words to choose from

var numWins = 0; // accumualtion of wins
var numLosses = 0; // accumualtion of losses
const maxGuesses = 6; // starting number of guesses
var numGuesses = 0; // counter for number of guesses remaining
var gameSolved = false; // flag for game solution

var currentWord = new Word(); // uses word constructor to create word puzzle

selectWord();

/** Randomly selects a word from the Dictionary and initializes it
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
        console.log('\n\n');
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
                        console.log (`\nYour guess was ${guessResult}`);
                        break;
                    case 'duplicate':
                        console.log (`\nYour guess was a ${guessResult}`);
                        break;
                    case 'incorrect':
                        console.log (`\nYour guess was ${guessResult}`);
                        numGuesses--;
                        break;
                    case 'solved':
                        numWins++;
                        console.log('\nYou solved the puzzle!\n');
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
        console.log(`The word was ${currentWord.displaySolved()}`)
        if (gameSolved) {
            console.log('You won!\n')
        } else {
            numLosses++;
            console.log('You lose!  You have no guesses remaining.');
        }
        endGame();
    }    
}

function endGame () {
    console.log (`You have ${numWins} wins and ${numLosses} losses.\n`);
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