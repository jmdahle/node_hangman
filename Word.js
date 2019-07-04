var Letter = require('./Letter.js');

function Word () {
    this.maskedWord = [];
    this.guessedLetters = '';
    this.initialize = function(newWord) {
        this.maskedWord = []; // clear the word
        for (let i = 0; i < newWord.length; i++) {
            let newLetter = new Letter(newWord.charAt(i));
            this.maskedWord.push(newLetter);
        }
    };
    this.displayWord = function() {
        let w = ''; // string that will be displayed
        for (let i = 0; i < this.maskedWord.length; i++) {
            w += this.maskedWord[i].returnLetter() + ' ';
        }
        return w.trim();
    }
    this.displaySolved = function() {
        let w = ''; // string that will be displayed
        for (let i = 0; i < this.maskedWord.length; i++) {
            w += this.maskedWord[i].char;
        }
        return w.trim();
    }
    this.guessLetter = function(guess) {
        let returnVal = 'incorrect';
        if (this.guessedLetters.indexOf(guess) > 0) {
            returnVal = 'duplicate';
        } else {
            this.guessedLetters += guess;
        }
        let numCorrect = 0;
        for (let i = 0; i < this.maskedWord.length; i++) {
            let letterVal = this.maskedWord[i].checkLetter(guess);
            if (returnVal === 'incorrect' && (letterVal === 'correct' || letterVal === 'duplicate')) {
                returnVal = letterVal;
            }
            if (this.maskedWord[i].isRevealed) {
                numCorrect++;
            }
        }
        if (numCorrect === this.maskedWord.length) {
            returnVal = "solved";
        }
        return returnVal
    }
}
module.exports = Word;
