/* global module */
module.exports = function (grunt) {
    'use strict';

    var uglifyDebug = (grunt.option('configuration') || '').toLowerCase() !== 'release';
    var uglifyGlobals = { "DEBUG": uglifyDebug };

    grunt.initConfig({
        typescript: {
            app: {
                dest: 'build/app.js',
                src: ['src/app.ts'],
                options: {
                    target: 'ES5',
                    sourceMap: true,
                    comments: true
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
                    sourceMapIn: 'build/app.js.map',
                    compress: {
                        angular: true,
                        global_defs: uglifyGlobals
                    }
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
    grunt.registerTask('default', ['typescript', 'uglify']);
};