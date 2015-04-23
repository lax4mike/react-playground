// Template Literals (strings)


// Multiline Strings

// Old School Strings
var strOldSingleLine = "I'm a single line of text, yo.";
var strOldMultiLine  = "I'm multiple " +
                       "lines of " +
                       "text, yo.";

console.log('strOldSingleLine', strOldSingleLine);
console.log('strOldMultiLine', strOldMultiLine);



// Template Literal Strings
var strSingleLine = `I'm a single line of text, yo.`;
var strMultiLine  = `I'm multiple
lines of
text, yo.`;

console.log('strSingleLine: ', strSingleLine);
console.log('strMultiLine: ', strMultiLine);

// Note that here, we didn't have to use concat characters
// and force text into multiple strings just because we wanted
// split stuff off onto a new line.



// Espressoin Interpolation

// This also allows us to do expressions inside of our string literal,
// rather than concating expressions in.

// Old
var a = 10,
	b = 69;

console.log("a + " + "b = " + (a + b) + "." );

// New
console.log(`${a} + ${b} = ${a + b}.`);
// by using "${}" here, we are able to use varibles
// and expressions directly in our 'string'




