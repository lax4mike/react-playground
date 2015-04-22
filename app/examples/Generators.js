// Generators
// Generators
function* template() {
	var html = "";
	html += "<div>A Spot: " + yield + "</div>";
	html += "<div>B Spot: " + yield + "</div>";
	html += "<div>C Spot: " + yield + "</div>";

	return html;

}

var t = template();
var out;

out = t.next();
console.log(out);

out = t.next("My Heading");
console.log(out);

out = t.next("Some paragraph");
console.log(out);

out = t.next("A list of things");
console.log(out);

console.log("----------------");

function run(genFunc){
	var iter = genFunc(function() {
		iter.next();
	});

	iter.next()
}

run(function* (resume) {
	console.log("I'm thinking..");
	yield setTimeout(function() {
		console.log('a profound thought...');
		resume();
	}, 3000);
	console.log('okay, done!');
});