var gulp           = require("gulp"),
    utils          = require("./utils"),
    config         = utils.loadConfig(),
    browserSync    = require("browser-sync");


// browserSync settings
var settings = {
    // server: config.dest,
    // proxy: "your-url-here" // http://www.browsersync.io/docs/options/#option-proxy
    port: 8080,
    open: false, // or  "external"
    notify: false,
    ghostMode: false,

    // watch these files and reload the browser when they change
    files: [
        config.dest + "/**"
    ]
};

// set the server root, or proxy if it's set in local
if (config.local.hostname) {
    settings.proxy = config.local.hostname;
}
else {
    settings.server = config.dest;
}


/* start browser sync if we have the "watch" option */
gulp.task("browserSync", function(){
    
    if (config.watch === true){
        utils.logYellow("watching", "browserSync:", settings.files);
        browserSync(settings);
    }

});
