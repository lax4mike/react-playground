// Rest Parameters/Spread

/**
  Rest Parameters 
 
    The goal is to write a function that will accept a variable amount of arguments and add them all up.
     
    sum(1, 2, 3, ...);
 */


// In es5, we need to use the arguments object to get a variable number of the arguments
// The arguments object is an Array-like object corresponding to the arguments passed to a function.
function es5Sum() {
  
  // first, we need to convert the arguments object to an Array so we can use reduce 
  var args = Array.prototype.slice.call(arguments);
    
  // Sum up all the numbers in args using reduce
  return args.reduce(function(prev, current){
    return prev + current;
  });
}


// In es6, we can use the "Rest Parameters" syntax. eg. "...args"
// This creates an Array with the rest of the arguments
// (with all Array prototype methods)
function es6Sum(...nums) {
  
  // nums is now an Array with all Array methods, including reduce
  return nums.reduce(function(prev, current){
    return prev + current;
  });
  
}

console.log("es5Sum 24 =", es5Sum(4, 8, 12));
console.log("es6Sum 30 = ", es6Sum(5, 10, 15));

console.log("-----");


/**
  Spread 
 
    The spread operator is like the reverse of rest parameters. 
    It allows you to expand an array into multiple formal parameters.
 */

var addThese = [6, 12, 18];

console.log("spread-es6 36 =", es6Sum(...addThese));

// in es5, this is possible with .apply
console.log("spread-es5 36 =", es6Sum.apply(null, addThese));


/* Links */
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator
// https://github.com/google/traceur-compiler/wiki/LanguageFeatures#rest-parameters

