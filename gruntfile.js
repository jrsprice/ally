'use strict';

module.exports = function(grunt){
    grunt.initConfig({
        watch: {
            dev: {
                files: [
                    'gruntfile.js',
                    'css/**/*.scss',
                    'js/**/*.js',
                    '**/*.html'
                ],
                tasks: ['sass'], // Concat, minify etc
                options: {
                    spawn: false
                }
            }
        },
        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'css',
                    src: ['*.scss'],
                    dest: 'css',
                    ext: '.css'
                }]
            }
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src : 'app/*'
                },
                options: {
                    watchTask: true,
                    server: {
                        baseDir: './'
                    }
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-browser-sync');

    grunt.registerTask('dev', ['browserSync:dev', 'watch:dev']);

};
