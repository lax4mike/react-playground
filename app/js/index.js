
var es6 = document.querySelector(".code__editor--es6 .code__code-mirror");

var myCodeMirror = CodeMirror(es6, {
    value: "var poo = 1;",
    mode:  "javascript",
    lineNumbers: true
});


var es5 = document.querySelector(".code__editor--es5 .code__code-mirror");

var myCodeMirror = CodeMirror(es5, {
    value: "var poo = 1;",
    mode:  "javascript",
    lineNumbers: true
});


