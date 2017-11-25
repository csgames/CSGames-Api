const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const sourcemaps = require('gulp-sourcemaps');
const ts = require("gulp-typescript");
const tslint = require("gulp-tslint");

const tsProject = ts.createProject("tsconfig.json");

gulp.task('watch', function () {
    nodemon({
        ext: "ts",
        watch: ["src"],
        tasks: ['default']
    });
});

gulp.task("default", function () {
    return tsProject.src()
        .pipe(sourcemaps.init({loadMaps: true, sourceRoot: "src"}))
        .pipe(tslint({formatter: "stylish"}))
        .pipe(tslint.report())
        .pipe(tsProject())
        .js
        .pipe(sourcemaps.write()).pipe(gulp.dest("build"));
});

gulp.task("build", function () {
    return tsProject.src()
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(tsProject())
        .js
        .pipe(sourcemaps.write()).pipe(gulp.dest("build"));
});

gulp.task("lint", function () {
    return tsProject.src()
        .pipe(tslint({formatter: "stylish"}))
        .pipe(tslint.report({summarizeFailureOutput: true}))
});