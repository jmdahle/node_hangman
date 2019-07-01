Letter = require('./Letter.js');

function Word () {
    this.maskedWord = [];
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
    this.guessLetter = function(guess) {
        for (let i = 0; i < this.maskedWord.length; i++) {
            this.maskedWord[i].checkLetter(guess);
        }
    }

/*
// test
let testWord = process.argv[2];
if (testWord.length > 0) {
    myWord = new Word();
    myWord.initialize(testWord);
//    console.log(testWord, myWord);
    console.log(myWord.displayWord());
    myWord.guessLetter('b');
    console.log('b:', myWord.displayWord());
    myWord.guessLetter('m');
    console.log('m:', myWord.displayWord());
    myWord.guessLetter('R');
    console.log('R:', myWord.displayWord());

}
*/