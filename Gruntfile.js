/*
* grunt-contrib-less
* http://gruntjs.com/
*
* Copyright (c) 2014 Tyler Kellen, contributors
* Licensed under the MIT license.
*/

'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    /*uglify: {
      'build/teste.js': 'src/teste.js'
    },*/

    less: {
      'css/style.css': ['less/*.less']
    },
    /*Setup watch*/
    watch: {
     less: {
       files: 'less/*.less',
       tasks: ['less'],
       options: {
         interrupt: true,
       },
     },
    }
  });

  //grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');

  //grunt.registerTask('default', ['uglify', 'less']);

};