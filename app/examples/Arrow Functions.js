/**
 * Arrow Functions
 *
 * Arrow functions are a new way of writing functions using a "fat arrow".
 * 
 * Syntax:
 * param => expression
 *
 * The expression is the implicit return value of that function.
 */

//////////////
// Examples //
//////////////

/**
 * ES5 (old) Addition Function
 */
function oldAdd(a, b) {
	return a + b;
}

/**
 * Single Parameter, single expression
 * 
 * param => expression;
 * 
 */
var addSingleParam = a => a + 2;

/**
 * Single Parameter, multiple statements
 * 
 * param => {
 *   statements
 * }
 * 
 */
var addSingleParamStatements = a => {
	a = a + 2;
	return a + 5;
}

/**
 * Multiple Parameters
 *
 * (param, param) => {
 *   statements
 * }
 */
var addMultipleParams = (a, b) => {
	return a + b;
}

/**
 * No Parameters
 *
 * () => {
 * 	statements
 * }
 * 
 */
var noParams = () => {
	return 2 + 5;
}

/**
 * Immediately Invoked Functions
 *
 * params => {
 *   statements
 * }(params);
 * 
 */
var addTwo = ( x => {
	console.log("Immediately Invoked: " + (x + 2));
})( 10 ); // 12




console.log('Single param: ' + addSingleParam(3)); // 5
console.log('Multiple params: ' + addMultipleParams(3, 8)); // 11
console.log('No param: ' + noParams()); // 7




/////////////////////////
// Additional Examples //
/////////////////////////
var array = ['one', 'two', 'three', 'four'];
array.forEach(value => {
	console.log(value);
});

/**
 * Links:
 * http://jsrocks.org/2014/10/arrow-functions-and-their-scope/
 * http://wiki.ecmascript.org/doku.php?id=harmony:arrow_function_syntax
 */