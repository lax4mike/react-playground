/**
 * Default Parameters
 *
 * Default parameters allow you to set parameters that are not
 * explicitly passed in.
 *
 * If a parameter is:
 * 1.) Not passed in
 * or
 * 2.) Undefined
 * It will be replaced by the fallback parameter.
 */

//** Examples **//
var sumNoDefaults;
var sumWithDefault;
var sumBothDefaults;
var sumOfNull;

/**
 * ES5 (old) Addition Function
 * @param  {Number} Number to add.
 * @param  {Number} Number to add.
 * @return {Number} Sum of 'a' and 'b'.
 */
function oldAdd(a, b) {
	var firstValue = a === undefined ? 3 : a;
	var secondValue = b === undefined ? 5 : b;
	return firstValue + secondValue;
}

/**
 * ES6 (new) Addition Function
 * @param  {Number} Number to add.
 * @param  {Number} Number to add.
 * @return {Number} Sum of 'a' and 'b'.
 */
function newAdd(a = 3, b = 5) {
	return a + b;
}

sumNoDefaults = newAdd(1,2); // 1 + 2
sumWithDefault = newAdd(2); // 2 + 5
sumBothDefaults = newAdd(); // 3 + 5
sumOfNull = newAdd(1, null); // 1 + null

console.log('two parameters passed: ' + sumNoDefaults);
console.log('one parameter passed: ' + sumWithDefault);
console.log('no parameters passed: ' + sumBothDefaults);
console.log('null parameter passed: ' + sumOfNull);

/**
 * Links:
 * https://github.com/esnext/es6-default-params
 * http://tc39wiki.calculist.org/es6/default-parameter-values/
 * https://github.com/lukehoban/es6features#default--rest--spread
 */