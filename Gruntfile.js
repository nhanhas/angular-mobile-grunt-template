module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            options: {
                sourceMap: true,
                sourceComments: false
            },
            src: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['**/*.scss'],
                    dest: 'deploy/',
                    ext: '.css'
                }]
            }
        },
        watch: {
            css: {
                files: '**/*.scss',
                tasks: ['sass']
            }
        },
        copy: {
            main: {
                files:[{
                    expand: true,
                    cwd: 'src/',
                    src: ['**','!**/*.scss'],
                    dest: 'deploy/'
                },
                {
                    expand: true,
                    cwd: 'bower_components/',
                    src: ['**'],
                    dest: 'deploy/libs'
                }]
            }
        },
        uglify: {
            build: {
                src: 'src/<%= pkg.name %>.js',
                dest: 'deploy/<%= pkg.name %>.min.js'
            }
        }


    });

    /*=====================================
     =        Default Configuration        =
     =====================================*/
    //Sass
    grunt.loadNpmTasks('grunt-sass');
    //Watch
    grunt.loadNpmTasks('grunt-contrib-watch');
    //Copy to deploy
    grunt.loadNpmTasks('grunt-contrib-copy');
    //Uglify
    grunt.loadNpmTasks('grunt-contrib-uglify');

    /*=====================================
     =        TASKS Resgistration         =
     =====================================*/
    // $ grunt
    grunt.registerTask('default',['dev']);

    //--------------------------------------

    //copy SRC to DEPLOY
    grunt.registerTask('srcDeploy', 'Start coping source files', function() {
        grunt.log.writeln('Currently running the "copy" task...');
        grunt.task.run(['copy']);
    });

    //compile sass
    grunt.registerTask('styles', 'Start compiling sass files', function() {
        grunt.log.writeln('Currently running the "sass" task...');
        grunt.task.run(['sass']);
    });

    //clean Deploy
    //TODO

    //default custom task
    grunt.registerTask('dev',['srcDeploy','styles','watch']);


}