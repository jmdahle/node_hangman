# node_hangman

## About node_hangman
Node_hangman is a command line version of a word guessing game.  

Node_hangman chooses a word at random from its dictionary and the user guesses letters to solve the word.  The user is limited to 6 incorrect guesses before losing the game.  Duplicate guesses do not count as incorrect guesses.  

Following a correct guess, node_hangman will reveal the location of the correct letters guessed.  After solving the puzzle, the user can choose to play again with a new word.  If all words from the dictionary have been used, the program notifies the user and end the game.

## Installation
Node_hangman relies on node.js and the _inquirer_ package that can be installed using the node package manager (npm).

* [inquirer](https://www.npmjs.com/package/inquirer)

## Usage
Start the node_hangman game by navigating the terminal to the node_hangman directory and entering ```node index.js```. 

## Technical Notes
* Node_hangman 'requires' contructors for Word and Letter as well as an array of words from Dictionary.
* Inquirer configured to validate the letter entered (must be a single letter, a-z)
* The Dictionary can be edited to replace the candidate words for the game.
* The user can continue the game and it will keep track of wins and losses.
* If the game runs out of words, it will alert the user and end the game.

## Resources
* Code for liri.js is found at [GitHub](https://github.com/jmdahle/node_hangman)