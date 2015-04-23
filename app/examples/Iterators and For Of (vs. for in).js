// Iterators and For Of (vs. for in)

/** 
== Iterator: Supported only on firefox ==
* An Iterator is an object that knows how to access
* items from a collection one at a time while keeping
* the track of its current position within that sequence
* In javascript an iterator provides a next() method which returns the next item in [key, value] format in the sequence
* The next() method throws StopIteration if no more items in the sequence
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators#Iterators
**/

// Simple iterators for objects and arrays can be created using the Iterator() function

// lets define a "fruit" object with "name" and "texture" properties
var fruit = {name: "Banana", texture: "Gooey"}; 
// lets create an iterator for the "fruit" object using Iterator() function
var iterator = Iterator(fruit);
// lets use next() method to access key-value pair from the "fruit" object
console.log(iterator.next()); // key-value pair is ["name", "Banana"]
console.log(iterator.next()); // key-value pair is ["texture", "Gooey"]
//console.log(iterator.next()); // throws StopIteration

/** 
== StopIteration is Non-standard. Not part of any current standards document. ==
* Basically, anything after StopIteration won't get executed
**/

/** == ES5 == **/

// Using forEach
Object.keys(fruit).forEach(function (key) {
	var value = fruit[key];
	console.log(key,value);
});