// Arrow Function Context
/* 
    Arrow functions capture the "this" value of the enclosing context.
    This is unlike normal functions, which capture the "this" value of where they are called.
*/

// words is a string of space separated words
function Words(words){
    this.words = words.split(" ");
}


Words.prototype = {

    // reverse a given word
    reverseWord: function(word){
        return word.split("").reverse().join("");
    },

    // Make this word collection read from rtl
    rtl: function(){

        var reversed = this.words.map(function(word){
            // "this" does not refer to this Words object without .bind(this)
            return this.reverseWord(word);
        }.bind(this));

        return reversed.reverse().join(" ");
    },


    // capitalize a single word
    capitalize: function(word){
        return word.toUpperCase();
    },

    // shout these words!
    shout: function(){

        var uppercase = this.words.map((word) => {
            // "this" refers to the Words object
            return this.capitalize(word);
        });

        return uppercase.join(" ") + "!";
    }
};



var words = new Words("Hooray Javascript");

console.log( words.rtl() );
console.log( words.shout() );

/* Links
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this
 */
