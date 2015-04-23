//Destructuring Assignments give a new syntax for extracting data from objects and arrays that mirrors creating objects and arrays.

// So, you have an array. In this example it's an array for todays date.
function now() { return ['April', 23, 2015]; }

//and you want to extract each part of the date into variables...

//You might do something like this
var es5Month = now()[0];
var es5Day = now()[1];
var es5Year = now()[2];

console.log('Month: ' + es5Month);
console.log('Day: ' + es5Day);
console.log('Year: ' + es5Year);

//but maybe you learned a little bit about destructuring assignments in ES6 and you realize you can reduce that down to a single line that follows the same syntax you're already familiar with for creating an array

//You might do something like this
var [es6Month, es6Day, es6Year] = now();

console.log('Month: ' + es6Month);
console.log('Day: ' + es6Day);
console.log('Year: ' + es6Year);

//But I hear you ask "a day is gone in but a mere 24 hours, what could I possibly ever need that information stored in a variable for? I only need the month and year"

//Well we can do that!
function theFuture() { return ['June', 6, 2069]; }

//By leaving a comma seperated blank space at the position of the array you are excluding. You can store only the positions that you need.
var [futureMonth, ,futureYear] = theFuture();

console.log('Month: ' + futureMonth);
//console.log('Day: ' + futureDay);
console.log('Year: ' + futureYear);



//But maybe you have an object to work with, how does that work?

var distantFuture = {month: 'smarch', year: 6669};

//In a similiar fashion, you can totally extract property names from an object and store them as variables
var {month, year} = distantFuture;

console.log(month);
console.log(year);

//But I hear you ask again "What if the property names I used inside the object makes for a horrible variable name like in the example right above this comment, is there any hope for keeping my code readable and maintainable?"

//Fear not, concerned nerd, you can totally change them! Following the same object creation syntax you already know and love and using the power of the mighty colon you can store these values in whatever variable name you would like.
var {month: distantMonth, year: distantYear} = distantFuture;

console.log(distantMonth);
console.log(distantYear);  