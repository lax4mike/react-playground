// handle es6 -> es5 compilation

var Console = require("./console-result");

// get traceur compiler (has the .compile() function)
var Es6Compiler = new traceur.Compiler();

// es6 code mirror
var es6 = document.querySelector(".code__editor--es6 .code__code-mirror");
var es6CodeMirror = CodeMirror(es6, {
    mode:  "javascript",
    lineNumbers: true,
    lineWrapping: true
});

// es6 code mirror
var es5 = document.querySelector(".code__editor--es5 .code__code-mirror");
var es5CodeMirror = CodeMirror(es5, {
    mode:  "javascript",
    lineNumbers: true,
    lineWrapping: true
});


// observe change stream on es6codemirror
var es6Stream = Kefir.fromEvent(es6CodeMirror, "change")

    // only do this if there is a 250ms gap
    .debounce(250)

    // compile the es6 code to es5 with traceur
    .map(function(cm){
        try {
            var compiled = Es6Compiler.compile(cm.getValue(), "es6-playground");

            // insert lines to divide boilerplate traceur code from user code
            compiled = compiled.match(/[^\r\n]+/g)
                .map(function(line, i){
                    if (line.match(/var __moduleName = ".*";/)){
                        line += "\n";
                    }
                    if (line.match(/^\s\sreturn {};/)){
                        line = "\n" + line;
                    }
                    return line;
                })
                .join("\n");

            return compiled;
        } 
        catch(e){
            return e.toString();
        }
    })

    // when it changes, update the es5 code mirror
    .onValue(function(v){
        es5CodeMirror.setValue(v);

        Console.updateConsole(es6CodeMirror.getValue());
    });



// handle select change
var select = document.querySelector(".examples");

var exampleStream = Kefir.fromEvent(select, "change")

    .map(function(event){
        return event.target.value;
    })

    .onValue(function(filename){

        // if there is no filename, clear the es6 code
        if (!filename) {
            es6CodeMirror.setValue("");
            return;
        }

        // find the selected file
        var file = window.es6Examples.find(function(ex){
            return ex.filename == filename;
        });

        // set the es6 code to be the file contents
        if (file){
            es6CodeMirror.setValue(file.content);
        }
    });



// fire change event when the page loads
es6CodeMirror.setValue(es6CodeMirror.getValue());


