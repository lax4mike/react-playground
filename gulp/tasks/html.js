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
        config.root + "/result-iframe.html",
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


    gulp.src(config.root + "/result-iframe.html")
            .pipe(utils.drano())
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
    var examples = [];

    // load file content of each file in examples
    files.forEach(function(file){
        var filePath = examplesDir + '/' + file;
        var content = fs.readFileSync(filePath, "utf8");

        examples.push({
            filename: file,
            content: content
        });
    });

    return examples;

}

