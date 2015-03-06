var path = require("path");


// variables for dev
var root = exports.root = path.resolve("../app/");
var dest = exports.dest = path.resolve("../public/");

exports.env = "dev";

exports.tasks = ["js", "css", "html", "images", "bower"];

exports.watch = true;



// html
exports.html = {
    src: [ 
        root + "/html/**/*.html", 
        root + "/html/**/*.htm",
        root + "/index.html"
    ],
    watch: [ 
        root + "/html/**/*.html", 
        root + "/html/**/*.htm",
        root + "/index.html"
    ],
    dest: dest
};



// js
exports.js = {
    src: [
        root + "/js/index.js"
    ],
    watch: [ 
        root + "/js/**/*.js"
    ],
    dest: dest + "/js/"
};

// js uglify options 
// to skip, set value to false or omit entirely
// otherwise, pass options object (can be empty {})
exports.uglify = false;

// browserify
exports.browserify = {
    debug: true
};



// css
exports.css = {
    src:   [ 
        root + "/scss/**/*.scss"
    ],
    watch: [ 
        root + "/scss/**/*.scss"
    ],
    dest: dest + "/css/",
    filename: "index.css"
};

// sass options
exports.sass = {
    outputStyle: "nested"
    // includePaths: require('node-neat').includePaths
};

exports.pixrem = {};

exports.autoprefixer = {
     browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1', 'ie >= 9']
};



// bower 
exports.bower = {
    root: root + "/vendor/",
    jsFilename: "vendor.js",
    cssFilename: "vendor.css"
};

// minifyCSS used for bower css assets
// to skip, set value to false or omit entirely
// otherwise, pass options object (can be empty {})
exports.minifyCSS = false;



// images
exports.images = {
    src: [
        root + "/img/**/*",
        "!" + root + "/img/**/*.svg"
    ],
    watch: [
        root + "/img/**/*",
        root + "/img/**/*.svg" 
    ],
    dest: dest + "/img/"
};

exports.svg = { 
    src: root + "/img/**/*.svg" 
};


// browserSync
exports.browserSync = {
    // server: dest,
    proxy: "localhost:3000",
    port: 8080,
    open: false, // or  "external"
    notify: false,
    ghostMode: false,
    files: [
        dest + "/**"
    ]
};

// server
exports.server = {
    src   : path.resolve(__dirname + "/../server/server.js"),
    watch : path.resolve(__dirname + "/../server/")
};





