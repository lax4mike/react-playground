var gulp           = require("gulp"),
    utils          = require("./utils"),
    config         = utils.loadConfig(),
    rename         = require("gulp-rename"),
    template       = require("gulp-template");

var path = require("path"),
    fs   = require("fs");


// dev/default settings
var html = {
    watch: [
        config.root + "/index.html",
        config.root + "/examples/**"
    ],
    dest: config.dest
};

// production settings
if (config.env === "prod"){
    // defaults
}



/* copy html files */
gulp.task("html", function(next) {


    // generate index.html with underscore templates
    gulp.src(config.root + "/index.html")
            .pipe(utils.drano())
            .pipe(template({
                examples: getExamples()
            }))
            .pipe(gulp.dest(html.dest));

    next();

});


// watch html
if (config.watch){
    utils.logYellow("watching", "html:", html.watch);
    gulp.watch(html.watch, ["html"]);
}




function getExamples() {

    var examplesDir = path.resolve(config.root + "/examples");
    var files = fs.readdirSync(examplesDir);
  
    // load file content of each file in examples
    examples = files.map(function(file){
        var filePath = examplesDir + '/' + file;
        var content = fs.readFileSync(filePath, "utf8");

        // remove extension and replace : with /
        var filename = file.replace(/\.[^/.]+$/, "")
                           .replace(/:/, "/"); 

        return {
            filename: filename,
            content: content
        };
    });


    return examples;

}

