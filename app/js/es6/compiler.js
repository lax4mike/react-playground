// handle es6 -> es5 compilation

var Output = require("./output.js");


// es6 code mirror
var es6 = document.querySelector(".editor--es6 .editor__code-mirror");
var es6CodeMirror = CodeMirror(es6, {
    mode         : "htmlmixed", // or javascript
    lineNumbers  : true,
    lineWrapping : true,
    theme        : "eclipse"
});

// es6 code mirror
var es5 = document.querySelector(".editor--es5 .editor__code-mirror");
var es5CodeMirror = CodeMirror(es5, {
    mode         : "javascript", // or javascript
    lineNumbers  : true,
    lineWrapping : true,
    theme        : "eclipse"
});

// fixing bug with cursor when the codemirror size changes
[es5CodeMirror, es6CodeMirror].forEach(function(cm){
    cm.on("focus", function(){
        cm.refresh();
    });
});



// observe change stream on es6codemirror
var es6Stream = Kefir.fromEvent(es6CodeMirror, "change")

    // only do this if there is a 250ms gap
    .debounce(250)

    // compile the es6 code to es5
    .map(getCompiled)

    // when it changes, update the es5 code mirror and output/console
    .onValue(runCode);


// handle refreshing the console (useful for console statements over time)
var refreshStream = Kefir.fromEvent($(".btn--rerun"), "click")

    // first clear the console
    .onValue(function(){ Output.clear() })

    // get the compiled code
    .map(getCompiled)

    // wait for 500ms
    .delay(500)

    // update es5 and console
    .onValue(runCode);


// snag the code from the es6 panel and get es5 code or error
function getCompiled(){
    try {
        var compiled = babel.transform(es6CodeMirror.getValue()).code;
        return compiled;
    } 
    catch(e){
        return e.toString();
    }
}

// take compiled code and update the es5 panel and console
function runCode(compiledCode){
    es5CodeMirror.setValue(compiledCode);
    Output.updateOutput(es6CodeMirror.getValue());
}



// handle select change
var select = $(".examples");

var exampleStream = Kefir.fromEvent(select, "change")

    .map(function(event){
        return event.target.value;
    })

    .onValue(function(slug){

        // if there is no slug, clear the es6 code
        if (!slug) {
            es6CodeMirror.setValue("");
            window.location.hash = "";
            return;
        }

        // find the selected file
        var file = window.es6Examples.find(function(ex){
            return ex.slug == slug;
        });

        // set the es6 code to be the file contents
        if (file){
            es6CodeMirror.setValue(file.content);
    
            // set the hash
            window.location.hash = "#" + slug;
        }

    });


// if there is a hash present, load the example
var hash = window.location.hash.replace(/^#/, '');

if (hash){
    select.val(hash);
    select.change();
}
    

