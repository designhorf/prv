'use strict';

module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		postcss: {
			options: {
				map: false,
				processors: [require('autoprefixer')({browsers: 'last 2 versions'})],
			},
			dist: {
				src: 'assets/stylesheets/*.css',
			},
		},
		sass: {
			dist: {
				files: [{
					expand: true,
					cwd: 'stylesheets',
					src: ['*.scss'],
					dest: './assets/stylesheets',
					ext: '.css',
				}],
			},
		},
		scsslint: {
			all: 'stylesheets/**/*.scss',
			options: {
				config: '.scss-lint.yml',
				reporterOutput: null,
				colorizeOutput: true,
			},
		},
		watch: {
			css: {
				files: ['stylesheets/**/*.scss'],
				tasks: ['scsslint', 'sass', 'postcss'],
			},
			images: {
				files: [
					'images/**/*',
				],
				tasks: [
					'copy',
				],
			},
		},
	});

	require('load-grunt-tasks')(grunt);

	grunt.registerTask('default', [
		'scsslint',
		'sass',
		'postcss'
	]);
};
