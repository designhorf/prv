'use strict';

module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
    clean: ['./assets'],
		copy: {
			main: {
				src: [
					'images/**/*.jpg',
					'images/**/*.png',
					'images/**/*.svg',
					'images/**/*.ico',
					'fonts/**/*'
				],
				dest: 'assets/',
			},
		},
		cssmin: {
			target: {
				files: [{
					expand: true,
					cwd: './assets/stylesheets',
					src: ['*.css', '!*.min.css'],
					dest: './assets/stylesheets',
					ext: '.min.css',
				}],
			}
		},
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
				tasks: ['scsslint', 'sass', 'postcss', 'cssmin'],
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
		'clean',
		'sass',
		'postcss',
		'cssmin',
		'copy',
	]);
};
