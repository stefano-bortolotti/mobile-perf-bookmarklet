
module.exports = function(grunt) { 

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		bannerPrefix: 'MIT License | https://github.com/stefano-bortolotti/mobile-perf-bookmarklet/blob/master/LICENSE',
		watch: {
			scripts: {
				files: ['source/**/*.css', 'source/**/*.js'],
				tasks: ['default'],
				options: {
					spawn: false,
				}
			}
		},
		uglify: {
			options: { 
				mangle: {
					except: ['jQuery'] // specify identifiers to leave untouched 
				}, 
				report: 'gzip',
				footer: '\n/*! <%= bannerPrefix %> */\n', // <%= grunt.template.today("dd-mm-yyyy") %>
			},
			global: {
				src: 'source/app.compiled.js',
				dest: 'build/mobilePerfBkmrlt.js' // _v<%= grunt.template.today("dd-mm-yyyy") %>
			}
		}, 
		removelogging: {
			dist: {
				src: 'source/app.compiled.js',
				dest: 'source/app.compiled.js',
				options: {}
			}
		}, 
		cssc: { // compress CSS 
			main: {
				options: {
					consolidateViaDeclarations: true,
					consolidateViaSelectors: true,
					consolidateMediaQueries: true
				},
				files: {
					'source/ui.min.css': 'source/ui.css' // 'destination': 'source' 
				}
			}
		},
		cssmin: {
			minify: {
				options: {
					//banner: '/* <%= bannerPrefix %> */',
					report: 'gzip'
				},
				files: {
					'source/ui.min.css': 'source/ui.min.css' // 'destination': 'source' 
				}
			}
		},
		staticinline: {
			main: {
				options: {
					prefix: '@@{',
					suffix: '}@',
					vars: {
						'style': '<%= grunt.file.read("source/ui.min.css") %>'
					}
				},
				files: {
					'source/app.compiled.js': 'source/app.js', // 'destination': 'source' 
				}
			},
			saveData: {
				options: {
					prefix: '@@{',
					suffix: '}@',
					vars: {
						'saveData': '<%= grunt.file.read("source/saveData.js") %>'
					}
				},
				files: {
					'source/app.compiled.js': 'source/app.compiled.js', // 'destination': 'source' 
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify'); // uglify Js files 
	grunt.loadNpmTasks('grunt-cssc'); // compress css files
	grunt.loadNpmTasks('grunt-contrib-cssmin'); // minify css files
	grunt.loadNpmTasks('grunt-remove-logging'); // remove console.logs
	grunt.loadNpmTasks('grunt-static-inline'); // replace url from static files such as img,js,css and variables an put inline in a template 

	grunt.registerTask('default', ['cssc', 'cssmin', 'staticinline:main', 'removelogging', 'uglify:global']);

};
