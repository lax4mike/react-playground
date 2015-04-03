// Iterators
/*
An object is Iterable if it defines a function on the Object[Symbol.iterator] property.
This function must return an object with a .next() function that returns an object with two properties:
  {
    value: <some value>,
    done: boolean
  }

*/


// Arrays have an iterator built in.
var arr = [5, 10, 15];

// Array.prototype.entries() returns an iterator
// equivilent to arr[Symbol.iterator]()
var iterator = arr.entries();

console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());

// Strings have iterators too
var poo = "shoe";
var pooterator = poo[Symbol.iterator]();

console.log(pooterator.next());
console.log(pooterator.next());
console.log(pooterator.next());
console.log(pooterator.next());
console.log(pooterator.next());

console.log("all letters in 'shoe'");
for(let letter of poo){
    console.log(letter);
}

// Custom iterator (without generator)
var numbers = [
    {num: 1},
    {num: 2},
    {num: 3},
    {num: 4, hidden: true},
    {num: 5},
    {num: 6}
];

numbers[Symbol.iterator] = function(){

    // keep track of where we are, going backwards
    var i = numbers.length;

    return {
        next() {

            // decrement i
            i--;
            // if we're at the end, finish
            if (!numbers[i]){ 
                return { done: true };
            }

            // skip if it's hidden
            if (numbers[i].hidden){ return this.next(); }

            // return this number
            return { 
                value: numbers[i].num, 
                done:  false
            };
        }
    };
};

console.log("Secret numbers");
for(let num of numbers){
    console.log(num);
}


/* Links
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#With_a_generator
*/
