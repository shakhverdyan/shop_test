
const { src, watch, dest, parallel, series } = require("gulp");
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();
const sass = require('gulp-sass')(require('sass'));
const uglify = require("gulp-uglify-es").default;
const concat = require("gulp-concat");
const del = require('del');
const imagemin = require('gulp-imagemin');

function styles() {
  return src('app/scss/**/*.scss')
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(concat('style.min.css'))
    .pipe(dest("app/css"))
}

function scripts() {
  return src("app/js/script.js")
    .pipe(uglify())
    .pipe(concat("script.min.js"))
    .pipe(dest("app/js"))
    .pipe(browserSync.stream())
}
function browsersSync() {
  browserSync.init({
    server: {
      baseDir: "app/"
    }
  });
}
function watches() {
  watch(["app/scss/**/style.scss"], styles);
  watch(["app/js/**/script.js"], scripts);
  watch("app/*.html").on('change', browserSync.reload);
}

function bild() {
  return src([
    "app/css/style.min.css",
    "app/js/script.min.js",
    "app/*html",
  ], { base: "app" })
    .pipe(dest("dist"))
}
function deleteDist() {
  return del("dist")
}
function img() {
  return src('app/img/*')
    .pipe(imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.mozjpeg({ quality: 75, progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 }),
      imagemin.svgo({
        plugins: [
          { removeViewBox: true },
          { cleanupIDs: false }
        ]
      })
    ]))
    .pipe(dest('dist/img'))
}



exports.styles = styles;
exports.browsersSync = browsersSync;
exports.watches = watches;
exports.scripts = scripts;
exports.deleteDist = deleteDist;
exports.img = img;

exports.bild = series(deleteDist, img, bild);
exports.default = parallel(styles, browsersSync, watches, scripts)



