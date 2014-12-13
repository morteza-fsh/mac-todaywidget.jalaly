'use strict';
module.exports = function(grunt) {

    // load all grunt tasks matching the `grunt-*` pattern
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        // merge js files
        concat: {

            widget: {
                options: {
                    // separator: "\n\n/* ================== init.averta.js =================== */\n\n;",
                    banner: "/*! <%= pkg.title %> - v<%= pkg.version %> - <%= grunt.template.today('yyyy-mm-dd') %>\n" +
                        " *  <%= pkg.description %>\n" +
                        " *  <%= pkg.homepage %>\n" +
                        " *  license <%= pkg.license %>\n" +
                        " */\n",
                    process: function(src, filepath) {
                        var separator = "\n\n/* ================== " + filepath + " =================== */\n\n\n";
                        return (separator + src).replace(/;\s*$/, "") + ";"; // make sure always a semicolon is at the end
                    },
                },
                src: ['src/convert.js','src/render.js'],
                dest: 'dist/widget.js'
            }

        },

        // uglify to concat, minify, and make source maps
        uglify: {

            options: {
                compress: {
                    drop_console: true
                },
                banner: ""
            },

            front_script_js: {
                options: {
                    sourceMap: true,
                    mangle: false,
                    compress: false,
                    preserveComments: 'some'
                },
                files: {
                    'dist/widget.min.js': ['dist/widget.js']
                }
            }

        },

     
        // watch for changes and trigger sass, jshint, uglify and livereload
        watch: {

            autoreload: {
                //options: { livereload: true },
                files: ['src/*.js'],
                tasks: ['dev']
            }
        }

    });

    // register task
    grunt.registerTask( 'default', ['watch']);
    grunt.registerTask( 'build', ['concat', 'uglify']);
    grunt.registerTask( 'dev', ['concat'] );

};