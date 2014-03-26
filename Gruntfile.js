/* global module */
module.exports = function (grunt) {
    'use strict';

    // Set a DEBUG constant based on passed configuration name from VS build event
    var uglifyDebug = (grunt.option('configuration') || '').toLowerCase() !== 'release';
    var uglifyGlobals = { "DEBUG": uglifyDebug };

    grunt.initConfig({
        typescript: {
            app: {
                dest: 'build/app.js',
                src: ['src/app.ts'],
                options: {
                    target: 'ES5', // Die, IE8, die
                    sourceMap: true, // Generate map to pass to Uglify
                    comments: true // Leave comments in for @ngInject uses
                }
            }
        },

        ngAnnotate: {
            app: {
                src: ['build/app.js'],
                dest: 'build/app-ng.js'
            }
        },

        uglify: {
            app: {
                options: {
                    sourceMap: true,
                    sourceMapIn: 'build/app.js.map', // Use the map from TypeScript
                    compress: {
                        angular: true, // Process the @ngInject slugs
                        global_defs: uglifyGlobals,
                        screw_ie8: true, // Seriously, die
                        drop_console: !uglifyDebug // Remove console.* statements for non-debug builds
                    },

                },
                files: {
                    'js/app.min.js': ['build/app-ng.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.registerTask('default', ['typescript', 'ngAnnotate', 'uglify']);
};