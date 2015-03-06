var gulp        = require("gulp"),
    utils       = require("./utils"),
    config      = utils.loadConfig(),
    browserSync = require("browser-sync"),
    nodemon     = require( "gulp-nodemon");



gulp.task("browserSync", ["server"], function(){
    
    if (config.watch === true){

        utils.logYellow("watching", "browserSync:", config.browserSync.files);

        browserSync(config.browserSync);

    } 

});



gulp.task("server", function (cb) {

    cb();

    return nodemon({ 
        script: config.server.src, 
        watch: config.server.watch
    })
    .on("start", function onStart() {
        setTimeout(function(){
            browserSync.reload();
            
        }, 1000); // hack
    });


});

