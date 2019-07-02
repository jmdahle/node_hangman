function Letter (char) {
    this.char = char.toLowerCase();
    this.isRevealed = false;
    this.returnLetter = function() {
        if (this.isRevealed) {
            return this.char
        } else {
            return '_';
        }
    }
    this.checkLetter = function(checkChar) {
        let returnVal = ''; // returns result of guess: 'correct', 'incorrect' or 'duplicate';
        if (checkChar.toLowerCase() === this.char) {
            if (this.isRevealed) {
                returnVal = 'duplicate';
            } else {
                this.isRevealed = true;
                returnVal = 'correct';
            }
        } else {
            returnVal = 'incorrect';
        }
        return returnVal;
    }
}

module.exports = Letter;
