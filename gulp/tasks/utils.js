var gulp        = require("gulp"),
    plumber     = require("gulp-plumber"),
    notify      = require("gulp-notify"),
    del         = require("del"),
    fs          = require("fs"),
    path        = require("path"),
    color       = require("cli-color"),
    config      = {};

// drano: make plumber with error handler attached
module.exports.drano = function drano(){
    return plumber({
        errorHandler: function(err) {
            notify.onError({ title: "<%= error.plugin %>", message: "<%= error.message %>", sound: "Beep" })(err);
            this.emit("end");
        }
    });
};


// load task, given an array of tasks, require them
module.exports.loadTasks = function loadTasks(tasks) {
    tasks.forEach(function(name) {
        // console.log("loading task: ", name);
        require("./" + name);
    });
};


// load the config for the specified env and store in config variable
module.exports.setConfig = function setConfig(env){

    var configPath = path.resolve("./config-" + env + ".js");

    // make sure the config file exists
    if (!fs.existsSync(configPath)) {
        var err = new Error("'" + configPath + "' does not exist!");
        throw err;
    }

    // load the specified config
    var configFile = require(configPath);

    // load this config into the config variable
    for(var key in configFile){
        if (!configFile.hasOwnProperty(key)) { continue; }
        config[key] = configFile[key];
    }

    return config;

};

// return the config that was set with setConfig
module.exports.loadConfig = function loadConfig(){
    return config;
};



// will log the output with the first arg as yellow
// eg. logYellow("watching", "css:", files) >> [watching] css: ["some", "files"]
module.exports.logYellow = function logYellow(){

    var args = (Array.prototype.slice.call(arguments));
    var first = args.shift();

    if (args.length){

        var argString = args.map(function(arg){
            // "\n\t" + arg.join("\n\t")
            return (typeof arg  === "object") ? JSON.stringify(arg) : arg.toString(); 
        }).join(" ");

        console.log("[" + color.yellow(first) + "]", argString);
    }
};



// delete the destination directory
module.exports.clean = function clean(cb) {

    if (config.env !== "dev") {
        console.log("Warning!! we tried to clean " + config.dest + " using the '" + config.env + "' env");
        return;
    }

    this.logYellow("cleaning", config.dest);
    del([config.dest], {force: true}, cb);

};


