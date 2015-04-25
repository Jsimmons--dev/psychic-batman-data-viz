module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);
    grunt.initConfig({
	    pkg: grunt.file.readJSON('package.json'),
		mocha: {
		    all:{
			    src: ['tests/testrunner.html'],
			},
			options: {
			    run: true
			}
		},
		shell: {
		    target: {
			    command:'jsdoc  public/javascripts/* -d doc'
			}
		},
	    execute: {
	        run: {
			    src: ['./bin/www']
			}
		},
		sass: {
		    options: {
			},
	 		dist: {
				files: {
					'./public/stylesheets/style.css':'./public/stylesheets/style.sass'
				}
			}
        }
	});


	//Load grunt-execute
	grunt.loadNpmTasks('grunt-execute');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-mocha');

	grunt.registerTask('run',['execute']);
	grunt.registerTask('default',['sass','shell','mocha']);
}
