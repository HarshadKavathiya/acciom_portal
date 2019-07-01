"use strict";

//var gulp = require('gulp');
const { series, parallel, src, dest, gulp } = require('gulp');
const plugins = require('gulp-load-plugins')();


function startStubby(cb) {
	src('.').pipe(plugins.shell(['node_modules/stubby/bin/stubby -mw -d mocks.json -l localhost -s 9000']));
	cb();
};

function defaultTask(cb) {
	return src('./api-mocks/**/*.yaml')
        .pipe(plugins.concat('mocks.json'))
        .pipe(plugins.yaml({ space: 2 }))
        .pipe(dest('./'));
  	cb();
};

exports.default = series(defaultTask, startStubby);
