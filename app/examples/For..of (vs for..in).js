// For Of (vs. for in)

/**
= The for...of statement creates a loop Iterating over iterable objects, including Array, Map, Set, arguments object and so on.
= for...of iterates over property values while for...in iterates over property names.
= Goal is to write a code to show what get's returned from an array using for...of and for...in
**/

let goals = ['js', 'angular', 'drupal'];


// Using for...in
for(let goal in goals) {
	console.log("Goal: " + goal);
}

// Using for...of
for(let goal of goals) {
	console.log("Goal: " + goal);
}

/** 
== Future Stuff ==
= For...of can be used to iterate over Generators, DOM Collections

**/