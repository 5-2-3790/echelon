const gulp = require("gulp");

const sassBackend = require("sass");
const gulpSass = require("gulp-sass");
const sass = gulpSass(sassBackend);
const WarningMessage = require("./scripts/gulp-generatedmessage");
const MakeWrapper = require("./scripts/gulp-wrappercss");

function build()
{
	return gulp.src("../**/*.scss")
		.pipe(sass.sync().on("error", sass.logError))
		.pipe(WarningMessage(
			"/**\n" +
			" * DO NOT EDIT THIS FILE!!!\n" +
			" *\n" +
			" * This is a generated source code file from the SCSS sources. Information is lost in this\n" +
			" * copy. Changes must be made to the SCSS sources and then recompiled using the build scripts.\n" +
			" * Otherwise, the state of changes made will be desynchronized from the source code.\n" +
			" *\n" +
			" * You can find the SCSS source files in echelon-scss-src/\n" +
			" */\n\n",
		))
		.pipe(MakeWrapper("_echelon.css"))
		// put the file two directories down, i.e. the root
		.pipe(gulp.dest("../../"));
}

exports.build = build;
exports.default = build;
exports.watch = function() {
	gulp.watch("../**/*.scss", build);
};