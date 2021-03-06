// credit goes to https://github.com/jmcriffey/es6-fiddle-web/blob/master/src/es6-fiddle.js


// override console.log so it shows up in the console UI
window.console.log = (function() {
    var log = console.log;

    return function() {
        
        // forward the call on to the real console.log
        log.apply(window.console, arguments);

        // write to our on screen console
        var argString = getArgString(Array.prototype.slice.call(arguments));
        $(".js-console-output").append("<div  class='console__log'>" + argString + 
            "</div>");
    };
}());

window.console.error = (function() {
    var err = console.error;

    return function() {

        // forward the call on to the real console.err
        err.apply(window.console, arguments);

        // write to our on screen console
        var argString = getArgString(Array.prototype.slice.call(arguments));
        $(".js-console-output").append("<div class='console__error'>" + argString + 
            "</div>");
    };
}());

// format the arguments for console logging
function getArgString(args) {

    try {
        // if an arg is an object, print out the JSON instead of [object Object]
        return args.map(function(arg){
            
            if (typeof arg === "undefined") { return "undefined"; }
            if (typeof arg === "object")    { return JSON.stringify(arg, null, 1) }

            return arg.toString(); 
        }).join(" ");
    }
    catch(e){
        return args.toString();
    }
}

var entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
    "/": "&#x2F;"
};

function escapeHtml(string) {
    return String(string).replace(/[&<>"'\/]/g, function (s) {
        return entityMap[s];
    });
}


module.exports = {

    clear: function(){

        // clear any intervals 
        // Get a reference to the last interval +1
        var lastIntervalId = window.setInterval(() => {}, 9999); 
        for (var i = 1; i < lastIntervalId; i++){
            window.clearInterval(i);
        }
 
        $(".js-console-output").empty();
        $(".js-react-output").empty();
    },

    updateOutput: function updateOutput(code){
        try {
            this.clear();
            babel.run(code);
        }
        catch(e){
            $(".toggle--console").prop("checked", true).change(); // show console if there is an error
            console.error(escapeHtml(e.stack));
        }
    }
};


