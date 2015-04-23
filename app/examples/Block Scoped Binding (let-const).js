// Block Scoped Binding (let/const)

// apples = apples, who knew?
// 'apples' here, is a CONSTANT, meaning it can't be changed.
// also fun, const delcerationg MUST have a value when you declare them.
const apples = 'apples';

// Also, if you try to 'reassign' a const variable, it will throw an error
//apples = 'grapes';

if (apples != 'oranges') {
	// Now that we know apples aren't oranges, let's
	// set a variable for what oranges are.  This new
	// variable is usable anywhere, as expected.
	var oranges = 'oranges';

	// This is also a variable, but it's bound to the scope
	// of this single IF statement, and is not accessable
	// outisde of it's scope, unlike oranges.
	let fruit = 'yummy';

	console.log('Inside the IF Block');
	console.log('oranges: ', oranges);
	console.log('fruit: ', fruit);
}

console.log('Outside of the IF Block');
console.log('oranges: ', oranges);
// fruit, here, will throw an error as it doesn't exist outside
// the confines of the IF block it was created in.
//console.log('fruit: ', fruit);
