// Include gulp and plugins
var gulp           = require("gulp"),
    utils          = require("./tasks/utils"),
    config         = utils.loadConfig(),
    notify         = require("gulp-notify"),
    runSequence    = require('run-sequence');


gulp.task("prod", function(){  

    // load the prod config (cache in utils.js)
    config = utils.setConfig("prod");

    gulp.start("build");

});



gulp.task("dev", function(){

    // load the dev config (cache in utils.js)
    config = utils.setConfig("dev");

    // clean first, then build
    utils.clean(function(){
        gulp.start("build"); 
    });    

});


// load and start tasks
gulp.task("build", function(){
    
    gulp.src('').pipe(notify("Building for '" + config.env + "' environment")); // gulp.src('') is a hack

    utils.loadTasks(config.tasks);

    // browserSync needs special treatment because it needs to be started AFTER the 
    // build directory has been created and filled (for livereload to work)
    if (config.browserSync) {
        utils.loadTasks(["browserSync"]);
        runSequence(config.tasks, "browserSync");
    }
    else {
        gulp.start(config.tasks);
    }

    
});

// Default Task (run when you run 'gulp'). dev envirnoment
gulp.task("default", ["dev"]);

