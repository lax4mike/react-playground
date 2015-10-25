// handle es6 -> es5 compilation

import Output from "./output.js";

// es6 code mirror
let es6 = document.querySelector(".editor--es6 .editor__code-mirror");
let es6CodeMirror = CodeMirror(es6, {
    mode         : "jsx", // or javascript
    lineNumbers  : true,
    lineWrapping : true,
    theme        : "eclipse"
});

// es6 code mirror
let es5 = document.querySelector(".editor--es5 .editor__code-mirror");
let es5CodeMirror = CodeMirror(es5, {
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
let es6Stream = Kefir.fromEvent(es6CodeMirror, "change")
    // only do this if there is a 250ms gap
    .debounce(250)
    // get the code from the codemirror
    .map((codeMirror) => codeMirror.getValue());

es6Stream
    // compile the es6 code to es5
    .map(getCompiled)
    // when it changes, update the es5 code mirror and output/console
    .onValue(runCode);



// handle refreshing the console (useful for console statements over time)
let refreshStream = Kefir.fromEvent($(".btn--rerun"), "click")

    // first clear the console
    .onValue(function(){ Output.clear() })

    // get the compiled code
    .map(getCompiled)

    // wait for 500ms
    .delay(500)

    // update es5 and console
    .onValue(runCode);


// snag the code from the es6 panel and get es5 code or error
function getCompiled(es6Code){
    try {
        let compiled = babel.transform(es6Code).code;
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
let select = $(".examples");

let exampleStream = Kefir.fromEvent(select, "change")

    // get the value of the selcted option (filename)
    .map((event) => event.target.value)

    .onValue(function(slug){

        // if there is no slug, clear the es6 code
        if (!slug) {
            es6CodeMirror.setValue("");
            window.location.hash = "";
            return;
        }

        // find the selected file
        let file = window.es6Examples.find((ex) => ex.slug == slug);

        // set the es6 code to be the file contents
        if (file){
            es6CodeMirror.setValue(file.content);

            // set the hash
            window.location.hash = "#" + slug;
        }

    });

// stream of t/f of whether or not we can update the hash when the
// es6stream changes.  This is for when the user selects an example from
// the example dropdown, we want to keep the example name in the url hash
// but when they start typing, we want the encrypted code in the url hash
let isAllowedToEncryptCodeIntoHash = Kefir.merge([es6Stream, exampleStream])

    // check the last two values.  This is because when the exampleStream
    // fires, it updates the es6 code which fires that stream.
    .slidingWindow(2, 2)

    .map((values) => {

        // each value is either the name of the example, or the text that
        // is inisde the es6 editor.  If we recognize it as a filename,
        // return true
        let areFiles = values.map((value) => {
            let file = window.es6Examples.find((ex) => ex.slug == value);

            return (typeof(file) !== "undefined");
        });

        // if either of the last two values are true, return false
        // meaning, if the user changed the example dropdown in the
        // last two events, we're not allowed to update the hash with
        // the DEFLATE hash
        return !areFiles.some((v) => v);
    })

    .skipDuplicates();


// update the hash with DEFLATE, if we're allowed
es6Stream
    .filterBy(isAllowedToEncryptCodeIntoHash)
    .onValue(encryptCodeIntoHash);


// https://github.com/jbt/markdown-editor
// using the DEFLATE algorithm
function encryptCodeIntoHash(es6Code){

    window.location.hash = btoa( // base64 so url-safe
        RawDeflate.deflate( // gzip
            unescape(encodeURIComponent( // convert to utf8
                es6Code
            ))
        )
    );
}

// on page load, if there is a hash present, load the example
let hash = window.location.hash.replace(/^#/, '');

if (hash){
    let file = window.es6Examples.find((ex) => ex.slug == hash);

    // if the hash is a file, select it and trigger change
    if (file){
        select.val(hash);
        select.change();
    }
    // otherwise, it's the encrypted code, inflate and update the editor
    else {
        es6CodeMirror.setValue(
            decodeURIComponent(escape(
                RawDeflate.inflate(
                    atob(
                        hash
                    )
                )
            ))
        )
    }
}
