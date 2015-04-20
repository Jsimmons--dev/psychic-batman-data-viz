module.exports = function(grunt) {
    grunt.initConfig({
	    pkg: grunt.file.readJSON('package.json'),
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

	grunt.registerTask('run',['execute']);
	grunt.registerTask('default',['sass']);
}
