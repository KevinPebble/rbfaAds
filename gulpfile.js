const gulp  = require("gulp");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const concat = require ("gulp-concat");


gulp.task("default", function () {
    return gulp.src([
        "src/rbfaAds.js",
        "src/reset.js",
        "src/callrbfaAds.js",
        "src/resize.js"
    ])
    .pipe(concat("RBFAads.js"))
    .pipe(gulp.dest("dist"))
    .pipe(gulp.dest("test"))
    .pipe(uglify())
    .pipe(rename({ extname: ".min.js" }))
    .pipe(gulp.dest("dist"));
  });