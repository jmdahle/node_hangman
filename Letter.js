function Letter (char) {
    this.char = char.toLowerCase();
    this.isRevealed = false;
    this.returnLetter = function() {
        if (this.isRevealed) {
            return. this.char
        } else {
            return '_';
        }
    }
    this.checkLetter = function(checkChar) {
        if (checkChar.toLowerCase() = this.char) {
            this.isRevealed = true;
        }
    }
}