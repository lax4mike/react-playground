// Destructuring - Parameters

/**
 * Positional vs. Named paramters
 * 
 * Positional parameters are mapped by position.
 * Named parameters use names (labels) to perform the mapping.
 * 
 * Named parameters have some benefits: 
 *  - They provide descriptions for arguments in function calls. 
 *  - They work well for optional parameters, because the order in which they are passed doesn't matter.
 */


// A traditional function using positional parameters
function positionalParametersParadise(trees = 0, beachBalls = 0, lobsters = 0){
    return `:( positional paradise has ${trees} trees, ${beachBalls} beachBalls, and ${lobsters} lobsters.`;
}

// This is hard to read, and hard to omit optional paramters
console.log( positionalParametersParadise(0, 2, 0) );


// You can emulate named paramters in es5 by passing an object
function es5Paradise(obj){

    // But it takes some extra work to extract the variables and add default values
    var trees      = (typeof obj.trees === "undefined" ? 0 : obj.trees);
    var beachBalls = (typeof obj.beachBalls === "undefined" ? 0 : obj.beachBalls);
    var lobsters   = (typeof obj.lobsters === "undefined" ? 0 : obj.lobsters);

    return `:\/ es5 paradise has ${trees} trees, ${beachBalls} beachBalls, and ${lobsters} lobsters.`;
}

// Then you can call the function with "named" parameters. Much easier to read.
console.log( es5Paradise({
    trees: 4,
    beachBalls: 12
}) );


// Named parameters are easier to emulate with es6 destructuring and default parameters. 
// We can define the parameters using destruturing right in the function definition.  
// Much nicer!
function es6Paradise({trees = 0, beachBalls = 0, lobsters = 0}){
    return `:) es6 paradise has ${trees} trees, ${beachBalls} beachBalls, and ${lobsters} lobsters!`;
}

// Notice that the order doesn't matter, and we easily left out optional paramters
console.log( es6Paradise({
    beachBalls: 20,
    trees: 10
}) );



/* Links
 http://www.2ality.com/2015/01/es6-destructuring.html#simulating_named_parameters
 */
