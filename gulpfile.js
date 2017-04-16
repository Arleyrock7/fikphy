'use strict';

const gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    uglify = require('gulp-uglify'),
    pug = require('gulp-pug'),
    sass = require('gulp-sass'),
    minifycss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    express = require('gulp-express'),
    browserSync = require('browser-sync'),
    nodemon = require('gulp-nodemon');
    /*opts: {
      pug: {
        locals: {
          title= 'Fikphy',
          files: files
        }
      }
    };*/


gulp.task('pug_html', function(){
  console.log("Bienvenido a Fikphy amo Arley! A sus ordenes...");
  gulp.src('templates/*.pug')
  .pipe(plumber())
  .pipe(pug({
    pretty: true /*TRUE sirve para no minificar el documento html*/
  }))
  .pipe(gulp.dest('dist/'));
});


gulp.task('sass_css', function() {
  gulp.src('styles/*.sass')
  //.pipe(plumber())
  .on('error', console.log.bind(console))
  .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
  .pipe(minifycss())
  .pipe(gulp.dest('dist/css'));
});
gulp.task('css_minify', function(){
  return gulp.src('styles/*.css')
  .on('error', console.log.bind(console))
  .pipe(minifycss())
  .pipe(gulp.dest('dist/css'));
});


//Plugin para unificar scripts -gulp-concat-
gulp.task('scripts_run', function(){
  gulp.src('scripts/*.js')
  .on('error', console.log.bind(console))
  .pipe(concat('main_script.js'))
  .pipe(uglify())//Comprime los archivos
  .pipe(gulp.dest('dist/js'));
});
gulp.task('scripts', function(){
  gulp.src('scripts/*.js')
  .on('error', console.log.bind(console))
  .pipe(uglify())
  .pipe(gulp.dest('dist/js'))
})


/*Observar cambios en tiempo real*/ /*Instalar plumber para manejo de erorores de archivos*/ /* O podemos usar los eventos de error que vienen con node*/
gulp.task('watch', function(){
  gulp.watch('templates/*.pug', ['pug_html']);
  gulp.watch('styles/main.sass', ['sass_css']);
});


gulp.task('browser-sync', ['nodemon'], function(){
    browserSync.init(null, {
    proxy: "http:// localhost:3000",
    files: ["dist/*.*"],
    browser: "chrome",
    port: 7000,
  });
});
gulp.task('nodemon', function (cb){
  var started = false;
  return nodemon({
    scripts: 'servidor.js'
  }).on('start', function(){
    if (!started){
      cb();
      started = true;
    }
  });
});


/*Tareas por defecto*/
gulp.task('default', ['browser-sync', 'watch', 'pug_html', 'sass_css', 'css_minify', 'scripts_run', 'scripts']);
