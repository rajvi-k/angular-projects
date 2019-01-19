// configuration
'use strict';

var gulp = require('gulp');
var args = require('yargs').argv;
var $ = require('gulp-load-plugins')({ lazy: true });
// var gulpprint = require('gulp-print');
// var jscs = require('gulp-jscs');
//var jshint = require('gulp-jshint');
// var jscsstylish = require('gulp-jscs-stylish');
// var gulpif = require('gulp-if');
var del = require('del')


// gulp.task('mytask1',function(){
//     console.log('Gulp task1 is executing....');

//     console.log('Gulp task1 is completed');

// });

// gulp.task('first',()=>{
//     console.log('first task')

// })

// gulp.task('mytask2',['first'],function(){
//     console.log('Gulp task2 is executing....');

//     console.log('Gulp task2 is completed');

// });

// gulp.task('default',['mytask2','mytask1'],()=>{
//     console.log('Done all tasks')

// });
var config = require('./gulp.config')
gulp.task('analyze', () => {
    gulp.src(config.allJS)
        .pipe($.if(args.showfiles, $.print()))
    // .pipe($.jscs())
    // .pipe($.jscsStylish())
    // .pipe($.jshint())
    // .pipe(jshint.reporter('jshint-stylish', {verbose: true}));
});

gulp.task('compileLess', () => {
    gulp.src(config.allLess)
        .pipe($.less())
        // .pipe($.cssmin())
        .pipe($.autoprefixer({
            browsers: ['last 2 version', '>5%']
        }))
        // .pipe($.rename({
        //     suffix:'.min',
        //     ext:'.css'
        // }))
        .pipe($.concat('mystyles.css'))
        .pipe(gulp.dest(config.temp + '/css'))
})
gulp.task('copyCSS', () => {
    gulp.src(config.allCss)
        //.pipe($.cssmin())
        //.pipe($.rename({
        // suffix:'.min',
        // ext:'.css'
        //}))
        .pipe($.autoprefixer({
            browsers: ['last 2 version', '>5%']
        }))
        .pipe($.concat('styles.bundle.min.css'))
        .pipe(gulp.dest(config.outputDir + '/css'))
})
gulp.task('clean', () => {
    console.log('Cleaning started');
    del(config.outputDir);
    console.log('Cleaning over')
})
gulp.task('copyImages', () => {
    gulp.src(config.images)
    // .pipe($.imagemin([
    //     $.imagemin.gifsicle({interlaced: true}),
    //     //$.imagemin.jpegtran({progressive: true}),
    //     $.imagemin.optipng({optimizationLevel: 5}),
    //     $.imagemin.svgo({plugins: [{removeViewBox: true}]})
    // ]))
    .pipe(gulp.dest(config.outputDir + '/images'))
})

gulp.task('index',['copyImages'],() => {
    gulp.src(config.indexHTML)
    .pipe($.useref())
    .pipe($.if('*.js',$.uglify()))
    .pipe($.if('*.css' || '*.min.css',$.cssmin()))
    .pipe(gulp.dest(config.outputDir+'/'))    
})

gulp.task('help', $.taskListing);
//gulp.task('default', ['compileLess','index'])
gulp.task('default', ['index'])
