// credit goes to https://github.com/jmcriffey/es6-fiddle-web/blob/master/src/es6-fiddle.js


// override console.log so it shows up in the console UI
window.console.log = (function() {
    var log = console.log;
    return function() {
        log.apply(window.console, arguments);
        $(".console__text").append("<div  class='console__log'>" + Array.prototype.slice.call(arguments).join(" ") + 
            "</div>");
    };
}());

window.console.error = (function() {
    var err = console.error;
    return function() {
        err.apply(window.console, arguments);
        $(".console__text").append("<div class='console__error'>" + Array.prototype.slice.call(arguments).join(" ") + 
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


