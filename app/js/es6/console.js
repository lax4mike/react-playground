// credit goes to https://github.com/jmcriffey/es6-fiddle-web/blob/master/src/es6-fiddle.js


// override console.log so it shows up in the console UI
window.console.log = (function() {
    var log = console.log;
    return function() {
        log.apply(window.console, arguments);

        // if an arg is an object, print out the JSON instead of [object Object]
        var args = (Array.prototype.slice.call(arguments));
        var argString = args.map(function(arg){
            return (typeof arg  === "object") ? JSON.stringify(arg, null, 1) : arg.toString(); 
        }).join(" ");

        $(".console__text").append("<div  class='console__log'>" + argString + 
            "</div>");
    };
}());

window.console.error = (function() {
    var err = console.error;
    return function() {
        err.apply(window.console, arguments);

        // if an arg is an object, print out the JSON instead of [object Object]
        var args = (Array.prototype.slice.call(arguments));
        var argString = args.map(function(arg){
            return (typeof arg  === "object") ? JSON.stringify(arg, null, 1) : arg.toString(); 
        }).join(" ");

        $(".console__text").append("<div class='console__error'>" + argString + 
            "</div>");
    };
}());


module.exports = {

    clear: function(){
        $(".console__text").empty();
    },

    updateConsole: function updateConsole(code){
        try {
            this.clear();
            babel.run(code);
        }
        catch(e){
            console.error(e.stack);

        }
    }
};


